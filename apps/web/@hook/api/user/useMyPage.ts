import { useExpenses } from "@hook/api/expense/useExpense";
import { useBudgetHistory } from "@hook/api/budget/useBudgetHistory";
import { useMyProfile } from "@hook/api/user/useUser";

export const useMyPage = () => {
  const profileQuery = useMyProfile();
  const budgetHistoryQuery = useBudgetHistory(6);
  const recentExpensesQuery = useExpenses(4);

  const isLoading =
    profileQuery.isLoading ||
    budgetHistoryQuery.isLoading ||
    recentExpensesQuery.isLoading;
  const hasError =
    profileQuery.isError ||
    budgetHistoryQuery.isError ||
    recentExpensesQuery.isError;
  const isSuccess =
    profileQuery.isSuccess ||
    budgetHistoryQuery.isSuccess ||
    recentExpensesQuery.isSuccess;
  console.log({
    profile: profileQuery.error,
    budgetHistory: budgetHistoryQuery.error,
    recentExpenses: recentExpensesQuery.error,
  });
  return {
    // 개별 쿼리 상태
    profile: profileQuery,
    budgetHistory: budgetHistoryQuery,
    recentExpenses: recentExpensesQuery,

    // 통합 상태
    isLoading,
    hasError,
    isSuccess,

    // 에러 정보
    errors: {
      profile: profileQuery.error,
      budgetHistory: budgetHistoryQuery.error,
      recentExpenses: recentExpensesQuery.error,
    },
  };
};
