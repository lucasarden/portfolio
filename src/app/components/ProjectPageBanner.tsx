import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`h-full bg-white`}
    >
      <div className="lg:hidden flex items-center pt-5 px-8 max-w-350 mx-auto">
        <button
          onClick={handleBackClick}
          className="px-4 py-2 rounded-full font-semibold transition-colors justify-center flex cursor-pointer bg-lucas-main-color hover:bg-lucas-main-color-hover text-white"
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
          />
        </div>
      </div>
    </motion.div>
  );
}
