"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";

interface ProjectVideoProps {
  src: string;
  poster: string;
  className?: string;
}

function subscribeToMotionPreference(onChange: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function ProjectVideo({
  src,
  poster,
  className = "",
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, [prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!prefersReducedMotion}
      controls={prefersReducedMotion}
      preload="metadata"
      className={className}
    />
  );
}
