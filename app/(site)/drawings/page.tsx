import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";
import { getSiteContent } from "@/lib/api/site-content";

export const metadata: Metadata = {
  title: "Drawings",
  description: "Charcoal and graphite drawings by Shibani.",
};

export default async function DrawingsPage() {
  const [drawings, description] = await Promise.all([
    getArtworks("drawing"),
    getSiteContent("drawings_description"),
  ]);

  return (
    <Section className="pt-36">
      <FadeIn>
        <div className="mb-20 border-b border-border pb-10">
          <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent block mb-4">
            Collection
          </span>
          <h1 className="font-serif font-normal text-[48px] leading-[1.1] tracking-[-0.02em] text-charcoal">
            Drawings
          </h1>
          <p className="mt-5 font-sans text-[16px] leading-[1.6] text-warm-gray max-w-lg">{description}</p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={drawings} />
    </Section>
  );
}
