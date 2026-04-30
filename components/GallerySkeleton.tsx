/** Placeholder grid shown while Supabase gallery data loads. */
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          {/* Frame with matting */}
          <div className="bg-white border border-border p-6">
            <div className="aspect-[4/3] bg-parchment" />
          </div>
          <div className="pt-4 space-y-2.5">
            <div className="h-5 bg-parchment w-3/4" />
            <div className="h-3.5 bg-parchment w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
