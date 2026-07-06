import type { Metadata } from "next";
import { FiDownload } from "react-icons/fi";
import { resume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé · Lucas Arden",
  description:
    "Résumé of Lucas Arden, full-stack software engineer (TypeScript / React / Node).",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-edge pb-2 font-mono text-xs uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 lg:px-8 print:max-w-none print:p-0">
      <div className="rounded-xl border border-edge bg-surface p-6 lg:p-10 print:rounded-none print:border-none print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              {resume.name}
            </h1>
            <p className="mt-1 text-lg text-accent">{resume.title}</p>
            <p className="mt-2 text-sm text-muted">
              {resume.location} · {resume.phone} ·{" "}
              <a
                href={`mailto:${resume.email}`}
                className="text-accent hover:text-accent-hover"
              >
                {resume.email}
              </a>
            </p>
            <p className="mt-1 flex flex-wrap gap-4 font-mono text-sm">
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                LinkedIn
              </a>
              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                GitHub
              </a>
            </p>
            <p className="mt-2 text-sm italic text-muted">
              {resume.availability}
            </p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-md border border-edge-strong px-4 py-2 font-mono text-sm transition hover:bg-accent-soft print:hidden"
          >
            <FiDownload className="size-4" />
            Download PDF
          </a>
        </header>

        <section className="mt-8">
          <SectionHeading>Summary</SectionHeading>
          <p>{resume.summary}</p>
        </section>

        <section className="mt-8">
          <SectionHeading>Skills</SectionHeading>
          <dl className="space-y-2">
            {resume.skills.map(({ category, items }) => (
              <div key={category} className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="shrink-0 font-mono text-sm text-muted sm:w-36 sm:pt-0.5">
                  {category}
                </dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-6">
            {resume.experience.map((job) => (
              <article key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">
                    {job.company}{" "}
                    <span className="font-normal text-muted">— {job.role}</span>
                  </h3>
                  <span className="font-mono text-sm text-muted">
                    {job.dates}
                  </span>
                </div>
                <p className="text-sm italic text-muted">
                  {job.location}
                  {job.locationNote && ` (${job.locationNote})`}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionHeading>Projects</SectionHeading>
          <ul className="space-y-2">
            {resume.projects.map((project) => (
              <li key={project.name}>
                <span className="font-semibold">{project.name}</span>
                <span className="text-muted"> — {project.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <SectionHeading>Education</SectionHeading>
          <p>
            <span className="font-semibold">{resume.education.school}</span>
            <span className="text-muted"> — {resume.education.degree}</span>
          </p>
        </section>
      </div>
    </main>
  );
}
