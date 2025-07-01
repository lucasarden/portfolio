"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href = "/",
  className = "",
  children,
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const showContent = isInView && imageLoaded;

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 100); // delay 100 milliseconds artificially
  };

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0.5, y: 20, scale: 1 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`h-full duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] hover:brightness-[99%] cursor-pointer p-6 lg:space-x-12 space-y-6 lg:space-y-0 justify-center lg:justify-between items-center flex flex-col lg:flex-row bg-white rounded-xl shadow ${className}`}
        >
          <div>
            {imageLoaded ? (
              <>
                <h2 className="text-2xl font-semibold text-center lg:text-left">
                  {title}
                </h2>
                <p className="mt-2 text-center lg:text-left">{description}</p>
                {children}
              </>
            ) : (
              <>
                <div className="w-[250px] h-7 rounded bg-gray-200 animate-pulse" />
                <div className="mt-2 w-[600px] h-5 rounded bg-gray-200 animate-pulse" />
              </>
            )}
          </div>
          <div className="relative w-[250px] h-[250px]">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={250}
              height={250}
              className={clsx(
                "object-cover rounded-md transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
