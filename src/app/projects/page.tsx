import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectCard from "@/app/components/ProjectCard";

export default function Projects() {
  return (
    <TextPageWrapper>
      <h1 className="text-4xl font-bold">My Projects</h1>
      <p className="mt-4 text-lg">
        Here are some of the projects I've worked on:
      </p>
      <ProjectCard
        title="Project 1: Chessboard"
        description="A chessboard implementation using Python and Pygame."
        imageSrc="/images/chessboard.gif"
        imageAlt="Chessboard"
        href="/projects/chessboard"
        layoutId="chessboard"
      />
    </TextPageWrapper>
  );
}
