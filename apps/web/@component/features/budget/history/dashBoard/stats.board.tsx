import { useTranslations } from "next-intl";

interface BudgetStatsSummaryProps {
  data: {
    monthsWithBudget: number;
    averageMonthlyBudget: number;
    averageMonthlySpending: number;
    budgetComplianceRate: number;
    totalMonths: number;
  };
}

const BudgetStatsBoard = ({ data }: BudgetStatsSummaryProps) => {
  const t = useTranslations();
  // if (data.monthsWithBudget === 0) return null;

  return (
    data.monthsWithBudget && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">
            {t("budget.stats.averageBudget")}
          </p>
          <p className="font-semibold">
            {data.averageMonthlyBudget.toLocaleString()}
            {t("common.currency")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">
            {t("budget.stats.averageSpending")}
          </p>
          <p className="font-semibold">
            {data.averageMonthlySpending.toLocaleString()}
            {t("common.currency")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">
            {t("budget.stats.complianceRate")}
          </p>
          <p className="font-semibold">{data.budgetComplianceRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-body-2 text-neutral-black">
            {t("budget.stats.budgetMonths")}
          </p>
          <p className="font-semibold">
            {data.monthsWithBudget}/{data.totalMonths}
            {t("budget.stats.months")}
          </p>
        </div>
      </div>
    )
  );
};

export default BudgetStatsBoard;
