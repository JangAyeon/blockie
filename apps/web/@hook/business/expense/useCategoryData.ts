import { categoryConfig } from "@constant/expense";
import { useExpensesCategory } from "@hook/api/expense/useExpense";
import { YearMonthProps } from "@type/date";
import { useMemo } from "react";

const useCategoryData = ({ year, month }: YearMonthProps) => {
  const { data } = useExpensesCategory({
    year,
    month,
  });
  const chartData = useMemo(() => {
    if (!data) return { labels: [], datasets: [] };
    const categories = data.categories;
    const labels = categories.map((item) => item.category);

    return {
      labels,
      datasets: [
        {
          data: Object.values(categories).map((item) => item.amount),
          backgroundColor: Object.values(categories).map(
            (item) => categoryConfig[item.category]?.color || "#9CA3AF"
          ),
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    };
  }, [data?.categories]);

  console.log("useCategoryData", data, chartData);
  return { data, chartData };
};

export default useCategoryData;
