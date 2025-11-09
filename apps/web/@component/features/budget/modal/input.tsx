import { Button, Input } from "@repo/ui";
import { BudgetSummary } from "@type/budget";
import { FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import { useTranslations } from "next-intl";

interface BudgetInputSectionProps {
  budgetStatus: BudgetSummary;
  budgetAmount: string;
  setBudgetAmount: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  hasSpentAmount: boolean;
  showAdvisor: boolean;
  onToggleAdvisor: () => void;
}

const BudgetInputSection: FC<BudgetInputSectionProps> = ({
  budgetStatus,
  budgetAmount,
  setBudgetAmount,
  isSubmitting,
  hasSpentAmount,
  showAdvisor,
  onToggleAdvisor,
}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-y-4">
      {/* 현재 지출 정보 */}
      {hasSpentAmount && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-body-2 text-neutral-black">
            {t("budget.currentSpending")}:{" "}
            <span className="font-medium text-error">
              {budgetStatus?.spent.toLocaleString() ?? 0}{t("common.currency")}
            </span>
          </p>
        </div>
      )}

      {/* 예산 입력 */}
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between ">
          <label className="block text-body-2 font-medium text-neutral-black ">
            {t("budget.amount")}
          </label>
          {hasSpentAmount && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleAdvisor}
              className={showAdvisor ? "bg-blue-50" : ""}
            >
              💡 {t("common.recommend")} {showAdvisor ? t("common.turnOffRecommend") : t("common.getRecommend")}
            </Button>
          )}
        </div>

        <div className="relative">
          <Input
            // label={t("email.label")}
            type="text"
            name="text"
            value={budgetAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBudgetAmount(e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder={t("budget.amountPlaceholder")}
            disabled={isSubmitting}
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-neutral-medium-gray">{t("common.currency")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetInputSection;
