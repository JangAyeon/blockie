import { motion } from "framer-motion";

import { BudgetPageVariants } from "@constant/budget";

import { Dispatch, SetStateAction } from "react";

import { useBudgetInsights } from "@hook/business/budget/useBudgetInsight";
import SpendingTrendCard from "./spend.trend.card";

import CategoryComparisonCard from "./category.compare.card";
import BudgetOptimizationCard from "./budget.optimize.card";
import FullLoader from "../loading/FullLoader";
interface InsightProps {
  direction: number;
  year: string;
  month: string;
  setNewBudget: Dispatch<SetStateAction<string>>;
  setShowBudgetModal: Dispatch<SetStateAction<boolean>>;
}

const Insight: React.FC<InsightProps> = ({
  direction,
  year,
  month,
  setNewBudget,
  setShowBudgetModal,
}) => {
  const {
    budgetHistory,
    expenseCategory,
    prevExpenseCategory,
    stats,
    recommendedBudget,
    trendAnalysis,
    isLoading,
  } = useBudgetInsights(year, month);
  const handleSetBudget = (budget: string) => {
    setNewBudget(budget);
    setShowBudgetModal(true);
  };

  if (!budgetHistory || !expenseCategory)
    return (
      <>
        <FullLoader />
      </>
    );
  return (
    <motion.div
      key="insights"
      custom={direction}
      variants={BudgetPageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <SpendingTrendCard
        budgetHistory={budgetHistory}
        stats={stats}
        trendAnalysis={trendAnalysis}
      />

      <CategoryComparisonCard
        expenseCategory={expenseCategory}
        prevExpenseCategory={prevExpenseCategory}
      />

      <BudgetOptimizationCard
        recommendedBudget={recommendedBudget}
        expenseCategory={expenseCategory}
        prevExpenseCategory={prevExpenseCategory}
        onSetBudget={handleSetBudget}
      />
    </motion.div>
  );
};

export default Insight;
