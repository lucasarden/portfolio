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
  layoutId: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href = "/",
  layoutId,
  className = "",
  children,
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <motion.div
        layoutId={`card-${layoutId}`}
        className={`transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] hover:brightness-[99%] cursor-pointer p-6 lg:space-x-12 space-y-6 lg:space-y-0 justify-center lg:justify-between items-center flex flex-col lg:flex-row bg-white rounded-xl shadow ${className}`}
      >
        <div>
          <motion.h2
            layoutId={`title-${layoutId}`}
            className="text-2xl font-semibold text-center lg:text-left"
          >
            {title}
          </motion.h2>
          <motion.p
            layoutId={`desc-${layoutId}`}
            className="mt-2 text-center lg:text-left"
          >
            {description}
          </motion.p>
          {children}
        </div>
        <motion.div layoutId={`img-${layoutId}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="object-cover rounded-md"
            width={250}
            height={250}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}
