import { Bar } from "react-chartjs-2";

import { BudgetHistoryItem } from "@type/budget";

import EmptyMonthListed from "./empty.monthListed";
import { getBarOptionsAnimation } from "@utils/budget";
import { useTranslations } from "next-intl";

interface BudgetChartProps {
  budgetedMonths?: BudgetHistoryItem[];
}

const BudgetChart = ({ budgetedMonths }: BudgetChartProps) => {
  const t = useTranslations();
  if (!budgetedMonths || budgetedMonths.length === 0) {
    return <EmptyMonthListed />;
  }

  const barData = {
    labels: budgetedMonths.map((item) => `${item.year}년 ${item.month}월`),
    datasets: [
      {
        label: t("common.budget"),
        data: budgetedMonths.map((item) => item.budget),
        backgroundColor: "#8DDBA4",
        borderRadius: 6,
      },
      {
        label: t("common.spending"),
        data: budgetedMonths.map((item) => item.spent),
        backgroundColor: "#F47D7D",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="h-80 mb-6">
      <Bar
        data={barData}
        options={getBarOptionsAnimation(barData?.labels?.length || 0)}
      />
    </div>
  );
};

export default BudgetChart;
