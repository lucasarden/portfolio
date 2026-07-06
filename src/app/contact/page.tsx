import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import TextPageWrapper from "@/app/components/TextPageWrapper";

const methods = [
  {
    label: "Email",
    value: "lucas91913@gmail.com",
    href: "mailto:lucas91913@gmail.com",
    icon: <FiMail className="size-5" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/lucas-arden",
    href: "https://www.linkedin.com/in/lucas-arden-22177818a/",
    icon: <FiLinkedin className="size-5" />,
  },
  {
    label: "GitHub",
    value: "github.com/lucasarden",
    href: "https://github.com/lucasarden",
    icon: <FiGithub className="size-5" />,
  },
];

export default function Contact() {
  return (
    <TextPageWrapper className="pb-20">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Get in touch
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Contact Me</h1>
      <p className="mt-4 text-lg text-muted">
        If you'd like to get in touch, feel free to reach out through any of
        the following methods:
      </p>
      <div className="mt-6 flex max-w-xl flex-col gap-3">
        {methods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={
              method.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="flex items-center gap-4 rounded-xl border border-edge bg-surface p-4 transition hover:border-edge-strong hover:bg-accent-soft"
          >
            <span className="text-accent">{method.icon}</span>
            <span className="font-mono text-sm text-muted">{method.label}</span>
            <span className="ml-auto text-accent">{method.value}</span>
          </a>
        ))}
      </div>
    </TextPageWrapper>
  );
}
