const BlockSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
      <div className="z-10">
        {/* Header skeleton */}
        <div className="flex flex-col items-start mb-4 md:flex-row md:justify-between md:items-center">
          {/* Title skeleton */}
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2 md:mb-0" />
          <div className="flex flex-row gap-2">
            {/* Toggle skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Detail skeleton (hidden on mobile) */}
            <div className="max-md:hidden">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Grid area skeleton */}
        <div className="mb-4 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
          {/* Grid background */}
          <div
            className="opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Block skeletons */}
          <div className="flex flex-wrap content-start gap-1 overflow-visible p-4">
            {Array.from({ length: 40 }).map((_, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-sm bg-gray-200 animate-pulse"
                style={{ animationDelay: `${(index % 10) * 50}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Legend skeleton */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center flex-wrap gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-sm mr-2 bg-gray-200 animate-pulse" />
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          {/* Mobile detail skeleton */}
          <div className="md:hidden">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSkeleton;

