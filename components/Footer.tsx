import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-base text-charcoal hover:text-accent transition-colors duration-200"
        >
          colorsbyshibani
        </Link>

        <nav className="flex items-center gap-6">
          {[
            { href: "/paintings", label: "Paintings" },
            { href: "/drawings",  label: "Drawings"  },
            { href: "/sketches",  label: "Sketches"  },
            { href: "/contact",   label: "Contact"   },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs tracking-widest uppercase text-warm-gray hover:text-charcoal transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-muted">© {year} colorsbyshibani</p>
      </div>
    </footer>
  );
}
