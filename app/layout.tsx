import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "colorsbyshibani",
    template: "%s · colorsbyshibani",
  },
  description:
    "Original paintings, drawings, and sketches by Shibani — available for purchase.",
  openGraph: {
    title: "colorsbyshibani",
    description: "Original artwork by Shibani.",
    type: "website",
  },
};

// Root layout: fonts + global CSS only.
// Navbar/Footer live in app/(site)/layout.tsx so the /admin route gets its own shell.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${notoSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
