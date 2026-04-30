import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { getFeaturedArtworks } from "@/lib/artworks";
import { getSiteContents } from "@/lib/api/site-content";

export default async function HomePage() {
  const [featured, c] = await Promise.all([
    getFeaturedArtworks(6),
    getSiteContents([
      "hero_subtitle",
      "bio_heading", "bio_paragraph_1", "bio_paragraph_2", "bio_image_url",
      "gallery_heading", "gallery_paragraph_1", "gallery_paragraph_2",
      "inquiry_heading", "inquiry_paragraph",
      "contact_email", "contact_instagram",
    ]),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[640px] flex-col items-center justify-center text-center px-8 bg-cream">
        <div className="relative z-10 flex flex-col items-center gap-8">
          <FadeIn>
            <h1 className="font-serif font-normal text-[clamp(3rem,8vw,6rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
              colorsbyshibani
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">
              {c["hero_subtitle"]}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button href="/paintings">Explore Paintings</Button>
              <Button href="/contact" variant="outline">Inquire</Button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted">Scroll</span>
          <span className="block h-10 w-px bg-border" />
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────────── */}
      <Section id="bio" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            {/* Art frame with matting around bio portrait */}
            <div className="bg-cream border border-border p-6">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={c["bio_image_url"]}
                  alt="Artist portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="flex flex-col gap-7">
              <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent">
                About the Artist
              </span>
              <h2 className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal">
                {c["bio_heading"]}
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
                {c["bio_paragraph_1"]}
              </p>
              <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
                {c["bio_paragraph_2"]}
              </p>
              <Button href="/paintings" variant="ghost" className="self-start">
                View all works →
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── About the Gallery ───────────────────────────────── */}
      <Section id="about" className="bg-cream">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-7">
            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent">
              About the Gallery
            </span>
            <h2 className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal">
              {c["gallery_heading"]}
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
              {c["gallery_paragraph_1"]}
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
              {c["gallery_paragraph_2"]}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          {/* Collection chips — text-only separated by pipes per spec */}
          <div className="flex items-center justify-center gap-0 mt-14">
            {[
              { href: "/paintings", label: "Paintings" },
              { href: "/drawings",  label: "Drawings"  },
              { href: "/sketches",  label: "Sketches"  },
            ].map(({ href, label }, i) => (
              <span key={href} className="flex items-center">
                <Link
                  href={href}
                  className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted px-5 transition-all duration-300 hover:text-charcoal"
                >
                  {label}
                </Link>
                {i < 2 && <span className="w-px h-4 bg-border" />}
              </span>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ── Featured Works ──────────────────────────────────── */}
      <Section id="featured" className="bg-white">
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent block mb-3">
                Selected Works
              </span>
              <h2 className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal">
                Recent pieces
              </h2>
            </div>
            <Link
              href="/paintings"
              className="hidden sm:block font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted transition-all duration-300 hover:text-charcoal"
            >
              All works →
            </Link>
          </div>
        </FadeIn>

        <GalleryGrid artworks={featured} />

        <div className="mt-20 text-center">
          <Button href="/paintings" variant="outline">
            Browse Full Gallery
          </Button>
        </div>
      </Section>

      {/* ── Inquiry ─────────────────────────────────────────── */}
      <Section id="inquiry" className="bg-cream">
        <FadeIn>
          <div className="max-w-lg mx-auto text-center flex flex-col gap-7">
            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent">
              Get in Touch
            </span>
            <h2 className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal">
              {c["inquiry_heading"]}
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
              {c["inquiry_paragraph"]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <a
                href={`mailto:${c["contact_email"]}`}
                className="inline-flex items-center justify-center px-8 py-3.5 border border-charcoal text-charcoal font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-charcoal hover:text-white"
              >
                Email
              </a>
              <a
                href={`https://instagram.com/${c["contact_instagram"]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal text-white font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-70"
              >
                Instagram
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
