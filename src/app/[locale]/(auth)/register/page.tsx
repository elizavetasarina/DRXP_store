"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("auth");
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
      setError(t("passwordMismatch"));
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
      setError(data.message || t("registrationError"));
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
          {t("createAccountTitle")}
        </h1>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder={t("fullName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder={t("email")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder={t("password")}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder={t("confirmPassword")}
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
          {loading ? "..." : t("createAccountButton")}
        </button>

        <p className="text-center text-sm text-white/40">
          {t("haveAccount")}{" "}
          <Link href="/login" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
            {t("signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}
