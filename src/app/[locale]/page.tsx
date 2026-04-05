import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { EditorialStrip } from "@/components/home/EditorialStrip";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ParallaxShowcase } from "@/components/home/ParallaxShowcase";
import { CollectionTeaser } from "@/components/home/CollectionTeaser";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection text="NEW COLLECTION SS25 — AVAILABLE NOW — FREE SHIPPING OVER 10 000 ₽" />
      <FeaturedCollection />
      <EditorialStrip />
      <MarqueeSection text="DRXP — CONTEMPORARY STREETWEAR — SINCE 2024 — MOSCOW" />
      <ParallaxShowcase />
      <CollectionTeaser />
    </>
  );
}
