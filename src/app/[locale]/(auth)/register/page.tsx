"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Ошибка регистрации");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/account");
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
        <h1 className="text-3xl tracking-[0.2em] font-light text-center">
          CREATE ACCOUNT
        </h1>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "CREATE ACCOUNT"}
        </button>

        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
