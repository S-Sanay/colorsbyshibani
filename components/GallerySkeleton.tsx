/** Placeholder grid shown while Supabase gallery data loads. */
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-parchment" />
          <div className="pt-4 space-y-2">
            <div className="h-4 bg-parchment rounded w-3/4" />
            <div className="h-3 bg-parchment rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
