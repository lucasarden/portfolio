"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import RoundButton from "@/app/components/RoundButton";

export default function ChessboardProjectPage() {
  const router = useRouter();
  const title = "Project 1: Chessboard";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden md:flex md:absolute md:top-45 md:left-50 z-10"
      >
        <button
          onClick={() => router.back()}
          className="cursor-pointer bg-lucas-main-color hover:bg-lucas-main-color-hover text-white mb-8 px-3 py-3 rounded-full font-semibold transition-colors justify-center"
        >
          ← Back to projects
        </button>
      </motion.div>
      <motion.div
        layoutId={`card-chessboard`}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col md:flex-row items-center justify-between bg-white w-screen px-20 py-5 md:px-50 md:py-10"
      >
        <div>
          <motion.h2
            layoutId={`title-chessboard`}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            layoutId={`desc-chessboard`}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="text-lg mb-6 text-gray-700 max-w-3xl"
          >
            A chessboard implementation using Python and Pygame.
          </motion.p>
        </div>

        <motion.div
          layoutId={`img-chessboard`}
          className="mb-6"
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src="/images/chessboard.gif"
            alt="Chessboard"
            width={400}
            height={400}
            className="rounded-md"
          />
        </motion.div>
      </motion.div>
      <TextPageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-3xl mx-auto mt-20"
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
            object-oriented approach in Python, how to implement custom rulesets
            like chess without relying on third-party logic libraries, and how
            to build an interactive UI with Pygame. I also deepened my
            understanding of 2D graphics, state management, and rendering
            performance.
          </p>
        </div>
      </motion.div>
      </TextPageWrapper>
    </>
  );
}
