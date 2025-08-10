import { formatWithCurrencySymbol } from "@utils/common/formatter";
import { memo, useMemo } from "react";

const ProgressBar = memo<{
  value: number;
  max: number;
  className?: string;
  showAnimation?: boolean;
}>(({ value, max, className = "", showAnimation = true }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClass = useMemo(() => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 70) return "bg-yellow-500";
    return "bg-green-500";
  }, [percentage]);

  return (
    <div className={`relative ${className}`}>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative ${colorClass} ${
            showAnimation ? "animate-pulse" : ""
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
      <div className="flex justify-between text-sm mt-2 text-gray-600">
        <span>사용: {formatWithCurrencySymbol(value)}</span>
        <span className="font-semibold">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
