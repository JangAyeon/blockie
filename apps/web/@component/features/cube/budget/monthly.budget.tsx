import { BlockieFace } from "@repo/ui";

import { formatWithCurrencySymbol } from "@utils/common/formatter";
import ProgressBar from "@component/features/cube/budget/progressBar";

import { BudgetSummary } from "@type/budget";
import getUsageEmotion from "@utils/common/getUsageEmotion";
import { useTranslations } from "next-intl";

const MonthlyBudget = ({ budgetStatus }: { budgetStatus: BudgetSummary }) => {
  const t = useTranslations("cube.budget");
  const usageEmotion = getUsageEmotion({
    spent: budgetStatus.spent,
    budget: budgetStatus.budget,
  });
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full translate-y-12 -translate-x-12 blur-xl" />

      <div className="relative z-10 flex gap-4 flex-col">
        <div className="flex  max-sm:flex-col sm:flex-row justify-between items-center gap-6">
          <div className="w-full  flex flex-row items-center gap-4">
            <BlockieFace size={48} emotion={usageEmotion} />
            <div className="w-full">
              <div className="w-fit text-sm text-gray-600 mb-1">
                {/* 이번 달 컬렉션 공간 */}
                {t("collectionSpace")}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {formatWithCurrencySymbol(budgetStatus?.budget!)}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end text-right">
            <div className="text-sm text-gray-600 mb-1">
              {" "}
              {t("remainingSpace")}
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formatWithCurrencySymbol(budgetStatus?.remaining!)}
            </div>
            <div className="text-xs text-gray-500">
              {/* 일 평균{" "}
              {formatWithCurrencySymbol(
                budgetStatus?.recommendedDailySpending!
              )} */}
              {t("dailyAverage", {
                amount: formatWithCurrencySymbol(
                  budgetStatus?.recommendedDailySpending!
                ),
              })}
            </div>
          </div>
        </div>

        <ProgressBar value={budgetStatus?.spent!} max={budgetStatus?.budget!} />

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
          {
            usageEmotion === "sad"
              ? `⚠️ ${t("warningMessage")}`
              : //  "⚠️ 예산 사용률이 높습니다. 지출을 줄여보세요!"
                usageEmotion === "neutral"
                ? `⚡ ${t("cautionMessage")}` //  "⚡ 예산의 70% 이상을 사용했습니다. 주의하세요!"
                : `✅ ${t("successMessage")}` // "✅ 훌륭한 예산 관리를 하고 계시네요!"
          }
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
