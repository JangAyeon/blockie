import { BudgetSummary } from "@type/budget";
import { ExpenseCategorySummary, ExpenseItem } from "@type/expense";
import BlockCombineExpense from "@component/features/cube/block/monthly.block";
import EmptyBlockExpense from "@component/features/cube/block/empty.block";
import { MIN_BUDGET_BLOCK } from "@constant/budget";

interface BlockContainerProps {
  expenses?: {
    total: number;
    expenses: ExpenseItem[];
  };
  budgetStatus?: BudgetSummary;
  expenseCategory?: ExpenseCategorySummary;
}

const BlockContainer: React.FC<BlockContainerProps> = ({
  expenses,
  budgetStatus,
  expenseCategory,
}) => {
  const maxBlocks = Math.floor((budgetStatus?.budget || 0) / MIN_BUDGET_BLOCK);
  const totalBlocks = (budgetStatus?.spent || 0) / MIN_BUDGET_BLOCK;

  const hasExpenses = expenses?.expenses && expenses.expenses.length > 0;
  const hasBudget = budgetStatus?.hasBudget;
  const hasExpensesAndBudget = hasExpenses && hasBudget;

  return (
    <>
      {hasExpensesAndBudget ? (
        <div>
          <BlockCombineExpense
            expensesInfo={expenses.expenses}
            categoryInfo={expenseCategory?.categories ?? []}
            totalBlocks={totalBlocks}
            maxBlocks={maxBlocks}
          />
        </div>
      ) : (
        <EmptyBlockExpense
          hasBudget={hasBudget ?? false}
          maxBlocks={maxBlocks}
        />
      )}
    </>
  );
};

export default BlockContainer;
