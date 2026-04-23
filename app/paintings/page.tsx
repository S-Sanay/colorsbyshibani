import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Paintings",
  description: "Original oil and acrylic paintings by Shibani — available to collect.",
};

export default async function PaintingsPage() {
  const paintings = await getArtworks("painting");

  return (
    <Section className="pt-32">
      <FadeIn>
        <div className="mb-14">
          <span className="text-xs tracking-widest uppercase text-accent font-sans block mb-3">
            Collection
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal">Paintings</h1>
          <p className="mt-4 text-warm-gray max-w-lg leading-relaxed">
            Original oil and mixed-media paintings. Each canvas is one-of-a-kind,
            signed, and ready to hang.
          </p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={paintings} />
    </Section>
  );
}
