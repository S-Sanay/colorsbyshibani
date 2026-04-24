"use client";

import { useEffect, useState } from "react";
import { getSiteContent, updateSiteContent } from "@/lib/api/site-content";

interface BioEditorProps {
  showToast: (message: string, type: "success" | "error") => void;
}

export function BioEditor({ showToast }: BioEditorProps) {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteContent("bio")
      .then(setBio)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await updateSiteContent("bio", bio);
      showToast("Bio saved", "success");
    } catch {
      showToast("Failed to save bio", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="h-40 bg-parchment animate-pulse max-w-xl" />;
  }

  return (
    <div className="max-w-xl flex flex-col gap-5">
      <div>
        <label className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">
          Artist Bio
        </label>
        <textarea
          rows={8}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short bio about the artist…"
          className="w-full bg-transparent border border-border p-4 text-charcoal placeholder:text-muted text-sm outline-none focus:border-charcoal transition-colors resize-none leading-relaxed"
        />
        <p className="text-xs text-muted mt-1">{bio.length} characters</p>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="self-start bg-charcoal text-cream px-7 py-3 text-xs tracking-widest uppercase font-sans hover:bg-accent transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Bio"}
      </button>
    </div>
  );
}
