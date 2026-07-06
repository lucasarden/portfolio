"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectPageBanner from "@/app/components/ProjectPageBanner";
import CommentSection from "@/app/components/CommentSection";
import RoundButton from "@/app/components/RoundButton";
import type { Project } from "@/lib/projects";

function ProjectSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">{heading}</h4>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const linkButtonStyles = clsx(
  "inline-block mb-6 mr-4 px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors font-medium",
  "dark:bg-white dark:text-black dark:hover:bg-lucas-white-hover"
);

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main>
      <ProjectPageBanner
        video={project.video}
        poster={project.poster}
        title={project.title}
        description={project.summary}
      />
      <TextPageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          className="max-w-350 mx-auto px-8 lg:px-30"
        >
          {project.liveUrl && (
            <RoundButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkButtonStyles}
            >
              Visit Site
            </RoundButton>
          )}
          {project.github && (
            <RoundButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkButtonStyles}
            >
              View Code on GitHub
            </RoundButton>
          )}

          <ProjectSection heading="Tech Stack">
            <BulletList items={project.techStack} />
          </ProjectSection>

          <ProjectSection heading="Features">
            <BulletList items={project.features} />
          </ProjectSection>

          {project.impact && (
            <ProjectSection heading="Impact">
              <BulletList items={project.impact} />
            </ProjectSection>
          )}

          <ProjectSection heading="What I Learned">
            <p className="text-gray-700 dark:text-gray-300">
              {project.learned}
            </p>
          </ProjectSection>
        </motion.div>
        <CommentSection projectId={project.slug} />
      </TextPageWrapper>
    </main>
  );
}
