"use client";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      redirect(`${pathname}/santa-clara`);
    }
  }, [pathname]);

  return null;
}
