import { useBudgetStatus } from "@hook/api/budget/useBudget";
import { useExpensesCategory } from "@hook/api/expense/useExpense";

export const useCube = ({ year, month }: { year: string; month: string }) => {
  const budgetQuery = useBudgetStatus({ year, month });
  const expenseCategoryQuery = useExpensesCategory({ year, month });
  //   const budgetHistoryQuery = useBudgetHistory(6);
  //   const recentExpensesQuery = useExpenses(4);

  const isLoading = budgetQuery.isLoading || expenseCategoryQuery.isLoading;
  // recentExpensesQuery.isLoading;
  const hasError = budgetQuery.isError || expenseCategoryQuery.isError;
  // budgetHistoryQuery.isError ||
  // recentExpensesQuery.isError;
  const isSuccess = budgetQuery.isSuccess || expenseCategoryQuery.isSuccess;
  // budgetHistoryQuery.isSuccess ||
  // recentExpensesQuery.isSuccess;
  console.log({
    budgetQuery: budgetQuery.error,
    expenseCategory: expenseCategoryQuery.error,
    // recentExpenses: recentExpensesQuery.error,
  });
  return {
    // 개별 쿼리 상태
    budgetQuery: budgetQuery,
    expenseCategoryQuery: expenseCategoryQuery,
    // recentExpenses: recentExpensesQuery,

    // 통합 상태
    isLoading,
    hasError,
    isSuccess,

    // 에러 정보
    errors: {
      profile: budgetQuery.error,
      expenseCategory: expenseCategoryQuery.error,
      //   recentExpenses: recentExpensesQuery.error,
    },
  };
};
