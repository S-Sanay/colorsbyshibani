"use client";

import { useEffect, useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { DbArtwork, getArtworks } from "@/lib/api/artworks";
import { LoginScreen } from "@/components/admin/LoginScreen";
import { ArtworkTable } from "@/components/admin/ArtworkTable";
import { ArtworkForm } from "@/components/admin/ArtworkForm";
import { SiteEditor } from "@/components/admin/SiteEditor";
import { Toast, ToastData } from "@/components/admin/Toast";

// Set NEXT_PUBLIC_ADMIN_EMAIL in .env.local — only this address gets in.
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

type View = "artworks" | "add" | "edit" | "site";

// ─── Spinner ────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-5 h-5 border border-charcoal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── Admin page ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [user,            setUser]            = useState<User | null>(null);
  const [authLoading,     setAuthLoading]     = useState(true);
  const [view,            setView]            = useState<View>("artworks");
  const [artworks,        setArtworks]        = useState<DbArtwork[]>([]);
  const [artworksLoading, setArtworksLoading] = useState(false);
  const [editingArtwork,  setEditingArtwork]  = useState<DbArtwork | null>(null);
  const [toast,           setToast]           = useState<ToastData | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => setToast({ message, type }),
    []
  );

  // ── Auth state ────────────────────────────────────────────────────────────
  useEffect(() => {
    // Resolve the initial session (handles magic-link redirects automatically)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Keep in sync with sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Load artworks once authenticated ─────────────────────────────────────
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    setArtworksLoading(true);
    getArtworks()
      .then(setArtworks)
      .catch(() => showToast("Failed to load artworks", "error"))
      .finally(() => setArtworksLoading(false));
  }, [user, showToast]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleEdit(artwork: DbArtwork) {
    setEditingArtwork(artwork);
    setView("edit");
  }

  function handleDeleteLocal(id: string) {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSave(saved: DbArtwork) {
    setArtworks((prev) =>
      editingArtwork
        ? prev.map((a) => (a.id === saved.id ? saved : a))
        : [saved, ...prev]
    );
    setView("artworks");
    setEditingArtwork(null);
  }

  function navigate(v: View) {
    setView(v);
    setEditingArtwork(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    navigate("artworks");
  }

  // ── Gate: loading ─────────────────────────────────────────────────────────
  if (authLoading) return <Spinner />;

  // ── Gate: not signed in ───────────────────────────────────────────────────
  if (!user) return <LoginScreen />;

  // ── Gate: wrong email ─────────────────────────────────────────────────────
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif font-normal text-[28px] leading-[1.2] text-charcoal mb-3">Access denied.</p>
          <p className="font-sans text-[16px] leading-[1.6] text-warm-gray mb-8">
            This account is not authorised for admin access.
          </p>
          <button
            onClick={handleLogout}
            className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted transition-opacity duration-300 hover:text-charcoal"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {/* Header */}
      <header className="border-b border-border bg-white flex-shrink-0">
        <div className="flex items-center justify-between px-8 py-4">
          <span className="font-serif font-normal text-charcoal">
            colorsbyshibani{" "}
            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">/ admin</span>
          </span>
          <button
            onClick={handleLogout}
            className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted transition-opacity duration-300 hover:text-charcoal hover:opacity-100"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — hidden on mobile */}
        <aside className="hidden sm:flex flex-col w-48 border-r border-border bg-white flex-shrink-0">
          <nav className="p-4 pt-6 flex flex-col gap-0.5">
            {(
              [
                { v: "artworks", label: "Artworks" },
                { v: "add",      label: "+ Add New" },
              ] as const
            ).map(({ v, label }) => (
              <button
                key={v}
                onClick={() => navigate(v)}
                className={`text-left px-3 py-2 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-opacity duration-300 ${
                  view === v
                    ? "text-charcoal bg-cream"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                {label}
              </button>
            ))}

            <div className="my-3 border-t border-border" />

            <button
              onClick={() => navigate("site")}
              className={`text-left px-3 py-2 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-opacity duration-300 ${
                view === "site"
                  ? "text-charcoal bg-cream"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              Site Content
            </button>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">

          {/* Mobile nav pills */}
          <div className="flex gap-5 mb-8 sm:hidden">
            {(["artworks", "add", "site"] as const).map((v) => (
              <button
                key={v}
                onClick={() => navigate(v)}
                className={`font-sans text-[11px] font-semibold tracking-[0.1em] uppercase pb-1 border-b transition-all duration-300 ${
                  view === v
                    ? "border-charcoal text-charcoal"
                    : "border-transparent text-muted hover:text-charcoal"
                }`}
              >
                {v === "add" ? "+ Add" : v === "site" ? "Site" : v}
              </button>
            ))}
          </div>

          {/* ── View: Artwork list ──────────────────────────────── */}
          {view === "artworks" && (
            <>
              <div className="flex items-baseline justify-between mb-8">
                <h1 className="font-serif font-normal text-[28px] leading-[1.2] text-charcoal">All Artworks</h1>
                <span className="font-sans text-[12px] tracking-[0.05em] text-muted">{artworks.length} works</span>
              </div>

              {artworksLoading ? (
                // Loading skeletons
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-parchment animate-pulse" />
                  ))}
                </div>
              ) : (
                <ArtworkTable
                  artworks={artworks}
                  onEdit={handleEdit}
                  onDelete={handleDeleteLocal}
                  showToast={showToast}
                />
              )}
            </>
          )}

          {/* ── View: Add artwork ───────────────────────────────── */}
          {view === "add" && (
            <>
              <h1 className="font-serif font-normal text-[28px] leading-[1.2] text-charcoal mb-8">Add Artwork</h1>
              <ArtworkForm
                onSave={handleSave}
                onCancel={() => navigate("artworks")}
                showToast={showToast}
              />
            </>
          )}

          {/* ── View: Edit artwork ──────────────────────────────── */}
          {view === "edit" && editingArtwork && (
            <>
              <h1 className="font-serif font-normal text-[28px] leading-[1.2] text-charcoal mb-8">Edit Artwork</h1>
              <ArtworkForm
                artwork={editingArtwork}
                onSave={handleSave}
                onCancel={() => navigate("artworks")}
                showToast={showToast}
              />
            </>
          )}

          {/* ── View: Site content ─────────────────────────────── */}
          {view === "site" && (
            <>
              <h1 className="font-serif font-normal text-[28px] leading-[1.2] text-charcoal mb-8">Site Content</h1>
              <SiteEditor showToast={showToast} />
            </>
          )}
        </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast {...toast} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}
