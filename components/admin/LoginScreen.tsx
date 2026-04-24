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
        <p className="text-xs tracking-widest uppercase text-muted font-sans mb-2">
          colorsbyshibani
        </p>
        <h1 className="font-serif text-3xl text-charcoal mb-10">Admin</h1>

        {sent ? (
          <div>
            <p className="font-serif text-xl text-charcoal mb-3">Check your email.</p>
            <p className="text-sm text-warm-gray leading-relaxed">
              A magic link has been sent to <strong>{email}</strong>. Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-border py-3 text-charcoal placeholder:text-muted text-sm outline-none focus:border-charcoal transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-charcoal text-cream px-6 py-3 text-xs tracking-widest uppercase font-sans hover:bg-accent transition-colors disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
