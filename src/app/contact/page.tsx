import RoundButton from "@/app/components/RoundButton";

export default function Projects() {
  return (
    <>
      <main>
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="mt-4 text-lg">
          If you'd like to get in touch, feel free to reach out through any of
          the following methods:
        </p>
        <ul className="mt-4 list-disc list-inside px-1 space-y-3">
          <li>
            Email:{" "}
            <RoundButton
              href="mailto:lucas91913@gmail.com"
              className="text-blue-500 hover:underline"
            >
              lucas91913@gmail.com
            </RoundButton>
          </li>
          <li>
            LinkedIn:{" "}
            <RoundButton
              href="https://www.linkedin.com/in/lucas-arden-22177818a/"
              className="text-blue-500 hover:underline"
            >
              My LinkedIn Profile
            </RoundButton>
          </li>
          <li>
            GitHub:{" "}
            <RoundButton
              href="https://github.com/lucasarden"
              className="text-blue-500 hover:underline"
            >
              My GitHub Profile
            </RoundButton>
          </li>
        </ul>
      </main>
    </>
  );
}
