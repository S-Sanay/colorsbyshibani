"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/paintings", label: "Paintings" },
  { href: "/drawings",  label: "Drawings"  },
  { href: "/sketches",  label: "Sketches"  },
  { href: "/contact",   label: "Contact"   },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[90rem] px-8 lg:px-16 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-charcoal transition-opacity duration-300 hover:opacity-70"
        >
          colorsbyshibani
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-opacity duration-300 ${
                  pathname.startsWith(href)
                    ? "text-charcoal opacity-100"
                    : "text-muted hover:text-charcoal hover:opacity-100 opacity-100"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px w-5 bg-charcoal transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-charcoal transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-charcoal transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 border-t border-border" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-8 py-6 gap-5 bg-white">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-sans text-[12px] font-semibold tracking-[0.1em] uppercase ${
                  pathname.startsWith(href) ? "text-charcoal" : "text-muted"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
