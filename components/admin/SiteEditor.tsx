"use client";

import { useEffect, useState } from "react";
import {
  getSiteContents,
  updateSiteContents,
  CONTENT_DEFAULTS,
} from "@/lib/api/site-content";
import { uploadSiteImage } from "@/lib/api/storage";
import { ImageUpload } from "./ImageUpload";

type Tab = "bio" | "home" | "galleries" | "contact";

interface Props {
  showToast: (message: string, type: "success" | "error") => void;
}

export function SiteEditor({ showToast }: Props) {
  const [tab, setTab]         = useState<Tab>("bio");
  const [content, setContent] = useState<Record<string, string>>(CONTENT_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [bioImageFile, setBioImageFile] = useState<File | null>(null);

  useEffect(() => {
    getSiteContents(Object.keys(CONTENT_DEFAULTS))
      .then((data) => setContent((prev) => ({ ...prev, ...data })))
      .finally(() => setLoading(false));
  }, []);

  function set(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function saveKeys(keys: string[]) {
    setSaving(true);
    try {
      const entries: Record<string, string> = {};
      for (const key of keys) entries[key] = content[key] ?? "";
      await updateSiteContents(entries);
      showToast("Saved", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  }

  async function saveBio() {
    setSaving(true);
    try {
      let imageUrl = content["bio_image_url"];
      if (bioImageFile) {
        imageUrl = await uploadSiteImage(bioImageFile);
        setBioImageFile(null);
        setContent((prev) => ({ ...prev, bio_image_url: imageUrl }));
      }
      await updateSiteContents({
        bio_heading:     content["bio_heading"],
        bio_paragraph_1: content["bio_paragraph_1"],
        bio_paragraph_2: content["bio_paragraph_2"],
        bio_image_url:   imageUrl,
      });
      showToast("Bio saved", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 max-w-xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-parchment animate-pulse" />
        ))}
      </div>
    );
  }

  const lbl =
    "text-xs tracking-widest uppercase text-muted font-sans block mb-2";
  const inp =
    "w-full bg-transparent border-b border-border py-3 text-charcoal placeholder:text-muted text-sm outline-none focus:border-charcoal transition-colors duration-200";
  const ta = `${inp} resize-none`;

  const tabs: { id: Tab; label: string }[] = [
    { id: "bio",       label: "Bio"       },
    { id: "home",      label: "Home"      },
    { id: "galleries", label: "Galleries" },
    { id: "contact",   label: "Contact"   },
  ];

  return (
    <div className="max-w-xl">
      {/* Tab strip */}
      <div className="flex border-b border-border mb-8 -mt-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 text-xs tracking-widest uppercase font-sans border-b-2 -mb-px transition-colors ${
              tab === id
                ? "border-charcoal text-charcoal"
                : "border-transparent text-muted hover:text-warm-gray"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Bio ──────────────────────────────────────────────── */}
      {tab === "bio" && (
        <div className="flex flex-col gap-6">
          <ImageUpload
            currentUrl={content["bio_image_url"]}
            onFileSelect={setBioImageFile}
          />
          <div>
            <label className={lbl}>Section Heading</label>
            <input
              type="text"
              value={content["bio_heading"]}
              onChange={(e) => set("bio_heading", e.target.value)}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Paragraph 1</label>
            <textarea
              rows={4}
              value={content["bio_paragraph_1"]}
              onChange={(e) => set("bio_paragraph_1", e.target.value)}
              className={ta}
            />
          </div>
          <div>
            <label className={lbl}>Paragraph 2</label>
            <textarea
              rows={4}
              value={content["bio_paragraph_2"]}
              onChange={(e) => set("bio_paragraph_2", e.target.value)}
              className={ta}
            />
          </div>
          <SaveBtn saving={saving} onClick={saveBio} />
        </div>
      )}

      {/* ── Home ─────────────────────────────────────────────── */}
      {tab === "home" && (
        <div className="flex flex-col gap-6">
          <div>
            <label className={lbl}>Hero Subtitle</label>
            <input
              type="text"
              value={content["hero_subtitle"]}
              onChange={(e) => set("hero_subtitle", e.target.value)}
              className={inp}
            />
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs tracking-widest uppercase text-warm-gray font-sans mb-5">
              About the Gallery Section
            </p>
            <div className="flex flex-col gap-6">
              <div>
                <label className={lbl}>Heading</label>
                <input
                  type="text"
                  value={content["gallery_heading"]}
                  onChange={(e) => set("gallery_heading", e.target.value)}
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl}>Paragraph 1</label>
                <textarea
                  rows={3}
                  value={content["gallery_paragraph_1"]}
                  onChange={(e) => set("gallery_paragraph_1", e.target.value)}
                  className={ta}
                />
              </div>
              <div>
                <label className={lbl}>Paragraph 2</label>
                <textarea
                  rows={3}
                  value={content["gallery_paragraph_2"]}
                  onChange={(e) => set("gallery_paragraph_2", e.target.value)}
                  className={ta}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs tracking-widest uppercase text-warm-gray font-sans mb-5">
              Inquiry / CTA Section
            </p>
            <div className="flex flex-col gap-6">
              <div>
                <label className={lbl}>Heading</label>
                <input
                  type="text"
                  value={content["inquiry_heading"]}
                  onChange={(e) => set("inquiry_heading", e.target.value)}
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl}>Paragraph</label>
                <textarea
                  rows={3}
                  value={content["inquiry_paragraph"]}
                  onChange={(e) => set("inquiry_paragraph", e.target.value)}
                  className={ta}
                />
              </div>
            </div>
          </div>

          <SaveBtn
            saving={saving}
            onClick={() =>
              saveKeys([
                "hero_subtitle",
                "gallery_heading",
                "gallery_paragraph_1",
                "gallery_paragraph_2",
                "inquiry_heading",
                "inquiry_paragraph",
              ])
            }
          />
        </div>
      )}

      {/* ── Galleries ────────────────────────────────────────── */}
      {tab === "galleries" && (
        <div className="flex flex-col gap-6">
          <div>
            <label className={lbl}>Paintings — Description</label>
            <textarea
              rows={3}
              value={content["paintings_description"]}
              onChange={(e) => set("paintings_description", e.target.value)}
              className={ta}
            />
          </div>
          <div>
            <label className={lbl}>Drawings — Description</label>
            <textarea
              rows={3}
              value={content["drawings_description"]}
              onChange={(e) => set("drawings_description", e.target.value)}
              className={ta}
            />
          </div>
          <div>
            <label className={lbl}>Sketches — Description</label>
            <textarea
              rows={3}
              value={content["sketches_description"]}
              onChange={(e) => set("sketches_description", e.target.value)}
              className={ta}
            />
          </div>
          <SaveBtn
            saving={saving}
            onClick={() =>
              saveKeys([
                "paintings_description",
                "drawings_description",
                "sketches_description",
              ])
            }
          />
        </div>
      )}

      {/* ── Contact ──────────────────────────────────────────── */}
      {tab === "contact" && (
        <div className="flex flex-col gap-6">
          <div>
            <label className={lbl}>Page Heading</label>
            <input
              type="text"
              value={content["contact_heading"]}
              onChange={(e) => set("contact_heading", e.target.value)}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Page Paragraph</label>
            <textarea
              rows={3}
              value={content["contact_paragraph"]}
              onChange={(e) => set("contact_paragraph", e.target.value)}
              className={ta}
            />
          </div>
          <div>
            <label className={lbl}>Email Address</label>
            <input
              type="email"
              value={content["contact_email"]}
              onChange={(e) => set("contact_email", e.target.value)}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Instagram Handle (without @)</label>
            <input
              type="text"
              value={content["contact_instagram"]}
              onChange={(e) => set("contact_instagram", e.target.value)}
              className={inp}
            />
          </div>
          <SaveBtn
            saving={saving}
            onClick={() =>
              saveKeys([
                "contact_heading",
                "contact_paragraph",
                "contact_email",
                "contact_instagram",
              ])
            }
          />
        </div>
      )}
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="self-start bg-charcoal text-cream px-7 py-3 text-xs tracking-widest uppercase font-sans hover:bg-accent transition-colors disabled:opacity-50"
    >
      {saving ? "Saving…" : "Save"}
    </button>
  );
}
