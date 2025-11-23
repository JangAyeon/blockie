import { motion } from "framer-motion";
import { getMonthName } from "@utils/budget";
import { BudgetHistoryItem as BudgetHistoryItemType } from "@type/budget";
import { useTranslations } from "next-intl";

import StatusBadge from "./status.badge";
import BudgetProgressBar from "./budget.progressBar";
import EmptyBudgetState from "./empty.badge";

interface BudgetHistoryItemProps {
  item: BudgetHistoryItemType;
  index: number;
}

const BudgetHistoryItem = ({ item, index }: BudgetHistoryItemProps) => {
  const t = useTranslations();
  return (
    <motion.div
      key={`${item.year}-${item.month}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-lg p-4 transition-shadow hover:shadow-md ${
        item.hasBudget ? "bg-gray-50" : "bg-gray-25 border border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-title-3">
          {item.year}
          {t("common.year")} {getMonthName(item.month)}
        </h3>
        <StatusBadge item={item} />
      </div>

      {item.hasBudget ? (
        <>
          <div className="grid grid-cols-3 gap-4 mb-3 text-body-2">
            <div>
              <p className="text-neutral-black mb-1">{t("common.budget")}</p>
              <p className="font-medium text-base">
                {item.budget.toLocaleString()}
                {t("common.currency")}
              </p>
            </div>
            <div>
              <p className="text-neutral-black mb-1">{t("common.spending")}</p>
              <p className="font-medium text-base">
                {item.spent.toLocaleString()}
                {t("common.currency")}
              </p>
            </div>
            <div>
              <p className="text-neutral-black mb-1">{t("budget.balance")}</p>
              <p
                className={`font-medium text-base ${
                  item.remaining < 0 ? "text-error" : "text-green-700"
                }`}
              >
                {item.remaining.toLocaleString()}
                {t("common.currency")}
              </p>
            </div>
          </div>
          <BudgetProgressBar usagePercentage={item.usagePercentage || 0} />
        </>
      ) : (
        <EmptyBudgetState year={item.year} month={item.month} />
      )}
    </motion.div>
  );
};

export default BudgetHistoryItem;
