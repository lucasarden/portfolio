"use client";
import { useEffect, useState, useRef } from "react";

interface CursorFollowerProps {
  pos: { x: number; y: number };
  matrixRef: React.RefObject<HTMLInputElement | null>;
}

export default function CursorFollower({
  pos,
  matrixRef,
}: CursorFollowerProps) {
  const cursorPositionRef = useRef({ x: Infinity, y: Infinity });
  const cursorSpeedRef = useRef({ lastX: 0, lastY: 0, timestamp: Date.now() });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      const matrixRect = matrixRef.current?.getBoundingClientRect();
      if (!matrixRect) return;
      cursorSpeedRef.current = {
        lastX: cursorPositionRef.current.x,
        lastY: cursorPositionRef.current.y,
        timestamp: Date.now(),
      };

      cursorPositionRef.current = {
        x: event.clientX - matrixRect.left,
        y: event.clientY - matrixRect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [matrixRef]);

  const [currentPos, setCurrentPos] = useState({ x: pos.x, y: pos.y });
  const currentPosRef = useRef(currentPos);
  const prevPosRef = useRef({ x: pos.x, y: pos.y });
  const speedRef = useRef(1);

  useEffect(() => {
    currentPosRef.current = currentPos;
  });

  useEffect(() => {
    let animationFrameId: number;

    const move = () => {
      const dt = Date.now() - cursorSpeedRef.current.timestamp;
      if (dt !== 0) {
        const mousedx =
          cursorPositionRef.current.x - cursorSpeedRef.current.lastX;
        const mousedy =
          cursorPositionRef.current.y - cursorSpeedRef.current.lastY;
        const d = Math.pow(mousedx, 2) + Math.pow(mousedy, 2);
        let speed = d / dt;
        speed = speed < 0.08 ? 0 : speed;
        speedRef.current = speedRef.current + (speed - speedRef.current) * 0.03;
        speedRef.current = speedRef.current < 0.08 ? 0 : speedRef.current;
        speedRef.current = speedRef.current > 5 ? 5 : speedRef.current;
      }
      const thresholdDistance = Math.max(100, 250 / (speedRef.current / 4 + 1));

      let dx = pos.x - cursorPositionRef.current.x;
      let dy = pos.y - cursorPositionRef.current.y;

      const distanceToCursor = Math.sqrt(dx * dx + dy * dy);

      const target =
        distanceToCursor < thresholdDistance && distanceToCursor > 0.5
          ? cursorPositionRef.current
          : pos;

      dx = target.x - currentPosRef.current.x;
      dy = target.y - currentPosRef.current.y;

      const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

      const distanceFactor =
        distanceToCursor < thresholdDistance && distanceToCursor > 0.5
          ? Math.max(0.01, 1 - distanceToCursor / thresholdDistance)
          : 1;
      let step = 0.4 * distanceFactor;
      if (distanceToCursor > thresholdDistance) {
        step = 0.06;
      }

      const newX = currentPosRef.current.x + dx * step;
      const newY = currentPosRef.current.y + dy * step;

      const updateThreshold = 2;
      if (distanceToTarget > updateThreshold) {
        setCurrentPos({ x: newX, y: newY });
        prevPosRef.current = { x: newX, y: newY }; // Update the ref to track the latest position
      } else {
        setCurrentPos(target);
        prevPosRef.current = target;
      }
      animationFrameId = requestAnimationFrame(move);
    };

    // Start the animation loop
    move();

    // Clean up the animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos]);

  const angle = Math.atan2(
    currentPosRef.current.y - pos.y,
    currentPosRef.current.x - pos.x
  );
  const length = Math.sqrt(
    Math.sqrt(
      Math.pow(currentPosRef.current.y - pos.y, 2) +
        Math.pow(currentPosRef.current.x - pos.x, 2)
    )
  );
  const hasLength = length > 3;
  return (
    <div
      className="bg-white absolute rounded-md"
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${hasLength ? length : 1.5}px`,
        height: `${hasLength ? 3.5 : 1.5}px`,
        transform: `rotate(${hasLength ? angle : 0}rad)`,
        transformOrigin: "0 0",
        pointerEvents: "none",
      }}
    />
  );
}
