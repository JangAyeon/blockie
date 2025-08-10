import { Radar } from "react-chartjs-2";
import Card from "../../../common/card";
import Image from "next/image";
import { ExpenseCategorySummary } from "@type/expense";
interface CategoryComparisonCardProps {
  expenseCategory: ExpenseCategorySummary;
  prevExpenseCategory?: ExpenseCategorySummary;
}

const CategoryComparisonCard: React.FC<CategoryComparisonCardProps> = ({
  expenseCategory,
  prevExpenseCategory,
}) => {
  const hasData =
    expenseCategory?.categories.length > 0 &&
    prevExpenseCategory &&
    prevExpenseCategory?.categories.length > 0;

  if (!hasData) {
    return (
      <Card>
        <h3 className="text-lg font-medium mb-4">카테고리별 지출 추이</h3>
        <div className="flex flex-col h-full gap-2 items-center justify-center  text-neutral-medium-gray">
          <Image
            src="/common/noMonthListed.svg"
            alt="plus icon"
            width={32}
            height={32}
          />
          <div>
            <p>카테고리 비교 분석을 위한 </p>
            <p>데이터가 충분하지 않아요.</p>
          </div>
        </div>
      </Card>
    );
  }

  const radarData = {
    labels: expenseCategory.categories.map((cat: any) => cat.category),
    datasets: [
      {
        label: "이번 달",
        data: expenseCategory.categories.map((cat: any) => cat.amount),
        backgroundColor: "rgba(244, 223, 125, 0.2)",
        borderColor: "#F4DF7D",
        pointBackgroundColor: "#F4DF7D",
      },
      {
        label: "지난 달",
        data: prevExpenseCategory.categories.map(
          (cat: any) => cat.amount * 0.9
        ),
        backgroundColor: "rgba(125, 192, 244, 0.2)",
        borderColor: "#7DC0F4",
        pointBackgroundColor: "#7DC0F4",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: "rgba(0, 0, 0, 0.05)" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: { display: false },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card>
      <h3 className="text-lg font-medium mb-4">카테고리별 지출 추이</h3>
      <div className="h-64 mb-4">
        <Radar data={radarData} options={radarOptions} />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">주요 증감 카테고리</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-green-50 rounded-lg p-3 flex items-center">
            <div className="w-2 h-8 bg-green-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">가장 많이 절약한 카테고리</p>
              <p className="text-sm text-green-700">쇼핑 (-12%)</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 flex items-center">
            <div className="w-2 h-8 bg-red-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">가장 많이 증가한 카테고리</p>
              <p className="text-sm text-red-700">식비 (+8%)</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryComparisonCard;
