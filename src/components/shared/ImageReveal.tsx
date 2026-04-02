"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

const clipPaths: Record<string, { hidden: string; visible: string }> = {
  left: {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0% 0 0)",
  },
  right: {
    hidden: "inset(0 0 0 100%)",
    visible: "inset(0 0 0 0%)",
  },
  up: {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0% 0 0 0)",
  },
  down: {
    hidden: "inset(0 0 100% 0)",
    visible: "inset(0 0 0% 0)",
  },
};

export function ImageReveal({ src, alt, className = "", direction = "left" }: Props) {
  const clip = clipPaths[direction];

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: clip.hidden }}
      whileInView={{ clipPath: clip.visible }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  );
}
