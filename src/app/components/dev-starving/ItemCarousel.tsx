"use client";
import { useState } from "react";
import ItemCard from "@/app/components/dev-starving/ItemCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clsx from "clsx";

const TOTAL_ITEMS = 10;
const VISIBLE_CARDS = 6;
const CARD_WIDTH = 200;

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);

  const items = Array.from({ length: TOTAL_ITEMS }).map((_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    price: `$${(i + 1) * 100}`,
  }));

  const handleNext = () => {
    if (startIndex + VISIBLE_CARDS <= items.length) {
      setStartIndex((prev) => prev + 3);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 3);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-[330px]">
        {/* Sliding Track */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${-startIndex * CARD_WIDTH + 55}px)`,
          }}
        >
          {items.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              price={item.price}
              className="min-w-64 flex-shrink-0"
            />
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className={clsx(
            "absolute left-2 top-2/5 -translate-y-1/2 bg-tsm-gray text-white",
            "p-2 rounded-full shadow z-20 cursor-pointer text-2xl",
            "transition-all duration-300 ease-in-out transform hover:scale-110",
            startIndex > 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className={clsx(
            "absolute right-2 top-2/5 -translate-y-1/2 bg-tsm-gray text-white",
            "p-2 rounded-full shadow z-20 cursor-pointer text-2xl",
            "transition-all duration-300 ease-in-out transform hover:scale-110",
            startIndex + VISIBLE_CARDS <= items.length
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <FaArrowRight />
        </button>
      </div>
      {/* Left fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-24 h-full z-10 bg-gradient-to-r from-white/100 to-white/0" />

      {/* Right fade */}
      <div className="pointer-events-none absolute top-0 right-0 w-24 h-full z-10 bg-gradient-to-l from-white/100 to-white/0" />
    </div>
  );
}
