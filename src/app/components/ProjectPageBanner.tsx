import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import clsx from "clsx";
interface ProjectPageBannerProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function ProjectPageBanner({
  imageSrc,
  imageAlt,
  title,
  description,
}: ProjectPageBannerProps) {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const showContent = imageLoaded && isInView;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={showContent ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        "h-full bg-white shadow-lg",
        "dark:bg-lucas-dark dark:text-white dark:shadow-lucas-main-color mb-5"
      )}
    >
      <div className="lg:hidden flex items-center pt-5 px-8 max-w-350 mx-auto">
        <button
          onClick={handleBackClick}
          className={clsx(
            "px-4 py-2 rounded-full font-semibold transition-colors justify-center flex cursor-pointer",
            "bg-lucas-main-color hover:bg-lucas-main-color-hover text-white"
          )}
        >
          ← Back to projects
        </button>
      </div>
      <div className="relative flex flex-col mx-auto lg:flex-row items-center justify-between space-y-6 lg:space-y-0 py-5 px-8 lg:px-30 max-w-350">
        <div className="hidden lg:flex lg:absolute lg:top-10 lg:left-30 z-10">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 rounded-full font-semibold transition-colors justify-center flex cursor-pointer bg-lucas-main-color hover:bg-lucas-main-color-hover text-white"
          >
            ← Back to projects
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center lg:text-left">
            {title}
          </h2>
          <p className="mt-2 text-center lg:text-left">{description}</p>
        </div>

        <div className="mb-6 shadow-md rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </motion.div>
  );
}
