import { Radar } from "react-chartjs-2";
import Card from "../../../common/card";
import Image from "next/image";
import { ExpenseCategorySummary } from "@type/expense";
import { useTranslations } from "next-intl";

interface CategoryComparisonCardProps {
  expenseCategory: ExpenseCategorySummary;
  prevExpenseCategory?: ExpenseCategorySummary;
}

const CategoryComparisonCard: React.FC<CategoryComparisonCardProps> = ({
  expenseCategory,
  prevExpenseCategory,
}) => {
  const t = useTranslations();
  const hasData =
    expenseCategory?.categories.length > 0 &&
    prevExpenseCategory &&
    prevExpenseCategory?.categories.length > 0;
  console.log(
    expenseCategory.categories.length,
    prevExpenseCategory?.categories.length
  );
  if (!hasData) {
    return (
      <Card>
        <h3 className="text-lg font-medium mb-4">
          {t("budget.categoryTrend")}
        </h3>
        <div className="flex flex-col h-full gap-2 items-center justify-center  text-neutral-medium-gray">
          <Image
            src="/common/noMonthListed.svg"
            alt="plus icon"
            width={32}
            height={32}
          />
          <div>
            <p>{t("budget.insufficientCategoryData")}</p>
          </div>
        </div>
      </Card>
    );
  }

  const radarData = {
    labels: expenseCategory.categories.map((cat: any) => cat.category),
    datasets: [
      {
        label: t("budget.thisMonth"),
        data: expenseCategory.categories.map((cat: any) => cat.amount),
        backgroundColor: "rgba(244, 223, 125, 0.2)",
        borderColor: "#F4DF7D",
        pointBackgroundColor: "#F4DF7D",
      },
      {
        label: t("budget.lastMonth"),
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
      <h3 className="text-lg font-medium mb-4">{t("budget.categoryTrend")}</h3>
      <div className="h-64 mb-4">
        <Radar data={radarData} options={radarOptions} />
      </div>
    </Card>
  );
};

export default CategoryComparisonCard;
