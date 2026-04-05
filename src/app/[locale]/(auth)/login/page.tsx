"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Неверный email или пароль");
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
        <h1 className="text-3xl tracking-[0.2em] font-light text-center">
          SIGN IN
        </h1>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "SIGN IN"}
        </button>

        <p className="text-center text-sm text-white/40">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
