"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Supabase redirects here after the user clicks the magic link.
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mb-3">
          colorsbyshibani
        </p>
        <h1 className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal mb-12">Admin</h1>

        {sent ? (
          <div>
            <p className="font-serif font-normal text-[24px] leading-[1.2] text-charcoal mb-3">Check your email.</p>
            <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
              A magic link has been sent to <strong>{email}</strong>. Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <label className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-border py-3.5 text-charcoal placeholder:text-muted font-sans text-[16px] outline-none focus:border-charcoal transition-colors duration-300"
              />
            </div>

            {error && (
              <p className="font-sans text-[13px] text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-charcoal text-white px-8 py-3.5 font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-opacity duration-300 hover:opacity-70 disabled:opacity-40"
            >
              {loading ? "Sending…" : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
