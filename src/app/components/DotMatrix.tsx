"use client";
import { useEffect, useRef } from "react";
import { WaterSim } from "@/app/components/fluidSim";
import { useTheme } from "@/app/context/ThemeProvider";

interface DotMatrixProps {
  disabled?: boolean;
}

const DOT_COLORS = {
  light: "rgba(53, 70, 95, 0.35)",
  dark: "rgba(255, 255, 255, 0.38)",
};

export default function DotMatrix({ disabled = false }: DotMatrixProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<WaterSim | null>(null);
  const { theme } = useTheme();

  const dotColor = DOT_COLORS[theme];
  const dotColorRef = useRef(dotColor);

  useEffect(() => {
    dotColorRef.current = dotColor;
    simRef.current?.setDotColor(dotColor);
  }, [dotColor]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const animated = !disabled && !reducedMotion;

    const sim = new WaterSim(canvas);
    sim.setDotColor(dotColorRef.current);
    simRef.current = sim;
    const cleanups: (() => void)[] = [() => (simRef.current = null)];

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

      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        pointer.clientX = touch.clientX;
        pointer.clientY = touch.clientY;
        pointer.active = true;
      };
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      cleanups.push(() =>
        window.removeEventListener("touchmove", onTouchMove)
      );

      const onTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        pointer.clientX = touch.clientX;
        pointer.clientY = touch.clientY;
        pointer.active = true;
        const rect = container.getBoundingClientRect();
        sim.jumpPointer(touch.clientX - rect.left, touch.clientY - rect.top);
        sim.poke(touch.clientX - rect.left, touch.clientY - rect.top);
      };
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      cleanups.push(() =>
        window.removeEventListener("touchstart", onTouchStart)
      );

      if (window.matchMedia("(pointer: coarse)").matches) {
        let lastScrollY = window.scrollY;
        const onScroll = () => {
          const delta = window.scrollY - lastScrollY;
          lastScrollY = window.scrollY;
          sim.addScrollFlow(delta);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", onScroll));
      }

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
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />
    </div>
  );
}
