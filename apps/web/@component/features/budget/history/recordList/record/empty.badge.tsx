import { isCurrentOrFutureMonth } from "@utils/budget";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface EmptyBudgetStateProps {
  year: number;
  month: number;
}

const EmptyBudgetState = ({ year, month }: EmptyBudgetStateProps) => {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center py-8 text-neutral-medium-gray">
      <div className="text-center flex flex-col items-center gap-2">
        <Image
          src="/budget/history/plus.svg"
          alt="plus icon"
          width={32}
          height={32}
        />
        <div>
          <p className="text-body-2">{t("budget.notSetThisMonth")}</p>
          {isCurrentOrFutureMonth(year, month) && (
            <button className="cursor-pointer mt-2 text-caption text-neutral-medium-gray hover:text-info underline">
              {t("budget.setBudget")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyBudgetState;
