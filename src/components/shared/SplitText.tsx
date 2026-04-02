"use client";

import { motion } from "framer-motion";
import { ElementType, useMemo } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({ text, className = "", delay = 0, as: Tag = "p" }: Props) {
  const characters = useMemo(() => text.split(""), [text]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.03,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label={text}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={child}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
