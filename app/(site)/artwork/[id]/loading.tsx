export default function ArtworkLoading() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 animate-pulse">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2">
          <div className="h-3 w-10 bg-parchment rounded" />
          <div className="h-3 w-3 bg-parchment rounded" />
          <div className="h-3 w-20 bg-parchment rounded" />
          <div className="h-3 w-3 bg-parchment rounded" />
          <div className="h-3 w-32 bg-parchment rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image placeholder */}
          <div className="aspect-[4/3] bg-parchment" />

          {/* Details placeholder */}
          <div className="flex flex-col gap-6 pt-2">
            <div className="space-y-3">
              <div className="h-3 w-24 bg-parchment rounded" />
              <div className="h-8 w-3/4 bg-parchment rounded" />
            </div>
            <div className="border-y border-border py-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-parchment rounded" />
                <div className="h-12 bg-parchment rounded" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 w-24 bg-parchment rounded" />
              <div className="h-10 w-36 bg-parchment rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-parchment rounded" />
              <div className="h-4 w-full bg-parchment rounded" />
              <div className="h-4 w-full bg-parchment rounded" />
              <div className="h-4 w-2/3 bg-parchment rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
