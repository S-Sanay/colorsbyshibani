import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto bg-white">
      <div className="mx-auto max-w-[90rem] px-8 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-base text-charcoal transition-opacity duration-300 hover:opacity-70"
        >
          colorsbyshibani
        </Link>

        <nav className="flex items-center gap-8">
          {[
            { href: "/paintings", label: "Paintings" },
            { href: "/drawings",  label: "Drawings"  },
            { href: "/sketches",  label: "Sketches"  },
            { href: "/contact",   label: "Contact"   },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted transition-opacity duration-300 hover:text-charcoal hover:opacity-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="font-sans text-[12px] tracking-[0.05em] text-muted">© {year} colorsbyshibani</p>
      </div>
    </footer>
  );
}
