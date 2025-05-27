import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RoundButton from "@/app/components/RoundButton";
import { desc } from "framer-motion/client";
interface ProjectPageBannerProps {
  layoutId: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ProjectPageBanner({
  layoutId,
  title,
  description,
  children,
}: ProjectPageBannerProps) {
  return (
    <motion.div
      layoutId={`card-${layoutId}`}
      transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      className="bg-white w-full"
    >
      <div className="relative flex flex-col mx-auto lg:flex-row items-center justify-between space-y-6 lg:space-y-0 py-5 px-8 lg:px-30 max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden lg:flex lg:absolute lg:top-10 lg:left-30 z-10"
        >
          <RoundButton
            href="/projects"
            className="cursor-pointer bg-lucas-main-color hover:bg-lucas-main-color-hover text-white font-semibold transition-colors justify-center"
          >
            ← Back to projects
          </RoundButton>
        </motion.div>
        <div>
          <motion.h2
            layoutId={`title-${layoutId}`}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="text-2xl font-semibold text-center lg:text-left"
          >
            {title}
          </motion.h2>
          <motion.p
            layoutId={`desc-${layoutId}`}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="mt-2 text-center lg:text-left"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          layoutId={`img-${layoutId}`}
          className="mb-6"
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={`/images/${layoutId}.gif`}
            alt="Chessboard"
            width={400}
            height={400}
            className="rounded-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
