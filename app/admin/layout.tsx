import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · colorsbyshibani",
  // Prevent search engines from indexing the admin panel
  robots: "noindex, nofollow",
};

// Admin layout is intentionally bare — the admin page renders its own shell.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
