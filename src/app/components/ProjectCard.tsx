"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`h-full duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] hover:brightness-[99%] cursor-pointer p-6 lg:space-x-12 space-y-6 lg:space-y-0 justify-center lg:justify-between items-center flex flex-col lg:flex-row bg-white rounded-xl shadow ${className}`}
        >
          <div>
            <motion.h2
              className="text-2xl font-semibold text-center lg:text-left"
              transition={{ type: "tween", duration: 0, ease: "easeInOut" }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="mt-2 text-center lg:text-left"
              transition={{ type: "tween", duration: 0, ease: "easeInOut" }}
            >
              {description}
            </motion.p>
            {children}
          </div>
          <div>
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="object-cover rounded-md"
              width={250}
              height={250}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
