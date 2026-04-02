"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      {/* Background noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <SplitText
          text="DRXP"
          as="h1"
          className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tight text-white leading-none"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm tracking-[0.4em] text-white/50 uppercase"
        >
          Contemporary Streetwear
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <MagneticButton
            as="a"
            href="/shop"
            className="inline-block border border-white/20 px-10 py-4 text-sm tracking-[0.2em] uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Explore Collection
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase rotate-90 origin-center translate-y-[-1rem]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-white/30"
          >
            <path
              d="M8 4L8 20M8 20L2 14M8 20L14 14"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
