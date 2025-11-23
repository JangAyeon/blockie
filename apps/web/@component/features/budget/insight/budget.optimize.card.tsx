import { Button } from "@repo/ui";
import Card from "../../../common/card";
import Image from "next/image";
import { ExpenseCategoryItem, ExpenseCategorySummary } from "@type/expense";
import CategoryFeedback from "./category.feedback";
import { useTranslations } from "next-intl";
interface BudgetOptimizationCardProps {
  recommendedBudget: string;
  expenseCategory: ExpenseCategorySummary;
  prevExpenseCategory?: ExpenseCategorySummary;
  onSetBudget: (budget: string) => void;
}

const BudgetOptimizationCard: React.FC<BudgetOptimizationCardProps> = ({
  recommendedBudget,
  expenseCategory,
  prevExpenseCategory,
  onSetBudget,
}) => {
  const t = useTranslations();
  const categories = expenseCategory.categories?.length
    ? expenseCategory.categories
    : (prevExpenseCategory?.categories ?? []);
  console.log(
    expenseCategory.categories,
    prevExpenseCategory?.categories,
    categories
  );
  return (
    <Card className="lg:col-span-2">
      <h3 className="text-lg font-medium mb-4">
        {t("budget.optimizationSuggestion")}
      </h3>

      <div className="bg-blockie-yellow bg-opacity-10 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Image
              src="/common/info.svg"
              alt="plus icon"
              width={32}
              height={32}
            />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blockie-yellow">
              {t("budget.customRecommendation")}
            </h4>
            <p className="text-sm mt-1">
              {t("budget.analysisResult")}{" "}
              <span className="font-bold">
                {recommendedBudget}
                {t("common.currency")}
              </span>{" "}
              {t("budget.isOptimal")}.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">
            {t("budget.categoryRecommendation")}
          </h4>

          <div className="space-y-2">
            {categories.map((category: ExpenseCategoryItem, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{category.category}</span>
                <span className="text-sm font-medium">
                  {(category.amount * 1.1)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {t("common.currency")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <CategoryFeedback />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="primary"
          color="info"
          className="w-full"
          onClick={() => onSetBudget(recommendedBudget)}
        >
          {t("budget.setRecommendedBudget")}
        </Button>
      </div>
    </Card>
  );
};

export default BudgetOptimizationCard;
