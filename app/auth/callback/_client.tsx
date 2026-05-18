"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function Spinner() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-5 h-5 border border-charcoal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AuthCallbackClient() {
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

  return <Spinner />;
}
