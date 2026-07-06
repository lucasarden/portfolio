import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <TextPageWrapper>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Selected Work
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">My Projects</h1>
      <p className="text-lg text-muted">
        Here are some of the projects I've worked on:
      </p>
      <div className="flex flex-col gap-6 pb-20">
        {projects.map((project) => (
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
    </TextPageWrapper>
  );
}
