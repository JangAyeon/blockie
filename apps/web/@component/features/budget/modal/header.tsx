import { FC } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("budget.modal");

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-title-2 font-semibold">
        {t("title", { year, month })}
      </h2>
    </div>
  );
};

export default BudgetModalHeader;
