import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectCard from "@/app/components/ProjectCard";

export default function Projects() {
  return (
    <TextPageWrapper>
      <h1 className="text-4xl font-bold">My Projects</h1>
      <p className="text-lg">Here are some of the projects I've worked on:</p>
      <div className="flex flex-col gap-6">
        <ProjectCard
          title="Starving Musician E-Commerce Platform"
          description="A full-stack e-commerce platform consolidating two legacy ZenCart storefronts into a unified Next.js + PHP platform for two retail locations."
          imageSrc="/images/starving-musician.gif"
          imageAlt="Starving Musician E-Commerce Platform"
          href="/projects/starving-musician"
          key="starving-musician"
        />
        <ProjectCard
          title="Chessboard"
          description="A chessboard implementation using Python and Pygame."
          imageSrc="/images/chessboard.gif"
          imageAlt="Chessboard"
          href="/projects/chessboard"
          key="chessboard"
        />
        <ProjectCard
          title="Portfolio"
          description="A personal portfolio website built with Next.js, Tailwind CSS and MongoDB."
          imageSrc="/images/portfolio.gif"
          imageAlt="Portfolio"
          href="/projects/portfolio"
          key="portfolio"
        />
      </div>
    </TextPageWrapper>
  );
}
