"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RoundedSection from "@/app/components/RoundedSection";

export default function CreateAccount() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email || !password || !name) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      setError(text || "Something went wrong.");
      return;
    }

    setSuccess("Account created! Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 1700);
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center py-20">
        <RoundedSection className="flex-col justify-center py-8 px-25 w-[484px] space-y-4 h-[512px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lucas-main-color mb-4"></div>
          {success ? (
            <span className="text-lg text-lucas-main-color font-semibold text-center">
              {success}
            </span>
          ) : (
            <>
              <span className="text-lg text-lucas-main-color font-semibold text-center">
                Loading...
              </span>
            </>
          )}
        </RoundedSection>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center py-20">
      <RoundedSection className="flex-col justify-center py-8 px-25 space-y-4">
        <h1 className="text-4xl font-bold">Create Account</h1>
        <p className="mt-4 text-lg">
          Fill out the form to create your account.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 py-4">
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            className="font-semibold cursor-pointer bg-lucas-main-color text-white rounded-lg p-2 hover:bg-lucas-main-color-hover"
          >
            Create Account
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </RoundedSection>
    </main>
  );
}
