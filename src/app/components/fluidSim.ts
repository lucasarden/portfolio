// Stam-style stable fluids on a coarse grid + spring-anchored dots.
// DotMatrix.tsx owns the lifecycle; nothing React in here.

const FIXED_DT = 1 / 60;
const MAX_STEPS_PER_FRAME = 3;

const DIFFUSION = 0.03;
const VELOCITY_DECAY = 0.992;
const VORTICITY = 6.5;
const SPLAT_RADIUS = 70;
const SPLAT_STRENGTH = 0.5;
const MAX_POINTER_SPEED = 2500;
const SPLAT_MARGIN = 80;

const FLOW_COUPLING = 2.4;
const SPRING_K = 42;
const SPRING_DAMPING = 5.5;
const MAX_DISPLACEMENT = 20;

const POKE_STRENGTH = 120;

const DEFAULT_DOT_COLOR = "#ffffff";
const IDLE_SIZE = 1.5;
const BLADE_WIDTH = 3;
const BLADE_MIN_LENGTH = 2.5;

const SLEEP_FLUID_SPEED = 2;
const SLEEP_DOT_SPEED = 0.5;
const SLEEP_DOT_DISP = 0.3;

interface QualityTier {
  dotSpacing: number;
  fluidCell: number;
  diffuseIters: number;
  projectIters: number;
}

const TIERS: QualityTier[] = [
  { dotSpacing: 18, fluidCell: 24, diffuseIters: 4, projectIters: 8 },
  { dotSpacing: 23, fluidCell: 32, diffuseIters: 2, projectIters: 4 },
  { dotSpacing: 30, fluidCell: 40, diffuseIters: 1, projectIters: 2 },
];

const TIER_DOWN_FRAME_MS = 22;
const TIER_UP_FRAME_MS = 9;
const TIER_CHANGE_COOLDOWN_MS = 2000;
const TIER_UP_COOLDOWN_MS = 8000;

function clamp(x: number, lo: number, hi: number) {
  return x < lo ? lo : x > hi ? hi : x;
}

// Grid coordinate g maps to pixel (g - 1) * cell; the border ring stays at
// zero velocity so the water is absorbed at the edges.
class FluidField {
  readonly nx: number;
  readonly ny: number;
  readonly cell: number;
  private readonly diffuseIters: number;
  private readonly projectIters: number;
  private u: Float32Array;
  private v: Float32Array;
  private u0: Float32Array;
  private v0: Float32Array;
  private p: Float32Array;
  private div: Float32Array;
  maxSpeed = 0;
  sampleX = 0;
  sampleY = 0;

  constructor(width: number, height: number, tier: QualityTier) {
    this.cell = tier.fluidCell;
    this.diffuseIters = tier.diffuseIters;
    this.projectIters = tier.projectIters;
    this.nx = clamp(Math.ceil(width / this.cell) + 2, 8, 128);
    this.ny = clamp(Math.ceil(height / this.cell) + 2, 8, 96);
    const size = this.nx * this.ny;
    this.u = new Float32Array(size);
    this.v = new Float32Array(size);
    this.u0 = new Float32Array(size);
    this.v0 = new Float32Array(size);
    this.p = new Float32Array(size);
    this.div = new Float32Array(size);
  }

  splat(x: number, y: number, fx: number, fy: number) {
    const { nx, ny, cell, u, v } = this;
    const r = SPLAT_RADIUS;
    const r2 = r * r;
    const minI = Math.max(1, Math.floor((x - r) / cell) + 1);
    const maxI = Math.min(nx - 2, Math.ceil((x + r) / cell) + 1);
    const minJ = Math.max(1, Math.floor((y - r) / cell) + 1);
    const maxJ = Math.min(ny - 2, Math.ceil((y + r) / cell) + 1);
    for (let j = minJ; j <= maxJ; j++) {
      const dy = (j - 1) * cell - y;
      for (let i = minI; i <= maxI; i++) {
        const dx = (i - 1) * cell - x;
        const d2 = dx * dx + dy * dy;
        if (d2 >= r2) continue;
        const falloff = 1 - d2 / r2;
        const id = i + j * nx;
        u[id] += fx * falloff;
        v[id] += fy * falloff;
      }
    }
  }

  // A radial push would be cancelled by the pressure projection (it is pure
  // divergence), so a poke swirls instead: azimuthal flow is divergence-free.
  splatVortex(x: number, y: number, strength: number) {
    const { nx, ny, cell, u, v } = this;
    const r = SPLAT_RADIUS;
    const r2 = r * r;
    const minI = Math.max(1, Math.floor((x - r) / cell) + 1);
    const maxI = Math.min(nx - 2, Math.ceil((x + r) / cell) + 1);
    const minJ = Math.max(1, Math.floor((y - r) / cell) + 1);
    const maxJ = Math.min(ny - 2, Math.ceil((y + r) / cell) + 1);
    for (let j = minJ; j <= maxJ; j++) {
      const dy = (j - 1) * cell - y;
      for (let i = minI; i <= maxI; i++) {
        const dx = (i - 1) * cell - x;
        const d2 = dx * dx + dy * dy;
        if (d2 >= r2 || d2 === 0) continue;
        const falloff = 1 - d2 / r2;
        const push = (strength * falloff) / Math.sqrt(d2);
        const id = i + j * nx;
        u[id] += -dy * push;
        v[id] += dx * push;
      }
    }
  }

  step(dt: number) {
    const { u, v, u0, v0 } = this;
    u0.set(u);
    v0.set(v);
    this.linSolve(u, u0, DIFFUSION, this.diffuseIters);
    this.linSolve(v, v0, DIFFUSION, this.diffuseIters);
    u0.set(u);
    v0.set(v);
    this.advect(u, u0, u0, v0, dt);
    this.advect(v, v0, u0, v0, dt);
    this.confineVorticity(dt);
    this.project();
    let max2 = 0;
    for (let id = 0; id < u.length; id++) {
      u[id] *= VELOCITY_DECAY;
      v[id] *= VELOCITY_DECAY;
      const s2 = u[id] * u[id] + v[id] * v[id];
      if (s2 > max2) max2 = s2;
    }
    this.maxSpeed = Math.sqrt(max2);
  }

  sample(x: number, y: number) {
    const { nx, ny, cell, u, v } = this;
    const gx = clamp(x / cell + 1, 0.5, nx - 1.5);
    const gy = clamp(y / cell + 1, 0.5, ny - 1.5);
    const i0 = Math.floor(gx);
    const j0 = Math.floor(gy);
    const fx = gx - i0;
    const fy = gy - j0;
    const id = i0 + j0 * nx;
    const w00 = (1 - fx) * (1 - fy);
    const w10 = fx * (1 - fy);
    const w01 = (1 - fx) * fy;
    const w11 = fx * fy;
    this.sampleX = u[id] * w00 + u[id + 1] * w10 + u[id + nx] * w01 + u[id + nx + 1] * w11;
    this.sampleY = v[id] * w00 + v[id + 1] * w10 + v[id + nx] * w01 + v[id + nx + 1] * w11;
  }

  private setBounds(x: Float32Array) {
    const { nx, ny } = this;
    const lastRow = (ny - 1) * nx;
    for (let i = 0; i < nx; i++) {
      x[i] = 0;
      x[i + lastRow] = 0;
    }
    for (let j = 0; j < ny; j++) {
      x[j * nx] = 0;
      x[nx - 1 + j * nx] = 0;
    }
  }

  private linSolve(x: Float32Array, x0: Float32Array, a: number, iters: number) {
    const { nx, ny } = this;
    const c = 1 + 4 * a;
    for (let k = 0; k < iters; k++) {
      for (let j = 1; j < ny - 1; j++) {
        const row = j * nx;
        for (let i = 1; i < nx - 1; i++) {
          const id = i + row;
          x[id] = (x0[id] + a * (x[id - 1] + x[id + 1] + x[id - nx] + x[id + nx])) / c;
        }
      }
      this.setBounds(x);
    }
  }

  private advect(
    dst: Float32Array,
    src: Float32Array,
    uu: Float32Array,
    vv: Float32Array,
    dt: number
  ) {
    const { nx, ny, cell } = this;
    const s = dt / cell;
    for (let j = 1; j < ny - 1; j++) {
      const row = j * nx;
      for (let i = 1; i < nx - 1; i++) {
        const id = i + row;
        const px = clamp(i - s * uu[id], 0.5, nx - 1.5);
        const py = clamp(j - s * vv[id], 0.5, ny - 1.5);
        const i0 = Math.floor(px);
        const j0 = Math.floor(py);
        const fx = px - i0;
        const fy = py - j0;
        const sid = i0 + j0 * nx;
        dst[id] =
          src[sid] * (1 - fx) * (1 - fy) +
          src[sid + 1] * fx * (1 - fy) +
          src[sid + nx] * (1 - fx) * fy +
          src[sid + nx + 1] * fx * fy;
      }
    }
    this.setBounds(dst);
  }

  // Advection damps rotation, so reinforce whatever curl survives — this is
  // what rolls a fast swipe up into eddies. Reuses p as scratch.
  private confineVorticity(dt: number) {
    const { nx, ny, u, v, p: curl } = this;
    for (let j = 1; j < ny - 1; j++) {
      const row = j * nx;
      for (let i = 1; i < nx - 1; i++) {
        const id = i + row;
        curl[id] = 0.5 * (v[id + 1] - v[id - 1] - (u[id + nx] - u[id - nx]));
      }
    }
    this.setBounds(curl);
    for (let j = 2; j < ny - 2; j++) {
      const row = j * nx;
      for (let i = 2; i < nx - 2; i++) {
        const id = i + row;
        let gx = 0.5 * (Math.abs(curl[id + 1]) - Math.abs(curl[id - 1]));
        let gy = 0.5 * (Math.abs(curl[id + nx]) - Math.abs(curl[id - nx]));
        const len = Math.sqrt(gx * gx + gy * gy) + 1e-5;
        gx /= len;
        gy /= len;
        const w = curl[id] * VORTICITY * dt;
        u[id] += gy * w;
        v[id] -= gx * w;
      }
    }
  }

  private project() {
    const { nx, ny, u, v, p, div } = this;
    for (let j = 1; j < ny - 1; j++) {
      const row = j * nx;
      for (let i = 1; i < nx - 1; i++) {
        const id = i + row;
        div[id] = -0.5 * (u[id + 1] - u[id - 1] + v[id + nx] - v[id - nx]);
        p[id] = 0;
      }
    }
    this.setBounds(div);
    this.setBounds(p);
    for (let k = 0; k < this.projectIters; k++) {
      for (let j = 1; j < ny - 1; j++) {
        const row = j * nx;
        for (let i = 1; i < nx - 1; i++) {
          const id = i + row;
          p[id] = (div[id] + p[id - 1] + p[id + 1] + p[id - nx] + p[id + nx]) / 4;
        }
      }
      this.setBounds(p);
    }
    for (let j = 1; j < ny - 1; j++) {
      const row = j * nx;
      for (let i = 1; i < nx - 1; i++) {
        const id = i + row;
        u[id] -= 0.5 * (p[id + 1] - p[id - 1]);
        v[id] -= 0.5 * (p[id + nx] - p[id - nx]);
      }
    }
    this.setBounds(u);
    this.setBounds(v);
  }
}

class DotGrid {
  readonly count: number;
  readonly homeX: Float32Array;
  readonly homeY: Float32Array;
  readonly dispX: Float32Array;
  readonly dispY: Float32Array;
  readonly velX: Float32Array;
  readonly velY: Float32Array;
  maxSpeed = 0;
  maxDisp = 0;

  constructor(width: number, height: number, spacing: number) {
    const cols = Math.floor(width / spacing) + 1;
    const rows = Math.floor(height / spacing) + 1;
    this.count = cols * rows;
    this.homeX = new Float32Array(this.count);
    this.homeY = new Float32Array(this.count);
    this.dispX = new Float32Array(this.count);
    this.dispY = new Float32Array(this.count);
    this.velX = new Float32Array(this.count);
    this.velY = new Float32Array(this.count);
    let n = 0;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        this.homeX[n] = i * spacing;
        this.homeY[n] = j * spacing;
        n++;
      }
    }
  }

  step(dt: number, fluid: FluidField) {
    const { count, homeX, homeY, dispX, dispY, velX, velY } = this;
    let maxV2 = 0;
    let maxD2 = 0;
    for (let n = 0; n < count; n++) {
      fluid.sample(homeX[n], homeY[n]);
      let vx = velX[n] + (fluid.sampleX * FLOW_COUPLING - SPRING_K * dispX[n] - SPRING_DAMPING * velX[n]) * dt;
      let vy = velY[n] + (fluid.sampleY * FLOW_COUPLING - SPRING_K * dispY[n] - SPRING_DAMPING * velY[n]) * dt;
      let dx = dispX[n] + vx * dt;
      let dy = dispY[n] + vy * dt;
      const d2 = dx * dx + dy * dy;
      if (d2 > MAX_DISPLACEMENT * MAX_DISPLACEMENT) {
        const scale = MAX_DISPLACEMENT / Math.sqrt(d2);
        dx *= scale;
        dy *= scale;
        vx *= scale;
        vy *= scale;
      }
      velX[n] = vx;
      velY[n] = vy;
      dispX[n] = dx;
      dispY[n] = dy;
      const v2 = vx * vx + vy * vy;
      if (v2 > maxV2) maxV2 = v2;
      if (d2 > maxD2) maxD2 = d2;
    }
    this.maxSpeed = Math.sqrt(maxV2);
    this.maxDisp = Math.sqrt(maxD2);
  }

  settle() {
    this.dispX.fill(0);
    this.dispY.fill(0);
    this.velX.fill(0);
    this.velY.fill(0);
    this.maxSpeed = 0;
    this.maxDisp = 0;
  }
}

export class WaterSim {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private fluid: FluidField | null = null;
  private dots: DotGrid | null = null;

  private tierIndex: number;
  private frameMsEma = 16;
  private lastTierChange = 0;

  private lastTime = -1;
  private accumulator = 0;
  private asleep = false;

  private pointerX = 0;
  private pointerY = 0;
  private prevPointerX = 0;
  private prevPointerY = 0;
  private hasPointer = false;
  private pointerMoved = false;
  private dotColor = DEFAULT_DOT_COLOR;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D is not supported");
    this.ctx = ctx;
    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency ?? 8 : 8;
    this.tierIndex = cores <= 4 ? 1 : 0;
  }

  resize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    this.width = width;
    this.height = height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.rebuild();
  }

  setPointer(x: number, y: number) {
    if (this.hasPointer && (x !== this.pointerX || y !== this.pointerY)) {
      this.pointerMoved = true;
    }
    this.pointerX = x;
    this.pointerY = y;
    this.hasPointer = true;
  }

  jumpPointer(x: number, y: number) {
    this.pointerX = x;
    this.pointerY = y;
    this.prevPointerX = x;
    this.prevPointerY = y;
    this.hasPointer = true;
    this.pointerMoved = false;
  }

  poke(x: number, y: number) {
    if (!this.fluid) return;
    const spin = Math.random() < 0.5 ? -1 : 1;
    this.fluid.splatVortex(x, y, POKE_STRENGTH * spin);
    this.asleep = false;
  }

  resetClock() {
    this.lastTime = -1;
  }

  frame(now: number) {
    if (!this.fluid || !this.dots) return;
    if (this.lastTime < 0) {
      this.lastTime = now;
      this.prevPointerX = this.pointerX;
      this.prevPointerY = this.pointerY;
      this.render();
      return;
    }
    const frameMs = now - this.lastTime;
    this.lastTime = now;
    const dt = Math.min(frameMs / 1000, 0.1);

    let pvx = 0;
    let pvy = 0;
    if (this.hasPointer && this.pointerMoved && dt > 0) {
      pvx = (this.pointerX - this.prevPointerX) / dt;
      pvy = (this.pointerY - this.prevPointerY) / dt;
      const speed = Math.sqrt(pvx * pvx + pvy * pvy);
      if (speed > MAX_POINTER_SPEED) {
        const s = MAX_POINTER_SPEED / speed;
        pvx *= s;
        pvy *= s;
      }
    }
    this.prevPointerX = this.pointerX;
    this.prevPointerY = this.pointerY;

    const stirring =
      (pvx !== 0 || pvy !== 0) &&
      this.pointerX > -SPLAT_MARGIN &&
      this.pointerX < this.width + SPLAT_MARGIN &&
      this.pointerY > -SPLAT_MARGIN &&
      this.pointerY < this.height + SPLAT_MARGIN;
    if (stirring) this.asleep = false;
    this.pointerMoved = false;

    if (this.asleep) return;

    this.accumulator = Math.min(this.accumulator + dt, FIXED_DT * MAX_STEPS_PER_FRAME);
    let stepped = false;
    while (this.accumulator >= FIXED_DT) {
      if (stirring) {
        this.fluid.splat(this.pointerX, this.pointerY, pvx * SPLAT_STRENGTH, pvy * SPLAT_STRENGTH);
      }
      this.fluid.step(FIXED_DT);
      this.dots.step(FIXED_DT, this.fluid);
      this.accumulator -= FIXED_DT;
      stepped = true;
    }

    this.render();

    if (
      stepped &&
      !stirring &&
      this.fluid.maxSpeed < SLEEP_FLUID_SPEED &&
      this.dots.maxSpeed < SLEEP_DOT_SPEED &&
      this.dots.maxDisp < SLEEP_DOT_DISP
    ) {
      this.dots.settle();
      this.render();
      this.asleep = true;
    }

    this.adaptQuality(frameMs, now);
  }

  drawStatic() {
    if (!this.dots) return;
    this.dots.settle();
    this.render();
  }

  setDotColor(color: string) {
    if (color === this.dotColor) return;
    this.dotColor = color;
    this.render();
  }

  private rebuild() {
    const tier = TIERS[this.tierIndex];
    this.fluid = new FluidField(this.width, this.height, tier);
    this.dots = new DotGrid(this.width, this.height, tier.dotSpacing);
    this.accumulator = 0;
    this.asleep = false;
  }

  private adaptQuality(frameMs: number, now: number) {
    this.frameMsEma += (Math.min(frameMs, 100) - this.frameMsEma) * 0.05;
    if (now - this.lastTierChange < TIER_CHANGE_COOLDOWN_MS) return;
    if (this.frameMsEma > TIER_DOWN_FRAME_MS && this.tierIndex < TIERS.length - 1) {
      this.tierIndex++;
    } else if (
      this.frameMsEma < TIER_UP_FRAME_MS &&
      this.tierIndex > 0 &&
      now - this.lastTierChange > TIER_UP_COOLDOWN_MS
    ) {
      this.tierIndex--;
    } else {
      return;
    }
    this.lastTierChange = now;
    this.frameMsEma = 16;
    this.rebuild();
  }

  private render() {
    const { ctx, dots, width, height } = this;
    if (!dots) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.dotColor;

    const { count, homeX, homeY, dispX, dispY } = dots;
    const half = IDLE_SIZE / 2;
    const min2 = BLADE_MIN_LENGTH * BLADE_MIN_LENGTH;

    for (let n = 0; n < count; n++) {
      const d2 = dispX[n] * dispX[n] + dispY[n] * dispY[n];
      if (d2 < min2) {
        ctx.fillRect(homeX[n] - half, homeY[n] - half, IDLE_SIZE, IDLE_SIZE);
      }
    }

    ctx.strokeStyle = this.dotColor;
    ctx.lineWidth = BLADE_WIDTH;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let n = 0; n < count; n++) {
      const d2 = dispX[n] * dispX[n] + dispY[n] * dispY[n];
      if (d2 >= min2) {
        ctx.moveTo(homeX[n], homeY[n]);
        ctx.lineTo(homeX[n] + dispX[n], homeY[n] + dispY[n]);
      }
    }
    ctx.stroke();
  }
}
