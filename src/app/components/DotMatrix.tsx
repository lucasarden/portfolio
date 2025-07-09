"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import CursorFollower from "@/app/components/CursorFollower";

interface DotMatrixProps {
  disabled?: boolean;
}

export default function DotMatrix({ disabled = false }: DotMatrixProps) {
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
      {posArray.map((pos, index) =>
        disabled ? (
          <div
            key={index}
            className="bg-white absolute rounded-md"
            style={{
              top: `${pos.y}px`,
              left: `${pos.x}px`,
              width: `${1.5}px`,
              height: `${1.5}px`,
              transform: `${0}rad)`,
              transformOrigin: "0 0",
              pointerEvents: "none",
            }}
          />
        ) : (
          <CursorFollower key={index} matrixRef={matrixRef} pos={pos} />
        )
      )}
    </div>
  );
}
