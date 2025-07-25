"use client";
import { useState, useRef, useEffect } from "react";
import { useHomepage } from "@/app/context/HomepageProvider";
import Image from "next/image";
import Banner from "@/app/components/Banner";
import RoundButton from "@/app/components/RoundButton";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import { motion, useInView } from "framer-motion";
import DotMatrix from "@/app/components/DotMatrix";
import RoundedSection from "@/app/components/RoundedSection";
import clsx from "clsx";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLeavingPage, resetState } = useHomepage();
  const resetStateRef = useRef(resetState);

  useEffect(() => {
    resetStateRef.current();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const mainRef = useRef(null);
  const mainIsInView = useInView(mainRef, { once: true, margin: "-50px" });

  const resumeRef = useRef(null);
  const resumeIsInView = useInView(resumeRef, { once: true, margin: "-50px" });

  const showMainContent = imageLoaded && mainIsInView;
  const showResume = resumeLoaded && resumeIsInView;

  return (
    <main className="dark:bg-black">
      <Banner className="py-48 relative z-10 px-10">
        <DotMatrix disabled={isLeavingPage} />
        <RoundedSection className="bg-white/10 dark:bg-white/5 backdrop-blur-xs flex-col py-8.5 px-8 shadow-white shadow-[0_0_5px_1px_rgba(0,0,0,0.25)]">
          <h1 className="text-4xl font-bold text-white dark:text-white text-center">
            Welcome to my Portfolio!
          </h1>
          <p className="mt-2 text-lg text-white dark:text-white text-center">
            This is a portfolio site built with Next.js.
          </p>
          <RoundButton
            className={clsx(
              "bg-lucas-main-color text-white hover:bg-lucas-main-color-hover py-2 px-4 mt-5 hover:ring-white hover:ring-3",
              "dark:bg-white dark:text-black dark:hover:bg-lucas-white-hover dark:hover:ring-lucas-main-color"
            )}
            href="/projects"
          >
            View Projects
          </RoundButton>
        </RoundedSection>
      </Banner>
      <Banner className="pt-4 bg-white dark:bg-black z-9 relative">
        <motion.div
          ref={resumeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={showResume ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <Image
              src={
                isDarkMode
                  ? "/images/inverted-resume.jpg"
                  : "/images/resume.jpg"
              }
              alt="Lucas Arden Resume"
              width={2550}
              height={3300}
              className="top-0 left-0 w-full h-full border-none"
              onLoad={() => setResumeLoaded(true)}
            />
          </div>
        </motion.div>
      </Banner>
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0, y: 20 }}
        animate={showMainContent ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
        className="dark:bg-lucas-dark dark:text-white w-full"
      >
        <div className="flex justify-center py-8">
          <Image
            src="/images/lucasarden.jpg"
            alt="Lucas Arden"
            width={300}
            height={300}
            className="rounded-full border-2 border-lucas-main-color shadow-md"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <TextPageWrapper className="dark:bg-lucas-dark px-0 pb-20">
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
