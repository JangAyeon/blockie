const StreakSkeleton = () => {
  return (
    <div>
      <div className="flex items-center relative z-10">
        {/* Icon and level badge skeleton (hidden on mobile) */}
        <div className="relative mr-4 max-sm:hidden">
          <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {/* Main text skeleton */}
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-4 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Progress section skeleton */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Progress bar skeleton */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="w-1/3 h-2 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Motivation message skeleton */}
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Bottom section skeleton */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex sm:items-center justify-between max-sm:flex-col max-sm:items-start gap-3">
          <div className="w-40 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-row gap-2 justify-center">
            <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakSkeleton;

