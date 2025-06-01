"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import RoundedSection from "@/app/components/RoundedSection";
import VerifiedMessage from "@/app/components/VerifiedMessage";
import Link from "next/link";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setLoading(false);
      if (res.error === "Email not verified") {
        setError("Please verify your email before logging in.");
      } else {
        setError("Invalid credentials");
      }
    } else {
      router.push("/my-account");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/my-account");
    }
  }, [status, router]);

  return (
    <>
    <Suspense>
        <VerifiedMessage setSuccess={setSuccess} />
    </Suspense>
    <main className="flex items-center justify-center py-20">
      <RoundedSection className="flex-col justify-center py-8 px-5 space-y-4 w-full max-w-110">
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
          {loading ? (
            <span className="text-center bg-lucas-main-color-hover text-white rounded-lg p-2 font-semibold cursor-not-allowed opacity-50">
              Login
            </span>
          ) : (
            <button
              type="submit"
              className="bg-lucas-main-color text-white rounded-lg p-2 hover:bg-lucas-main-color-hover font-semibold cursor-pointer"
            >
              Login
            </button>
          )}
        </form>
        <div className="flex items-center gap-3 w-full my-4">
          <div className="flex-grow h-1 bg-gray-300 rounded-md" />
          <span className="text-lucas-main-color font-semibold whitespace-nowrap">
            or
          </span>
          <div className="flex-grow h-1 bg-gray-300 rounded-md" />
        </div>
        <p className="mt-4 text-lg">Sign in with one of the providers below:</p>
        <div className="mx-auto w-full max-w-55 flex flex-col space-y-4">
          <button
            onClick={() => signIn("github")}
            className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 font-semibold cursor-pointer"
          >
            Sign in with GitHub
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
        <p className="mt-4 text-md text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/create-account"
            className="text-lucas-main-color underline hover:text-lucas-main-color-hover"
          >
            Create One
          </Link>
        </p>
      </RoundedSection>
    </main>
    </>
  );
}
