"use client";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/app/context/ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`cursor-pointer rounded-md p-2 text-muted transition hover:bg-accent-soft hover:text-foreground ${className}`}
    >
      <FiSun className="hidden size-5 dark:block" />
      <FiMoon className="size-5 dark:hidden" />
    </button>
  );
}
