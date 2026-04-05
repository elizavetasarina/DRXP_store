"use client";

import { useRef, useCallback, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  as = "button",
  href,
  onClick,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const inner =
    as === "a" && href ? (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    ) : (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {inner}
    </div>
  );
}
