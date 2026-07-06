"use client";
import { useEffect, useRef } from "react";
import { WaterSim } from "@/app/components/fluidSim";

interface DotMatrixProps {
  disabled?: boolean;
}

export default function DotMatrix({ disabled = false }: DotMatrixProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const animated = !disabled && !reducedMotion;

    const sim = new WaterSim(canvas);
    const cleanups: (() => void)[] = [];

    const resize = () => {
      sim.resize(container.clientWidth, container.clientHeight);
      if (!animated) sim.drawStatic();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    cleanups.push(() => resizeObserver.disconnect());
    resize();

    if (animated) {
      let rafId = 0;
      let running = false;
      let pageVisible = document.visibilityState === "visible";
      let onScreen = true;
      const pointer = { clientX: 0, clientY: 0, active: false };

      const frame = (now: number) => {
        if (pointer.active) {
          const rect = container.getBoundingClientRect();
          sim.setPointer(
            pointer.clientX - rect.left,
            pointer.clientY - rect.top
          );
        }
        sim.frame(now);
        rafId = requestAnimationFrame(frame);
      };

      const syncRunning = () => {
        const shouldRun = pageVisible && onScreen;
        if (shouldRun && !running) {
          running = true;
          sim.resetClock();
          rafId = requestAnimationFrame(frame);
        } else if (!shouldRun && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        pointer.clientX = event.clientX;
        pointer.clientY = event.clientY;
        pointer.active = true;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() =>
        window.removeEventListener("pointermove", onPointerMove)
      );

      const onVisibilityChange = () => {
        pageVisible = document.visibilityState === "visible";
        syncRunning();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      cleanups.push(() =>
        document.removeEventListener("visibilitychange", onVisibilityChange)
      );

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        syncRunning();
      });
      intersectionObserver.observe(container);
      cleanups.push(() => intersectionObserver.disconnect());

      syncRunning();
      cleanups.push(() => {
        if (running) cancelAnimationFrame(rafId);
        running = false;
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      className="absolute h-full w-full overflow-hidden bg-lucas-main-color dark:bg-black z-[-1]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
      <div className="absolute inset-0 backdrop-blur-xs pointer-events-none z-[1]" />
    </div>
  );
}
