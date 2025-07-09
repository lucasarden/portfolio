"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import CursorFollower from "@/app/components/CursorFollower";

export default function DotMatrix() {
  const [matrixSize, setMatrixSize] = useState({ width: 0, height: 0 });
  const matrixRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const rect = matrixRef.current?.getBoundingClientRect();
      if (!rect) return;
      const newMatrixSize = {
        width: rect.right - rect.left,
        height: rect.bottom - rect.top,
      };
      setMatrixSize(newMatrixSize);
    };

    // Set initial matrix size
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const posArray = useMemo(() => {
    const distanceBetween = 20;
    const columns = Math.floor(matrixSize.width / distanceBetween + 1);
    const rows = Math.floor(matrixSize.height / distanceBetween + 1);
    const positions: { x: number; y: number }[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        positions.push({ x: x * distanceBetween, y: y * distanceBetween });
      }
    }
    return positions;
  }, [matrixSize]);
  return (
    <div className="absolute h-full w-full bg-black z-[-1]" ref={matrixRef}>
      {posArray.map((pos, index) => (
        <CursorFollower key={index} matrixRef={matrixRef} pos={pos} />
      ))}
    </div>
  );
}
