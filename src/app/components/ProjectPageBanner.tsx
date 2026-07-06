"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import ProjectVideo from "@/app/components/ProjectVideo";

interface ProjectPageBannerProps {
  video: string;
  poster: string;
  title: string;
  description: string;
}

const backButtonStyles = clsx(
  "px-4 py-2 rounded-full font-semibold transition-colors justify-center flex cursor-pointer",
  "bg-lucas-main-color hover:bg-lucas-main-color-hover text-white"
);

export default function ProjectPageBanner({
  video,
  poster,
  title,
  description,
}: ProjectPageBannerProps) {
  const router = useRouter();
  const goBack = () => router.back();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        "h-full bg-white shadow-lg",
        "dark:bg-lucas-dark dark:text-white dark:shadow-lucas-main-color mb-5"
      )}
    >
      <div className="lg:hidden flex items-center pt-5 px-8 max-w-350 mx-auto">
        <button onClick={goBack} className={backButtonStyles}>
          ← Back to projects
        </button>
      </div>
      <div className="relative flex flex-col mx-auto lg:flex-row items-center justify-between space-y-6 lg:space-y-0 py-5 px-8 lg:px-30 max-w-350">
        <div className="hidden lg:flex lg:absolute lg:top-10 lg:left-30 z-10">
          <button onClick={goBack} className={backButtonStyles}>
            ← Back to projects
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center lg:text-left">
            {title}
          </h2>
          <p className="mt-2 text-center lg:text-left pr-15">{description}</p>
        </div>

        <div className="mb-6 shadow-md rounded-md overflow-hidden">
          <ProjectVideo
            src={video}
            poster={poster}
            className="w-100 max-w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
