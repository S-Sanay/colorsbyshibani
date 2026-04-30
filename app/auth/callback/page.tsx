"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Landing page for PKCE magic-link redirects.
// Supabase sends ?code=<one-time-code> here. We exchange it for a real
// session, then send the user to /admin. The exchange only works in the
// browser that originally requested the magic link (it holds the PKCE
// code_verifier in localStorage), so iCloud Mail's link-scanner can't
// consume the token before the real user clicks.
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/admin");
      return;
    }

    supabase.auth
      .exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) console.error("Auth callback error:", error.message);
      })
      .finally(() => {
        router.replace("/admin");
      });
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-5 h-5 border border-charcoal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
