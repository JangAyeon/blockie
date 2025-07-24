import { calculateBlocks } from "@utils/budget";
import { formatCurrency } from "@utils/onboarding/formatter";
import { FormData } from "@type/onboarding";
import BlockVisualization from "./blockVisualization";
import { Input } from "@repo/ui";

interface BudgetFormProps {
  formData: FormData;
  onBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  formData,
  onBudgetChange,
}) => {
  const blockData = calculateBlocks(formData.monthlyBudget);

  return (
    <div className="text-left w-full mx-auto">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-medium-gray">
            ₩
          </div>

          <Input
            label="월간 예산"
            className="text-right"
            type="text"
            id="monthlyBudget"
            name="monthlyBudget"
            value={formatCurrency(formData.monthlyBudget)}
            onChange={onBudgetChange}
            size="lg"
            placeholder="500,000"
            helperText="한 달 동안 사용할 예산을 입력해주세요."
            required
          />
        </div>

        <BlockVisualization blockData={blockData} />
      </div>
    </div>
  );
};

export default BudgetForm;
