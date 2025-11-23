const BudgetSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full translate-y-12 -translate-x-12 blur-xl" />

      <div className="relative z-10 flex gap-4 flex-col">
        <div className="flex max-sm:flex-col sm:flex-row justify-between items-center gap-6">
          <div className="w-full flex flex-row items-center gap-4">
            {/* BlockieFace skeleton */}
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-full">
              {/* Label skeleton */}
              <div className="w-24 h-4 bg-gray-200 rounded mb-1 animate-pulse" />
              {/* Amount skeleton */}
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-end text-right">
            {/* Label skeleton */}
            <div className="w-20 h-4 bg-gray-200 rounded mb-1 ml-auto animate-pulse" />
            {/* Amount skeleton */}
            <div className="w-28 h-8 bg-gray-200 rounded ml-auto animate-pulse" />
            {/* Small text skeleton */}
            <div className="w-24 h-3 bg-gray-200 rounded ml-auto mt-1 animate-pulse" />
          </div>
        </div>

        {/* Progress bar skeleton */}
        <div className="relative">
          <div className="h-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex justify-between text-sm mt-2">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Status message skeleton */}
        <div className="p-3 rounded-lg bg-gray-100 animate-pulse">
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
