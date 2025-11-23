import { BudgetHistoryItem } from "@type/budget";
import { useTranslations } from "next-intl";

interface StatusBadgeProps {
  item: BudgetHistoryItem;
}

const StatusBadge = ({ item }: StatusBadgeProps) => {
  const t = useTranslations();
  if (!item.hasBudget) {
    return (
      <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-gray-100 text-black border border-gray-200">
        {t("budget.notSet")}
      </span>
    );
  }

  if (item.remaining < 0) {
    return (
      <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-red-100 text-error">
        {t("budget.overBudget")}
      </span>
    );
  }

  return (
    <span className="text-body-2 font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
      {t("budget.withinBudget")}
    </span>
  );
};

export default StatusBadge;
