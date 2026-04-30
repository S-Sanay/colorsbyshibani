export default function ArtworkLoading() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-[90rem] px-8 lg:px-16 animate-pulse">
        {/* Breadcrumb */}
        <div className="mb-12 flex items-center gap-3">
          <div className="h-2.5 w-10 bg-parchment" />
          <div className="h-2.5 w-4 bg-parchment" />
          <div className="h-2.5 w-20 bg-parchment" />
          <div className="h-2.5 w-4 bg-parchment" />
          <div className="h-2.5 w-32 bg-parchment" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image frame placeholder */}
          <div className="bg-white border border-border p-6">
            <div className="aspect-[4/3] bg-parchment" />
          </div>

          {/* Details placeholder */}
          <div className="flex flex-col gap-8 pt-2">
            <div className="space-y-4">
              <div className="h-2.5 w-20 bg-parchment" />
              <div className="h-9 w-3/4 bg-parchment" />
            </div>
            <div className="border-y border-border py-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-14 bg-parchment" />
                <div className="h-14 bg-parchment" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 bg-parchment" />
              <div className="h-11 w-36 bg-parchment" />
            </div>
            <div className="space-y-2.5">
              <div className="h-2.5 w-28 bg-parchment" />
              <div className="h-4 w-full bg-parchment" />
              <div className="h-4 w-full bg-parchment" />
              <div className="h-4 w-2/3 bg-parchment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
