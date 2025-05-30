"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import RoundedSection from "@/app/components/RoundedSection";
export default function Login() {
  const { data: session } = useSession();
  return (
    <main className="flex items-center justify-center py-20">
      <RoundedSection className="flex-col justify-center py-8 px-25 space-y-4">
        <h1 className="text-4xl font-bold">{session ? "Welcome!" : "Login"}</h1>

        <p className="mt-4 text-lg">
          {session
            ? `You're signed in as ${session.user?.email}`
            : "Please sign in with one of the providers below."}
        </p>

        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => signIn("github")}
              className="bg-black text-white rounded-lg p-2 hover:bg-gray-800"
            >
              Sign in with GitHub
            </button>
          </>
        )}
      </RoundedSection>
    </main>
  );
}
