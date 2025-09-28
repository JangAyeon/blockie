import { BudgetSummary } from "@type/budget";
import EmptyMonthlyBudget from "./empty.budget";
import MonthlyBudget from "./monthly.budget";

interface BudgetContainerProps {
  budgetStatus?: BudgetSummary;
}

const BudgetContainer: React.FC<BudgetContainerProps> = ({ budgetStatus }) => {
  return (
    <>
      {budgetStatus?.hasBudget ? (
        <MonthlyBudget budgetStatus={budgetStatus!} />
      ) : (
        <EmptyMonthlyBudget />
      )}
    </>
  );
};

export default BudgetContainer;
