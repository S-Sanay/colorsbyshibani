import { Section } from "@/components/Section";
import { GallerySkeleton } from "@/components/GallerySkeleton";

export default function DrawingsLoading() {
  return (
    <Section className="pt-32">
      <div className="mb-14">
        <div className="h-3 w-20 bg-parchment rounded animate-pulse mb-3" />
        <div className="h-10 w-40 bg-parchment rounded animate-pulse" />
      </div>
      <GallerySkeleton count={6} />
    </Section>
  );
}
