import { MarqueeText } from "@/components/shared/MarqueeText";

interface Props {
  text: string;
}

export function MarqueeSection({ text }: Props) {
  return (
    <section className="py-8 border-y border-white/10">
      <MarqueeText
        text={text}
        className="text-xl md:text-2xl font-light tracking-widest text-white/30 uppercase"
      />
    </section>
  );
}
