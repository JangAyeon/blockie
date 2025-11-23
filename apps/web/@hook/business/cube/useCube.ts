import { useBudgetStatus } from "@hook/api/budget/useBudget";
import {
  useMonthlyExpenses,
  useExpensesCategory,
  useExpensesStreak,
} from "@hook/api/expense/useExpense";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";

export const useCube = ({
  year,
  month,
  day,
}: CubeContainerProps["dateInfo"]) => {
  const budgetQuery = useBudgetStatus({ year, month });
  const expenseCategoryQuery = useExpensesCategory({ year, month });
  const expensesQuery = useMonthlyExpenses({
    year,
    month,
    day,
  });
  const streakQuery = useExpensesStreak();
  const isFullPageLoading = [
    budgetQuery.isLoading,
    expenseCategoryQuery.isLoading,
    expensesQuery.isLoading,
    streakQuery.isLoading,
  ].every(Boolean);

  const hasError =
    budgetQuery.isError ||
    expenseCategoryQuery.isError ||
    expensesQuery.isError ||
    streakQuery.isError;

  const isSuccess =
    budgetQuery.isSuccess ||
    expenseCategoryQuery.isSuccess ||
    expensesQuery.isSuccess ||
    streakQuery.isSuccess;

  console.log({
    budgetQuery: budgetQuery.data,
    expenseCategory: expenseCategoryQuery.data,
    expensesQuery: expensesQuery.data,
    streakQuery: streakQuery.data,
  });
  return {
    // 통합 상태
    isFullPageLoading,
    hasError,
    isSuccess,

    // 에러 정보
    errors: {
      profile: budgetQuery.error,
      expenseCategory: expenseCategoryQuery.error,
      expensesQuery: expensesQuery.error,
      streakQuery: streakQuery.error,
    },
  };
};
