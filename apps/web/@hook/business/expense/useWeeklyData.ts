import { usePeriodExpensesAnalysis } from "@hook/api/expense/useExpense";
import { YearMonthProps } from "@type/date";
import { useMemo } from "react";

const useWeeklyData = ({ year, month }: YearMonthProps) => {
  const { data } = usePeriodExpensesAnalysis({
    startYear: year,
    startMonth: month,
    endYear: year,
    endMonth: month,
    months: "1",
    period: "weekly",
  });

  const chartData = useMemo(() => {
    if (!data) return { labels: [], datasets: [] };
    const labels = data.dataPoints.map((_, idx) => `${idx + 1}주차`);
    return {
      labels,
      datasets: [
        {
          label: "주간 지출",
          data: data.dataPoints.map((p) => p.amount),
          backgroundColor: "#8DDBA4",
          borderRadius: 6,
        },
      ],
    };
  }, [data]);
  console.log("expenseWeekly", data, chartData);
  return { data, chartData };
};

export default useWeeklyData;
