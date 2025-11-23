import EmptyExpense from "./list.monthly.empty";
import ListExpense from "./list.monthly.expense";
import ExpenseSkeleton from "./expense.skeleton";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";
import { useMonthlyExpenses } from "@hook/api/expense/useExpense";

interface ExpenseContainerProps {
  dateInfo: CubeContainerProps["dateInfo"];
}

const ExpenseContainer: React.FC<ExpenseContainerProps> = ({
  dateInfo: { year, month, day },
}: ExpenseContainerProps) => {
  const {
    data: expenses,
    isLoading,
    isError,
  } = useMonthlyExpenses({ year, month, day });
  const showSkeleton = isLoading || isError || !expenses?.expenses;
  if (showSkeleton) return <ExpenseSkeleton />;

  return (
    <>
      {expenses.expenses.length > 0 ? (
        <ListExpense expensesInfo={expenses.expenses} />
      ) : (
        <EmptyExpense />
      )}
    </>
  );
};

export default ExpenseContainer;
