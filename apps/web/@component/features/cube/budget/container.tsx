import EmptyMonthlyBudget from "./empty.budget";
import MonthlyBudget from "./monthly.budget";
import BudgetSkeleton from "./budget.skeleton";
import { useBudgetStatus } from "@hook/api/budget/useBudget";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";

interface BudgetContainerProps {
  // budgetStatus?: BudgetSummary;

  dateInfo: CubeContainerProps["dateInfo"];
}

const BudgetContainer: React.FC<BudgetContainerProps> = ({
  dateInfo: { year, month, day },
}) => {
  const {
    data: budgetStatus,
    isLoading,
    isError,
  } = useBudgetStatus({ year, month });
  const showSkeleton = isLoading || isError || !budgetStatus;
  if (showSkeleton) return <BudgetSkeleton />;
  return (
    <>
      {budgetStatus.hasBudget ? (
        <MonthlyBudget budgetStatus={budgetStatus!} />
      ) : (
        <EmptyMonthlyBudget />
      )}
    </>
  );
};

export default BudgetContainer;
