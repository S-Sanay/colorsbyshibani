"use client";

import Image from "next/image";
import { useRef, useState, DragEvent } from "react";

interface ImageUploadProps {
  currentUrl?: string;
  onFileSelect: (file: File) => void;
  uploading?: boolean;
}

export function ImageUpload({ currentUrl, onFileSelect, uploading = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    // Revoke any previous object URL to avoid memory leaks
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  const displayUrl = preview || currentUrl;

  return (
    <div>
      <label className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">
        Image
      </label>

      {/* Current / preview image */}
      {displayUrl && (
        <div className="relative aspect-[4/3] bg-parchment mb-3 overflow-hidden">
          <Image
            src={displayUrl}
            alt="Artwork preview"
            fill
            className="object-cover"
            sizes="600px"
            unoptimized={!!preview} // blob URLs bypass image optimization
          />
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border border-dashed py-8 text-center cursor-pointer transition-colors duration-200 ${
          dragging
            ? "border-accent bg-accent-light"
            : "border-border hover:border-warm-gray"
        }`}
      >
        {uploading ? (
          <p className="text-xs text-warm-gray">Uploading…</p>
        ) : (
          <>
            <p className="text-xs text-warm-gray">
              {displayUrl ? "Click or drag to replace image" : "Click or drag to upload image"}
            </p>
            <p className="text-xs text-muted mt-1">JPG, PNG, WebP</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // Reset input so re-selecting the same file still fires onChange
          e.target.value = "";
        }}
      />
    </div>
  );
}
