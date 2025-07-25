"use client";
import { motion } from "framer-motion";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectPageBanner from "@/app/components/ProjectPageBanner";
import CommentSection from "@/app/components/CommentSection";
import RoundButton from "@/app/components/RoundButton";
import clsx from "clsx";

export default function PortfolioProjectPage() {
  const title = "Project 2: Portfolio";
  const description =
    "A personal portfolio website built with Next.js and Tailwind CSS.";

  return (
    <main className="dark:bg-black">
      <ProjectPageBanner
        imageSrc="/images/portfolio.gif"
        imageAlt="Portfolio"
        title={title}
        description={description}
      />
      <TextPageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          className="max-w-275 mx-auto"
        >
          {/* View Code button */}
          <RoundButton
            href="https://github.com/lucasarden/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-block mb-6 px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors font-medium",
              "dark:bg-white dark:text-black dark:hover:bg-lucas-white-hover"
            )}
          >
            View Code on GitHub
          </RoundButton>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Next.js & Tailwind CSS</li>
              <li>Node.js</li>
              <li>MongoDB</li>
            </ul>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Responsive design</li>
              <li>Dynamic project showcases</li>
              <li>Custom animations and transitions</li>
            </ul>
          </div>

          {/* What I Learned */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">What I Learned</h4>
            <p className="text-gray-700 dark:text-gray-300">
              This project taught me how to structure a web application using an
              object-oriented approach in TypeScript, how to implement custom
              components and hooks in React, and how to build a responsive UI
              with Tailwind CSS. I also deepened my understanding of client-side
              routing and state management.
            </p>
          </div>
        </motion.div>
        <CommentSection projectId="portfolio" />
      </TextPageWrapper>
    </main>
  );
}
