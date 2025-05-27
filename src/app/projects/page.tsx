import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectCard from "@/app/components/ProjectCard";

export default function Projects() {
  return (
    <TextPageWrapper>
      <h1 className="text-4xl font-bold">My Projects</h1>
      <p className="text-lg">Here are some of the projects I've worked on:</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProjectCard
          title="Project 1: Chessboard"
          description="A chessboard implementation using Python and Pygame."
          imageSrc="/images/chessboard.gif"
          imageAlt="Chessboard"
          href="/projects/chessboard"
          layoutId="chessboard"
        />
        <ProjectCard
          title="Project 2: Portfolio"
          description="A personal portfolio website built with Next.js and Tailwind CSS."
          imageSrc="/images/portfolio.gif"
          imageAlt="Portfolio"
          href="/projects/portfolio"
          layoutId="portfolio"
        />
      </div>
    </TextPageWrapper>
  );
}
