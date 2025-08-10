import { Button } from "@repo/ui";
import Card from "../../../common/card";
import Image from "next/image";
import { ExpenseCategoryItem, ExpenseCategorySummary } from "@type/expense";
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
      <h3 className="text-lg font-medium mb-4">예산 최적화 제안</h3>

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
              맞춤 예산 추천
            </h4>
            <p className="text-sm mt-1">
              지난 몇 개월간의 지출 패턴을 분석한 결과, 귀하에게 최적화된 월
              예산은 <span className="font-bold">{recommendedBudget}원</span>{" "}
              입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">카테고리별 예산 추천</h4>

          <div className="space-y-2">
            {categories.map((category: ExpenseCategoryItem, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{category.category}</span>
                <span className="text-sm font-medium">
                  {(category.amount * 1.1)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">절약 팁</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                식비: 집에서 식사를 준비하면 외식 비용의 약 50%를 절약할 수
                있습니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                쇼핑: 필요한 물건은 세일 기간에 구매하여 약 20% 절약 가능합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                교통: 대중교통 정기권을 활용하면 최대 30%까지 교통비를 줄일 수
                있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="primary"
          color="info"
          className="w-full"
          onClick={() => onSetBudget(recommendedBudget)}
        >
          추천 예산으로 설정하기
        </Button>
      </div>
    </Card>
  );
};

export default BudgetOptimizationCard;
