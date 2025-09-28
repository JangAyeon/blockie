import { Button } from "@repo/ui";
import { FC } from "react";

interface BudgetModalHeaderProps {
  year: number;
  month: number;
  // hasSpentAmount: boolean;
  // showAdvisor: boolean;
  // onToggleAdvisor: () => void;
}

const BudgetModalHeader: FC<BudgetModalHeaderProps> = ({
  year,
  month,
  // hasSpentAmount,
  // showAdvisor,
  // onToggleAdvisor,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-title-2 font-semibold">
        {year}년 {month}월 예산 설정
      </h2>
    </div>
  );
};

export default BudgetModalHeader;
