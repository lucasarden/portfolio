"use client";
import RoundedSection from "@/app/components/RoundedSection";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RoundButton from "@/app/components/RoundButton";

export default function MyAccount() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await signOut();

    window.location.reload();
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || !session || !session.user) {
    return (
      <main className="flex items-center justify-center py-20">
        <RoundedSection className="flex-col justify-center py-8 px-8 lg:px-25 h-100 w-md max-w-full space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent mb-4"></div>
          <span className="text-lg text-accent font-semibold">
            Loading...
          </span>
        </RoundedSection>
      </main>
    );
  }
  return (
    <main className="flex items-center justify-center py-20">
      <RoundedSection className="flex-col justify-center py-8 px-8 lg:px-25 space-y-4">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p className="mt-4 text-lg">You are currently logged in as:</p>
        <p className="mt-1 text-lg">{session.user.email}</p>
        <RoundButton
          onClick={handleLogout}
          className="bg-accent text-white dark:text-background p-2 hover:bg-accent-hover cursor-pointer"
        >
          Log Out
        </RoundButton>
      </RoundedSection>
    </main>
  );
}
