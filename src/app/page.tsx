"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useHomepage } from "@/app/context/HomepageProvider";
import DotMatrix from "@/app/components/DotMatrix";
import ProjectCard from "@/app/components/ProjectCard";
import RoundButton from "@/app/components/RoundButton";
import { projects } from "@/lib/projects";

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 font-mono text-sm text-accent transition hover:text-accent-hover"
    >
      {icon}
      {label}
    </a>
  );
}

export default function Home() {
  const { isLeavingPage, resetState } = useHomepage();
  const resetStateRef = useRef(resetState);

  useEffect(() => {
    resetStateRef.current();
  }, []);

  const featured = projects.filter((project) => project.featured);

  return (
    <main>
      <DotMatrix fullPage disabled={isLeavingPage} />
      <div className="mx-auto max-w-350 px-8">
        <section className="flex min-h-[calc(100svh-180px)] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl rounded-2xl border border-edge bg-glass p-8 backdrop-blur-md lg:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Software Engineer · Santa Cruz, CA
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight lg:text-7xl">
              Lucas Arden
            </h1>
            <p className="mt-6 text-lg text-muted">
              I build fast, polished web software — most recently a retail
              company's entire e-commerce platform, solo. The dots behind this
              text are a hand-written Navier–Stokes fluid simulation: drag your
              cursor through them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <RoundButton
                href="#projects"
                doNotDisableMatrix
                className="bg-accent px-6 py-3 text-white hover:bg-accent-hover dark:text-background"
              >
                View Projects
              </RoundButton>
              <RoundButton
                href="/resume.pdf"
                target="_blank"
                className="border border-edge-strong px-6 py-3 hover:bg-accent-soft"
              >
                Résumé →
              </RoundButton>
            </div>
          </motion.div>
        </section>

        <Reveal id="projects" className="scroll-mt-28 py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Selected Work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Projects
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.summary}
                video={project.video}
                poster={project.poster}
                href={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="py-16 pb-24">
          <div className="rounded-2xl border border-edge bg-glass p-8 backdrop-blur-md lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <Image
                src="/images/lucasarden.jpg"
                alt="Lucas Arden"
                width={160}
                height={160}
                className="h-40 w-40 shrink-0 rounded-full border-2 border-accent object-cover"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  About
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  About Me
                </h2>
                <p className="mt-4 text-lg">
                  I'm a full-stack engineer with a B.S. in Computer Science
                  from UC Santa Cruz. Most recently I rebuilt The Starving
                  Musician's entire digital stack solo — e-commerce platform,
                  marketplace integrations, a POS database migration, and
                  PCI-compliant payment automation — with measurable revenue
                  impact.
                </p>
                <p className="mt-4 text-lg">
                  Away from work I'm usually deep in a personal project, like
                  the fluid simulation running behind this page. Open to
                  remote or on-site — willing to relocate.
                </p>
                <div className="mt-6 flex flex-wrap gap-6">
                  <ContactLink
                    href="mailto:lucas91913@gmail.com"
                    icon={<FiMail className="size-4" />}
                    label="Email"
                  />
                  <ContactLink
                    href="https://github.com/lucasarden"
                    icon={<FiGithub className="size-4" />}
                    label="GitHub"
                  />
                  <ContactLink
                    href="https://www.linkedin.com/in/lucas-arden-22177818a/"
                    icon={<FiLinkedin className="size-4" />}
                    label="LinkedIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
