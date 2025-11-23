const InsightSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10" />
      <div className="flex items-start relative z-10">
        <div className="flex-1">
          {/* Header skeleton */}
          <div className="flex flex-row gap-3 items-center mb-3">
            {/* BlockieFace skeleton */}
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            {/* Title skeleton */}
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                {/* Label skeleton */}
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                {/* Value skeleton */}
                <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightSkeleton;
