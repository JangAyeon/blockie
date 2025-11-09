import { motion } from "framer-motion";

import Card from "@component/common/card";
import { useTranslations } from "next-intl";

import { useBudgetHistory } from "@hook/api/budget/useBudget";

import BudgetChart from "./dashBoard/chart";
import BudgetStatsBoard from "./dashBoard/stats.board";
import BudgetHistoryList from "./recordList/history.list";
import { BUDGET_ITEM_COUNT } from "@constant/budget";
import FullLoader from "../loading/FullLoader";

const HistorySection = () => {
  const t = useTranslations();
  const { data } = useBudgetHistory(BUDGET_ITEM_COUNT);

  // TODO: 내역 칸 데이터 로딩중
  if (!data?.history)
    return (
      <>
        <FullLoader />
      </>
    );
  const budgetedMonths = data.history.filter((item) => item.hasBudget);
  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex justify-between items-center">
          <h2 className="text-title-2  font-semibold">
            {t("budget.monthlyHistory")}
          </h2>
          <div className="text-body-2 text-neutral-black">
            {t("budget.totalMonths")} {data.totalMonths}
            {t("budget.stats.months")} {t("budget.of")} {data.monthsWithBudget}
            {t("budget.stats.months")} {t("budget.budgetSet")}
          </div>
        </div>
        <BudgetChart budgetedMonths={budgetedMonths} />

        {/* 통계 요약 */}
        <BudgetStatsBoard data={data} />

        {/* 월별 상세 내역 */}
        <BudgetHistoryList history={data.history} />
      </Card>
    </motion.div>
  );
};

export default HistorySection;
