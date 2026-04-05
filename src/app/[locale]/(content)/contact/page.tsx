"use client";

import { useState, FormEvent } from "react";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MagneticButton } from "@/components/shared/MagneticButton";

const inputClasses =
  "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Message sent! We will get back to you shortly.");
  };

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <SplitText
          text="CONTACT"
          as="h1"
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Form */}
        <AnimatedSection>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest text-white/40 mb-2">NAME</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-white/40 mb-2">EMAIL</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-white/40 mb-2">SUBJECT</label>
              <select
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                className={`${inputClasses} appearance-none`}
              >
                <option value="General">General</option>
                <option value="Press">Press</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Collaboration">Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-white/40 mb-2">MESSAGE</label>
              <textarea
                placeholder="Your message..."
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                className="w-full bg-white text-black py-4 text-sm tracking-widest font-medium hover:bg-white/90 transition-colors"
              >
                SEND MESSAGE
              </button>
            </MagneticButton>
          </form>
        </AnimatedSection>

        {/* Info */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-10">
            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/40 mb-4">EMAIL</h2>
              <a
                href="mailto:hello@drxp.co"
                className="text-lg text-white/80 hover:text-white transition-colors"
              >
                hello@drxp.co
              </a>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/40 mb-4">PHONE</h2>
              <a
                href="tel:+74951234567"
                className="text-lg text-white/80 hover:text-white transition-colors"
              >
                +7 (495) 123-45-67
              </a>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/40 mb-4">ADDRESS</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                DRXP Studio
                <br />
                Bolshoy Savvinsky per., 12/6
                <br />
                Moscow, 119435
                <br />
                Russia
              </p>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/40 mb-4">SOCIAL</h2>
              <div className="flex gap-6">
                {["Instagram", "Telegram", "Twitter/X"].map((name) => (
                  <span
                    key={name}
                    className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
