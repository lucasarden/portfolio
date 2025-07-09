"use client";
import { SessionProvider } from "next-auth/react";
import { HomepageProvider } from "./context/HomepageProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HomepageProvider>
      <SessionProvider>{children}</SessionProvider>
    </HomepageProvider>
  );
}
