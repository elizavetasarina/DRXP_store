"use client";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  separator?: string;
}

export function MarqueeText({
  text,
  speed = 30,
  className = "",
  separator = "  \u2605  ",
}: Props) {
  const content = `${text}${separator}`;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-block">
            {content}
          </span>
        ))}
      </div>
      <div
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-block">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
