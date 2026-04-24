"use client";

import { useEffect } from "react";

export interface ToastData {
  message: string;
  type: "success" | "error";
}

interface ToastProps extends ToastData {
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 text-sm font-sans shadow-lg ${
        type === "success" ? "bg-charcoal text-cream" : "bg-red-600 text-white"
      }`}
    >
      <span className="text-base">{type === "success" ? "✓" : "✕"}</span>
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-3 opacity-50 hover:opacity-100 transition-opacity text-xs"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
