"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Auth not yet implemented");
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
        <h1 className="text-3xl tracking-[0.2em] font-light text-center">
          CREATE ACCOUNT
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
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
          className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] font-medium hover:bg-white/90 transition-colors"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white/70 hover:text-white underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
