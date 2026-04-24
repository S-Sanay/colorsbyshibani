"use client";

import { useState } from "react";
import {
  DbArtwork,
  ArtworkInput,
  createArtwork,
  updateArtwork,
} from "@/lib/api/artworks";
import { uploadImage } from "@/lib/api/storage";
import { ImageUpload } from "./ImageUpload";

interface ArtworkFormProps {
  artwork?: DbArtwork; // present → edit mode, absent → create mode
  onSave: (artwork: DbArtwork) => void;
  onCancel: () => void;
  showToast: (message: string, type: "success" | "error") => void;
}

export function ArtworkForm({ artwork, onSave, onCancel, showToast }: ArtworkFormProps) {
  const [form, setForm] = useState({
    title:       artwork?.title       ?? "",
    category:    artwork?.category    ?? ("painting" as const),
    description: artwork?.description ?? "",
    inspiration: artwork?.inspiration ?? "",
    price:       artwork?.price?.toString() ?? "",
    available:   artwork?.available   ?? true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving,    setSaving]    = useState(false);

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!artwork && !imageFile) {
      showToast("Please upload an image", "error");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = artwork?.image_url ?? "";

      // Upload new image if one was selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const input: ArtworkInput = {
        title:       form.title,
        category:    form.category as ArtworkInput["category"],
        image_url:   imageUrl,
        description: form.description,
        inspiration: form.inspiration,
        price:       parseFloat(form.price) || 0,
        // price is stored in whole dollars here.
        // TODO (Stripe): multiply by 100 when creating a PaymentIntent or
        // Checkout Session — Stripe expects amounts in the smallest currency unit.
        available:   form.available,
      };

      const saved = artwork
        ? await updateArtwork(artwork.id, input)
        : await createArtwork(input);

      showToast(artwork ? "Artwork updated" : "Artwork created", "success");
      onSave(saved);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong — check the console", "error");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  const label = "text-xs tracking-widest uppercase text-muted font-sans block mb-2";
  const input =
    "w-full bg-transparent border-b border-border py-3 text-charcoal placeholder:text-muted text-sm outline-none focus:border-charcoal transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-xl">
      {/* Title */}
      <div>
        <label className={label}>Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Artwork title"
          className={input}
        />
      </div>

      {/* Category */}
      <div>
        <label className={label}>Category</label>
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          className={`${input} cursor-pointer`}
        >
          <option value="painting">Painting</option>
          <option value="drawing">Drawing</option>
          <option value="sketch">Sketch</option>
        </select>
      </div>

      {/* Image upload — drag & drop or click */}
      <ImageUpload
        currentUrl={artwork?.image_url}
        onFileSelect={setImageFile}
        uploading={uploading}
      />

      {/* Description */}
      <div>
        <label className={label}>Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe this artwork…"
          className={`${input} resize-none`}
        />
      </div>

      {/* Inspiration / Artist's note */}
      <div>
        <label className={label}>Artist's Note / Inspiration</label>
        <textarea
          rows={3}
          value={form.inspiration}
          onChange={(e) => set("inspiration", e.target.value)}
          placeholder="What inspired this piece?"
          className={`${input} resize-none`}
        />
      </div>

      {/* Price */}
      <div>
        <label className={label}>Price (USD)</label>
        <input
          type="number"
          required
          min="0"
          step="1"
          value={form.price}
          onChange={(e) => set("price", e.target.value)}
          placeholder="650"
          className={input}
        />
      </div>

      {/* Available toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => set("available", !form.available)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
            form.available ? "bg-charcoal" : "bg-border"
          }`}
          aria-label="Toggle availability"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
              form.available ? "translate-x-5" : ""
            }`}
          />
        </button>
        <span className="text-xs tracking-widest uppercase text-muted font-sans">
          {form.available ? "Available for purchase" : "Not available / Sold"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-2 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="bg-charcoal text-cream px-7 py-3 text-xs tracking-widest uppercase font-sans hover:bg-accent transition-colors disabled:opacity-50"
        >
          {saving
            ? uploading
              ? "Uploading…"
              : "Saving…"
            : artwork
            ? "Update Artwork"
            : "Create Artwork"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border text-warm-gray px-7 py-3 text-xs tracking-widest uppercase font-sans hover:border-charcoal hover:text-charcoal transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
