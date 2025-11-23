import BlockCombineExpense from "@component/features/cube/block/monthly.block";
import EmptyBlockExpense from "@component/features/cube/block/empty.block";
import BlockSkeleton from "./block.skeleton";
import { MIN_BUDGET_BLOCK } from "@constant/budget";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";
import { useBudgetStatus } from "@hook/api/budget/useBudget";
import {
  useExpensesCategory,
  useMonthlyExpenses,
} from "@hook/api/expense/useExpense";
import useBlock from "@hook/business/cube/useBlock";

interface BlockContainerProps {
  dateInfo: CubeContainerProps["dateInfo"];
}

const BlockContainer: React.FC<BlockContainerProps> = ({
  dateInfo: { year, month, day },
}) => {
  // const {
  //   data: budgetStatus,
  //   isLoading: isBudgetLoading,
  //   isError: isBudgetError,
  // } = useBudgetStatus({ year, month });
  // const {
  //   data: expenseCategory,
  //   isLoading: isExpenseCategoryLoading,
  //   isError: isExpenseCategoryError,
  // } = useExpensesCategory({ year, month });
  // const {
  //   data: expenses,
  //   isLoading: isExpensesLoading,
  //   isError: isExpensesError,
  // } = useMonthlyExpenses({
  //   year,
  //   month,
  //   day,
  // });

  // const maxBlocks = Math.floor((budgetStatus?.budget || 0) / MIN_BUDGET_BLOCK);
  // const totalBlocks = (budgetStatus?.spent || 0) / MIN_BUDGET_BLOCK;

  // const hasExpenses = expenses?.expenses && expenses.expenses.length > 0;
  // const hasBudget = budgetStatus?.hasBudget;
  // const hasExpensesAndBudget = hasExpenses && hasBudget;

  // const showSkeleton =
  //   isBudgetLoading ||
  //   isExpenseCategoryLoading ||
  //   isExpensesLoading ||
  //   isBudgetError ||
  //   isExpenseCategoryError ||
  //   isExpensesError;

  const {
    showSkeleton,
    hasExpensesAndBudget,
    expensesInfo,
    categoryInfo,
    totalBlocks,
    maxBlocks,
    hasBudget,
  } = useBlock({ year, month, day });
  if (showSkeleton) return <BlockSkeleton />;

  return (
    <>
      {hasExpensesAndBudget ? (
        <div>
          <BlockCombineExpense
            expensesInfo={expensesInfo}
            categoryInfo={categoryInfo}
            totalBlocks={totalBlocks}
            maxBlocks={maxBlocks}
          />
        </div>
      ) : (
        <EmptyBlockExpense hasBudget={hasBudget} maxBlocks={maxBlocks} />
      )}
    </>
  );
};

export default BlockContainer;
