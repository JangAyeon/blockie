import { ExpenseItem } from "@type/expense";
import EmptyExpense from "./list.monthly.empty";
import ListExpense from "./list.monthly.expense";

interface ExpenseContainerProps {
  expenses?: {
    total: number;
    expenses: ExpenseItem[];
  };
}

const ExpenseContainer: React.FC<ExpenseContainerProps> = ({ expenses }) => {
  return (
    <>
      {expenses && expenses?.expenses.length > 0 ? (
        <ListExpense expensesInfo={expenses?.expenses!} />
      ) : (
        <EmptyExpense />
      )}
    </>
  );
};

export default ExpenseContainer;
