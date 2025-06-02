"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifiedMessage({
  setSuccess,
}: {
  setSuccess: (msg: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setSuccess("Your email has been verified. You can now log in.");
    }
  }, [searchParams, setSuccess]);

  return null;
}
