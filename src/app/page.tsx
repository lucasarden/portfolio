import Image from "next/image";
import Banner from "@/app/components/Banner";
import RoundButton from "@/app/components/RoundButton";
import TextPageWrapper from "@/app/components/TextPageWrapper";
export default function Home() {
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
      <div className="flex justify-center my-8">
        <Image
          src="/images/lucas.jpg"
          alt="Lucas Arden"
          width={300}
          height={300}
          className="rounded-full border-2 border-lucas-main-color"
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
    </main>
  );
}
