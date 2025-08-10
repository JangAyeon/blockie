import { BlockieFace } from "@repo/ui";

import { formatWithCurrencySymbol } from "@utils/common/formatter";
import ProgressBar from "@component/features/cube/progressBar";

import { BudgetSummary } from "@type/budget";
import getUsageEmotion from "@utils/common/getUsageEmotion";

const MonthlyBudget = ({ budgetStatus }: { budgetStatus: BudgetSummary }) => {
  const usageEmotion = getUsageEmotion({
    spent: budgetStatus.spent,
    budget: budgetStatus.budget,
  });
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full translate-y-12 -translate-x-12 blur-xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <BlockieFace size={48} emotion={usageEmotion} />
            <div>
              <div className="text-sm text-gray-600 mb-1">
                이번 달 컬렉션 공간
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {formatWithCurrencySymbol(budgetStatus?.budget!)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">남은 공간</div>
            <div className="text-3xl font-bold text-green-600">
              {formatWithCurrencySymbol(budgetStatus?.remaining!)}
            </div>
            <div className="text-xs text-gray-500">
              일 평균{" "}
              {formatWithCurrencySymbol(
                budgetStatus?.recommendedDailySpending!
              )}
            </div>
          </div>
        </div>

        <ProgressBar
          value={budgetStatus?.spent!}
          max={budgetStatus?.budget!}
          className="mb-4"
        />

        {/* 상태별 메시지 */}
        <div
          className={`p-3 rounded-lg text-sm ${
            usageEmotion === "sad"
              ? "bg-red-50 text-red-700"
              : usageEmotion === "neutral"
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700"
          }`}
        >
          {usageEmotion === "sad"
            ? "⚠️ 예산 사용률이 높습니다. 지출을 줄여보세요!"
            : usageEmotion === "neutral"
              ? "⚡ 예산의 70% 이상을 사용했습니다. 주의하세요!"
              : "✅ 훌륭한 예산 관리를 하고 계시네요!"}
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
