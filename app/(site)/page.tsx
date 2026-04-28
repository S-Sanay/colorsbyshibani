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
      <section className="relative flex h-screen min-h-[600px] flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-parchment opacity-40" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <FadeIn>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-charcoal leading-none">
              colorsbyshibani
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="text-sm tracking-[0.3em] uppercase text-warm-gray font-sans">
              {c["hero_subtitle"]}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button href="/paintings">Explore Paintings</Button>
              <Button href="/contact" variant="outline">Inquire</Button>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
          <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
          <span className="block h-10 w-px bg-border" />
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────────── */}
      <Section id="bio" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] bg-parchment overflow-hidden">
              <Image
                src={c["bio_image_url"]}
                alt="Artist portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="flex flex-col gap-6">
              <span className="text-xs tracking-widest uppercase text-accent font-sans">
                About the Artist
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-snug">
                {c["bio_heading"]}
              </h2>
              <p className="text-warm-gray leading-relaxed">
                {c["bio_paragraph_1"]}
              </p>
              <p className="text-warm-gray leading-relaxed">
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
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
            <span className="text-xs tracking-widest uppercase text-accent font-sans">
              About the Gallery
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-charcoal leading-snug">
              {c["gallery_heading"]}
            </h2>
            <p className="text-warm-gray leading-relaxed">
              {c["gallery_paragraph_1"]}
            </p>
            <p className="text-warm-gray leading-relaxed">
              {c["gallery_paragraph_2"]}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {[
              { href: "/paintings", label: "Paintings" },
              { href: "/drawings",  label: "Drawings"  },
              { href: "/sketches",  label: "Sketches"  },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-6 py-2 border border-border text-xs tracking-widest uppercase text-warm-gray hover:border-charcoal hover:text-charcoal transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ── Featured Works ──────────────────────────────────── */}
      <Section id="featured" className="bg-white">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-widest uppercase text-accent font-sans block mb-2">
                Selected Works
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-charcoal">
                Recent pieces
              </h2>
            </div>
            <Link
              href="/paintings"
              className="hidden sm:block text-xs tracking-widest uppercase text-warm-gray hover:text-charcoal transition-colors duration-200"
            >
              All works →
            </Link>
          </div>
        </FadeIn>

        <GalleryGrid artworks={featured} />

        <div className="mt-14 text-center">
          <Button href="/paintings" variant="outline">
            Browse Full Gallery
          </Button>
        </div>
      </Section>

      {/* ── Inquiry ─────────────────────────────────────────── */}
      <Section id="inquiry" className="bg-parchment">
        <FadeIn>
          <div className="max-w-lg mx-auto text-center flex flex-col gap-6">
            <span className="text-xs tracking-widest uppercase text-accent font-sans">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-charcoal">
              {c["inquiry_heading"]}
            </h2>
            <p className="text-warm-gray leading-relaxed">
              {c["inquiry_paragraph"]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a
                href={`mailto:${c["contact_email"]}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                Email
              </a>
              <a
                href={`https://instagram.com/${c["contact_instagram"]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-charcoal text-cream text-xs tracking-widest uppercase hover:bg-accent transition-all duration-300"
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
