import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { getFeaturedArtworks } from "@/lib/artworks";

export default async function HomePage() {
  const featured = await getFeaturedArtworks(6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[600px] flex-col items-center justify-center text-center px-6">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-parchment opacity-40" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <FadeIn>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-charcoal leading-none">
              colorsbyshibani
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="text-sm tracking-[0.3em] uppercase text-warm-gray font-sans">
              Original artwork · Available to collect
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button href="/paintings">Explore Paintings</Button>
              <Button href="/contact" variant="outline">Inquire</Button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
          <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
          <span className="block h-10 w-px bg-border" />
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────────── */}
      <Section id="bio" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Artist portrait placeholder */}
          <FadeIn>
            <div className="relative aspect-[3/4] bg-parchment overflow-hidden">
              <Image
                src="https://picsum.photos/seed/shibani-bio/600/800"
                alt="Artist portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Bio text */}
          <FadeIn delay={150}>
            <div className="flex flex-col gap-6">
              <span className="text-xs tracking-widest uppercase text-accent font-sans">
                About the Artist
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-snug">
                Made with intention, offered with care.
              </h2>
              <p className="text-warm-gray leading-relaxed">
                Shibani is a self-taught artist whose work explores the intersection of
                color, emotion, and everyday moments. Each piece begins with observation—
                a quality of light, a gesture, a feeling—and ends as something that can
                live in a home and be looked at for years.
              </p>
              <p className="text-warm-gray leading-relaxed">
                Working across oil painting, detailed drawings, and expressive sketches,
                she finds different truths in each medium. Her studio practice is slow
                and deliberate: she would rather finish one honest piece than ten
                impressive ones.
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
              A space for work that lasts.
            </h2>
            <p className="text-warm-gray leading-relaxed">
              Every work here is one-of-a-kind, signed by the artist, and shipped with
              care. This gallery exists because art deserves to be lived with, not just
              admired from a distance. Whether you are drawn to a painting for its color,
              a drawing for its precision, or a sketch for its spontaneity—there is
              something here for you.
            </p>
            <p className="text-warm-gray leading-relaxed">
              All pieces are available for purchase. For commissions, custom work, or
              questions about a specific piece, please reach out directly.
            </p>
          </div>
        </FadeIn>

        {/* Category navigation pills */}
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
              Interested in a piece?
            </h2>
            <p className="text-warm-gray leading-relaxed">
              For purchase inquiries, commissions, or just to say hello—reach out via
              email or Instagram. Every message is read and responded to personally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a
                href="mailto:art@colorsbyshibani.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                Email
              </a>
              <a
                href="https://instagram.com/colorsbyshibani"
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
