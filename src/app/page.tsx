"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Banner from "@/app/components/Banner";
import RoundButton from "@/app/components/RoundButton";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import { motion, useInView } from "framer-motion";
export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resumeLoaded, setResumeLoaded] = useState(false);

  const mainRef = useRef(null);
  const mainIsInView = useInView(mainRef, { once: true, margin: "-50px" });

  const resumeRef = useRef(null);
  const resumeIsInView = useInView(resumeRef, { once: true, margin: "-50px" });

  const showMainContent = imageLoaded && mainIsInView;
  const showResume = resumeLoaded && resumeIsInView;

  return (
    <main>
      <Banner>
        <h1 className="text-4xl font-bold text-white text-center">
          Welcome to my Portfolio!
        </h1>
        <p className="mt-2 text-lg text-white text-center">
          This is a simple portfolio site built with Next.js.
        </p>
        <RoundButton
          className="bg-white hover:bg-lucas-white-hover py-2 px-4 mt-5"
          href="/projects"
        >
          View Projects
        </RoundButton>
      </Banner>
      <motion.div
        ref={resumeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={showResume ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
      >
        <div className="my-12 flex justify-center">
          <iframe
            src="/resume.pdf"
            className="w-full max-w-4xl h-[1120px] border rounded-md shadow-md"
            title="Lucas Arden Resume"
            onLoad={() => setResumeLoaded(true)}
          />
        </div>
      </motion.div>
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0, y: 20 }}
        animate={showMainContent ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex justify-center my-8">
          <Image
            src="/images/lucasarden.jpg"
            alt="Lucas Arden"
            width={300}
            height={300}
            className="rounded-full border-2 border-lucas-main-color shadow-md"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <TextPageWrapper>
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="mt-4 text-lg">
            I have 7 years of personal programming experience with a fundamental
            knowledge of software design, development, and testing. I am an
            aspiring software engineer with a Bachelor's Degree of Science in
            Computer Science from the University of California, Santa Cruz. I
            enjoy solving problems and puzzles and appreciate the process and
            struggle of deciphering every part of a complicated task. The people
            around me describe me as spirited, dedicated, and punctual and I am
            privileged to have developed lasting relationships with many fellow
            classmates and coworkers.
          </p>
          <p className="mt-4 text-lg">
            In my free time, I enjoy working on personal projects, reading tech
            blogs, and contributing to open-source projects.
          </p>
          <p className="mt-4 text-lg">
            Feel free to reach out to me if you have any questions or would like
            to collaborate on a project!
          </p>
        </TextPageWrapper>
      </motion.div>
    </main>
  );
}
