const ExpenseSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Expense items skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              {/* Icon box skeleton */}
              <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4 animate-pulse" />
              <div>
                {/* Category name skeleton */}
                <div className="w-20 h-5 bg-gray-200 rounded mb-1 animate-pulse" />
                {/* Date skeleton */}
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="text-right">
              {/* Amount skeleton */}
              <div className="w-20 h-6 bg-gray-200 rounded mb-1 ml-auto animate-pulse" />
              {/* Blocks skeleton */}
              <div className="w-12 h-3 bg-gray-200 rounded ml-auto animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* View more button skeleton */}
      <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl">
        <div className="w-32 h-4 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export default ExpenseSkeleton;
