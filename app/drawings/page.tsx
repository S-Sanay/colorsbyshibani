import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Drawings",
  description: "Charcoal and graphite drawings by Shibani.",
};

export default async function DrawingsPage() {
  const drawings = await getArtworks("drawing");

  return (
    <Section className="pt-32">
      <FadeIn>
        <div className="mb-14">
          <span className="text-xs tracking-widest uppercase text-accent font-sans block mb-3">
            Collection
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal">Drawings</h1>
          <p className="mt-4 text-warm-gray max-w-lg leading-relaxed">
            Charcoal portraits, graphite studies, and detailed observational drawings.
            Each work is rendered on archival-quality paper.
          </p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={drawings} />
    </Section>
  );
}
