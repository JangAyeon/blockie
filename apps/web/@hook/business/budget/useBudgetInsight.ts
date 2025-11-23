import { useBudgetHistory } from "@hook/api/budget/useBudget";
import { useExpensesCategory } from "@hook/api/expense/useExpense";
import {
  analyzeTrend,
  calculateBudgetStats,
  getPrevMonth,
  getRecommendedBudget,
} from "@utils/budget";

export const useBudgetInsights = (year: string, month: string) => {
  const { data: budgetHistory } = useBudgetHistory();
  const { data: expenseCategory } = useExpensesCategory({ year, month });
  const { data: prevExpenseCategory } = useExpensesCategory(
    getPrevMonth({ year, month })
  );

  const stats = budgetHistory
    ? calculateBudgetStats(budgetHistory.history)
    : null;
  const recommendedBudget = budgetHistory
    ? getRecommendedBudget(budgetHistory.history)
    : "0";
  const trendAnalysis = budgetHistory
    ? analyzeTrend(budgetHistory.history)
    : "";

  return {
    budgetHistory,
    expenseCategory,
    prevExpenseCategory,
    stats,
    recommendedBudget,
    trendAnalysis,
    isLoading: !budgetHistory || !expenseCategory,
  };
};
