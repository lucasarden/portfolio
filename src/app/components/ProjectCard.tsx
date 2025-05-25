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
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        className={`transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] hover:brightness-[99%] cursor-pointer mt-8 p-6 md:space-x-12 justify-center md:justify-between items-center flex flex-col md:flex-row bg-white rounded-xl shadow ${className}`}
      >
        <div>
          <motion.h2
            layoutId={`title-${layoutId}`}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="text-2xl font-semibold text-center md:text-left"
          >
            {title}
          </motion.h2>
          <motion.p
            layoutId={`desc-${layoutId}`}
            className="mt-2 text-center md:text-left"
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            {description}
          </motion.p>
          {children}
        </div>
        <motion.div
          layoutId={`img-${layoutId}`}
          transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        >
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
