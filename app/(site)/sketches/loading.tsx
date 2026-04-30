import { Section } from "@/components/Section";
import { GallerySkeleton } from "@/components/GallerySkeleton";

export default function SketchesLoading() {
  return (
    <Section className="pt-36">
      <div className="mb-20 border-b border-border pb-10">
        <div className="h-3 w-20 bg-parchment animate-pulse mb-4" />
        <div className="h-12 w-40 bg-parchment animate-pulse" />
      </div>
      <GallerySkeleton count={6} />
    </Section>
  );
}
