import { BUDGET_MULTIPLIERS } from "@constant/budget";
import { Button } from "@repo/ui";
import { BudgetSummary } from "@type/budget";
import { motion } from "framer-motion";
import { FC, useCallback } from "react";
import { useTranslations } from "next-intl";

interface BudgetRecommendSectionProps {
  budgetStatus: BudgetSummary;
  onSelectAmount: (amount: number) => void;
}

interface RecommendedBudget {
  label: string;
  amount: number;
  isHighlighted?: boolean;
}

const BudgetRecommendSection: FC<BudgetRecommendSectionProps> = ({
  budgetStatus,
  onSelectAmount,
}) => {
  const t = useTranslations();
  const getRecommendedBudget = useCallback(
    (multiplier: number) => {
      if (!budgetStatus?.spent) return 0;
      return Math.ceil((budgetStatus.spent * multiplier) / 10000) * 10000;
    },
    [budgetStatus?.spent]
  );

  const recommendedBudgets: RecommendedBudget[] = [
    {
      label: t("common.stable"),
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.CONSERVATIVE),
    },
    {
      label: t("common.recommended"),
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.RECOMMENDED),
      isHighlighted: true,
    },
    {
      label: t("common.challenging"),
      amount: getRecommendedBudget(BUDGET_MULTIPLIERS.AGGRESSIVE),
    },
  ].filter((budget) => budget.amount > 0);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-blue-50 rounded-lg p-4 flex flex-col gap-y-3 "
    >
      <h3 className="text-body-2 font-medium text-blue-700">
        📊 {t("budget.recommendTitle")}
      </h3>

      <div className="flex flex-col gap-y-2">
        {recommendedBudgets.map((budget) => (
          <div key={budget.label} className="flex items-center justify-between">
            <span className="text-body-2 text-neutral-dark-gray">
              {budget.label}
            </span>
            <Button
              variant="ghost"
              color="blockie-blue"
              size="sm"
              onClick={() => onSelectAmount(budget.amount)}
              className={`text-xs ${budget.isHighlighted ? "bg-blue-100" : ""}`}
            >
              {budget.amount.toLocaleString()}{t("common.currency")}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-info">
        💡 {t("budget.recommendDescription")}
      </p>
    </motion.div>
  );
};

export default BudgetRecommendSection;
