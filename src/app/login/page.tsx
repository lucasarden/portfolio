"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RoundedSection from "@/app/components/RoundedSection";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/projects");
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    await signOut();

    window.location.reload();
  };

  if (session && session.user) {
    return (
      <main className="flex items-center justify-center py-20">
        <RoundedSection className="flex-col justify-center py-8 px-25 space-y-4">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="mt-4 text-lg">You are currently logged in as:</p>
          <p className="mt-1 text-lg">{session.user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-lucas-main-color text-white rounded-md p-2 hover:bg-lucas-main-color-hover cursor-pointer"
          >
            Log Out
          </button>
        </RoundedSection>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center py-20">
      <RoundedSection className="flex-col justify-center py-8 px-25 space-y-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="mt-4 text-lg">Please enter your credentials to log in.</p>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <button
            type="submit"
            className="bg-lucas-main-color text-white rounded-lg p-2 hover:bg-lucas-main-color-hover"
          >
            Login
          </button>
        </form>
        <div className="flex items-center gap-3 w-full my-4">
          <div className="flex-grow h-1 bg-gray-300 rounded-md" />
          <span className="text-lucas-main-color font-semibold whitespace-nowrap">
            or
          </span>
          <div className="flex-grow h-1 bg-gray-300 rounded-md" />
        </div>
        <p className="mt-4 text-lg">Sign in with one of the providers below:</p>
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white rounded-lg p-2 hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </RoundedSection>
    </main>
  );
}
