"use client";

import Image from "next/image";
import { useState } from "react";
import { DbArtwork, deleteArtwork } from "@/lib/api/artworks";

interface ArtworkTableProps {
  artworks: DbArtwork[];
  onEdit: (artwork: DbArtwork) => void;
  onDelete: (id: string) => void;
  showToast: (message: string, type: "success" | "error") => void;
}

export function ArtworkTable({ artworks, onEdit, onDelete, showToast }: ArtworkTableProps) {
  const [confirmId,  setConfirmId]  = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteArtwork(id);
      // Optionally also call deleteImage(artwork.image_url) here to purge storage
      onDelete(id);
      showToast("Artwork deleted", "success");
    } catch {
      showToast("Failed to delete — try again", "error");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-24 text-warm-gray border border-dashed border-border">
        <p className="font-serif text-2xl mb-2">No artworks yet.</p>
        <p className="text-sm">Use "Add Artwork" to create your first entry.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="flex items-center gap-4 p-4 bg-white border border-border hover:border-warm-gray transition-colors duration-150"
        >
          {/* Thumbnail */}
          <div className="relative w-16 h-12 flex-shrink-0 bg-parchment overflow-hidden">
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-serif text-charcoal truncate">{artwork.title}</p>
            <p className="text-xs text-warm-gray font-sans capitalize mt-0.5">
              {artwork.category} · ${artwork.price}
            </p>
          </div>

          {/* Availability badge */}
          <span
            className={`hidden sm:inline-block text-xs px-2 py-1 font-sans tracking-widest uppercase flex-shrink-0 ${
              artwork.available
                ? "bg-green-50 text-green-700"
                : "bg-stone-100 text-muted"
            }`}
          >
            {artwork.available ? "Available" : "Sold"}
          </span>

          {/* Actions — inline delete confirmation */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {confirmId === artwork.id ? (
              <>
                <span className="text-xs text-warm-gray hidden sm:block">Delete?</span>
                <button
                  onClick={() => handleDelete(artwork.id)}
                  disabled={deletingId === artwork.id}
                  className="text-xs px-3 py-1.5 bg-red-600 text-white font-sans hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingId === artwork.id ? "…" : "Yes"}
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="text-xs px-3 py-1.5 border border-border text-warm-gray font-sans hover:text-charcoal transition-colors"
                >
                  No
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onEdit(artwork)}
                  className="text-xs px-3 py-1.5 border border-border text-warm-gray font-sans hover:border-charcoal hover:text-charcoal transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmId(artwork.id)}
                  className="text-xs px-3 py-1.5 border border-border text-warm-gray font-sans hover:border-red-400 hover:text-red-500 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
