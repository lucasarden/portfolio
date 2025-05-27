"use client";
import { motion } from "framer-motion";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import { AnimatePresence } from "framer-motion";
import ProjectPageBanner from "@/app/components/ProjectPageBanner";

export default function ChessboardProjectPage() {
  const title = "Project 1: Chessboard";
  const description = "A chessboard implementation using Python and Pygame.";

  return (
    <>
      <ProjectPageBanner
        imageSrc="/images/chessboard.gif"
        imageAlt="Chessboard"
        title={title}
        description={description}
      />
      <TextPageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          className="max-w-350 mx-auto mt-20 px-8 lg:px-30"
        >
          {/* View Code button */}
          <a
            href="https://github.com/lucasarden/chessboard"
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
              <li>Python</li>
              <li>Pygame</li>
              <li>Custom move validation logic (no libraries)</li>
            </ul>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Full chessboard and piece rendering</li>
              <li>Legal move generation, including en passant and castling</li>
              <li>Turn-based system with move validation</li>
              <li>Custom UI layout using Pygame surfaces</li>
            </ul>
          </div>

          {/* What I Learned */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">What I Learned</h4>
            <p className="text-gray-700">
              This project taught me how to structure a game using an
              object-oriented approach in Python, how to implement custom
              rulesets like chess without relying on third-party logic
              libraries, and how to build an interactive UI with Pygame. I also
              deepened my understanding of 2D graphics, state management, and
              rendering performance.
            </p>
          </div>
        </motion.div>
      </TextPageWrapper>
    </>
  );
}
