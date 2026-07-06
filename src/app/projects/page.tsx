import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <TextPageWrapper>
      <h1 className="text-4xl font-bold">My Projects</h1>
      <p className="text-lg">Here are some of the projects I've worked on:</p>
      <div className="flex flex-col gap-6">
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
