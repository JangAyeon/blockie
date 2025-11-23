import { calculateBlocks } from "@utils/budget";
import {
  formatNumberWithCommas,
  getCurrencySymbol,
} from "@utils/common/formatter";
import { FormData } from "@type/onboarding";
import BlockVisualization from "./blockVisualization";
import { Input } from "@repo/ui";
import { useLocale } from "next-intl";

interface BudgetFormProps {
  formData: FormData;
  onBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  formData,
  onBudgetChange,
}) => {
  const blockData = calculateBlocks(formData.monthlyBudget);
  const locale = useLocale();
  return (
    <div className="text-left w-full mx-auto">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-12 transform -translate-y-1/2 text-neutral-medium-gray">
            {getCurrencySymbol(locale)}
          </div>

          <Input
            label="월간 예산"
            className="text-right"
            type="text"
            id="monthlyBudget"
            name="monthlyBudget"
            value={formatNumberWithCommas(formData.monthlyBudget)}
            onChange={onBudgetChange}
            size="lg"
            placeholder="500,000"
            // helperText="한 달 동안 사용할 예산을 입력해주세요."
            required
          />
        </div>

        <BlockVisualization blockData={blockData} />
      </div>
    </div>
  );
};

export default BudgetForm;
