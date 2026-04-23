import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Sketches",
  description: "Ink and pencil sketches by Shibani — loose, gestural, immediate.",
};

export default async function SketchesPage() {
  const sketches = await getArtworks("sketch");

  return (
    <Section className="pt-32">
      <FadeIn>
        <div className="mb-14">
          <span className="text-xs tracking-widest uppercase text-accent font-sans block mb-3">
            Collection
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal">Sketches</h1>
          <p className="mt-4 text-warm-gray max-w-lg leading-relaxed">
            Loose ink and pencil sketches — capturing gesture, light, and moment.
            Works on paper, often done in a single sitting.
          </p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={sketches} />
    </Section>
  );
}
