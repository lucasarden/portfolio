"use client";
import { motion } from "framer-motion";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectPageBanner from "@/app/components/ProjectPageBanner";

export default function PortfolioProjectPage() {
  const title = "Project 2: Portfolio";
  const description =
    "A personal portfolio website built with Next.js and Tailwind CSS.";

  return (
    <>
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
          className="max-w-275 mx-auto mt-20"
        >
          {/* View Code button */}
          <a
            href="https://github.com/lucasarden/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors font-medium"
          >
            View Code on GitHub
          </a>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>TypeScript</li>
            </ul>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Responsive design</li>
              <li>Dynamic project showcases</li>
              <li>Custom animations and transitions</li>
            </ul>
          </div>

          {/* What I Learned */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">What I Learned</h4>
            <p className="text-gray-700">
              This project taught me how to structure a web application using an
              object-oriented approach in TypeScript, how to implement custom
              components and hooks in React, and how to build a responsive UI
              with Tailwind CSS. I also deepened my understanding of client-side
              routing and state management.
            </p>
          </div>
        </motion.div>
      </TextPageWrapper>
    </>
  );
}
