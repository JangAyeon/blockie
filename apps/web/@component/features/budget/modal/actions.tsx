import { Button } from "@repo/ui";
import { FC } from "react";
import { useTranslations } from "next-intl";

interface BudgetModalActionsProps {
  isValidAmount: boolean;
  isSubmitting: boolean;
  onSave: () => Promise<void>;
  onClose: () => void;
}

const BudgetModalActions: FC<BudgetModalActionsProps> = ({
  isValidAmount,
  isSubmitting,
  onSave,
  onClose,
}) => {
  const t = useTranslations();
  return (
    <div className="flex gap-2 justify-end mt-6">
      <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
        {t("common.cancel")}
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        disabled={!isValidAmount || isSubmitting}
      >
        {isSubmitting ? t("common.saving") : t("common.save")}
      </Button>
    </div>
  );
};

export default BudgetModalActions;
