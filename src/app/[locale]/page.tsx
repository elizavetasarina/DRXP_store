import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { EditorialStrip } from "@/components/home/EditorialStrip";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ParallaxShowcase } from "@/components/home/ParallaxShowcase";
import { CollectionTeaser } from "@/components/home/CollectionTeaser";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <>
      <HeroSection />
      <MarqueeSection text={t("marquee1")} />
      <FeaturedCollection />
      <EditorialStrip />
      <MarqueeSection text={t("marquee2")} />
      <ParallaxShowcase />
      <CollectionTeaser />
    </>
  );
}
