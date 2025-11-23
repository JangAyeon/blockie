import { MIN_BUDGET_BLOCK } from "@constant/budget";
import { useBudgetStatus } from "@hook/api/budget/useBudget";
import {
  useExpensesCategory,
  useMonthlyExpenses,
} from "@hook/api/expense/useExpense";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";

const useBlock = ({ year, month, day }: CubeContainerProps["dateInfo"]) => {
  const {
    data: budgetStatus,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = useBudgetStatus({ year, month });
  const {
    data: expenseCategory,
    isLoading: isExpenseCategoryLoading,
    isError: isExpenseCategoryError,
  } = useExpensesCategory({ year, month });
  const {
    data: expenses,
    isLoading: isExpensesLoading,
    isError: isExpensesError,
  } = useMonthlyExpenses({
    year,
    month,
    day,
  });

  const maxBlocks = Math.floor((budgetStatus?.budget || 0) / MIN_BUDGET_BLOCK);
  const totalBlocks = (budgetStatus?.spent || 0) / MIN_BUDGET_BLOCK;

  const hasExpenses = expenses?.expenses && expenses.expenses.length > 0;
  const hasBudget = budgetStatus?.hasBudget;
  const hasExpensesAndBudget = hasExpenses && hasBudget;

  const showSkeleton =
    isBudgetLoading ||
    isExpenseCategoryLoading ||
    isExpensesLoading ||
    isBudgetError ||
    isExpenseCategoryError ||
    isExpensesError;
  return {
    showSkeleton,
    hasExpensesAndBudget,
    expensesInfo: expenses?.expenses ?? [],
    categoryInfo: expenseCategory?.categories ?? [],
    totalBlocks,
    maxBlocks,
    hasBudget: hasBudget ?? false,
  };
};

export default useBlock;
