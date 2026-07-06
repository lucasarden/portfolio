"use client";
import { SessionProvider } from "next-auth/react";
import { HomepageProvider } from "./context/HomepageProvider";
import { ThemeProvider } from "./context/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HomepageProvider>
        <SessionProvider>{children}</SessionProvider>
      </HomepageProvider>
    </ThemeProvider>
  );
}
