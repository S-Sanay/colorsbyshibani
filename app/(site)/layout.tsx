import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Public-site layout: wraps all visitor-facing pages with the shared nav + footer.
// /admin is outside this group so it gets its own layout with no public chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
