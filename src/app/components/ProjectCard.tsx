"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import ProjectVideo from "@/app/components/ProjectVideo";

interface ProjectCardProps {
  title: string;
  description: string;
  video: string;
  poster: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ProjectCard({
  title,
  description,
  video,
  poster,
  href = "/",
  className = "",
  children,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={clsx(
            "h-full cursor-pointer p-6 space-y-6 justify-center items-center flex flex-col rounded-xl border border-edge bg-glass backdrop-blur-md",
            "hover:border-edge-strong hover:scale-[1.01]",
            "lg:space-x-12 lg:space-y-0 lg:justify-between lg:flex-row",
            "duration-200 ease-in-out",
            className
          )}
        >
          <div>
            <h2 className="text-2xl font-semibold text-center lg:text-left">
              {title}
            </h2>
            <p className="mt-2 text-center lg:text-left">{description}</p>
            {children}
          </div>
          <ProjectVideo
            src={video}
            poster={poster}
            className="w-[250px] shrink-0 rounded-md object-cover"
          />
        </div>
      </motion.div>
    </Link>
  );
}
