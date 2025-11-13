import { usePeriodExpensesAnalysis } from "@hook/api/expense/useExpense";
import { YearMonthProps } from "@type/date";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const useWeeklyData = ({ year, month }: YearMonthProps) => {
  const t = useTranslations();
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
    const labels = data.dataPoints.map((_, idx) =>
      t("expense.statistics.weekLabel", { week: idx + 1 })
    );
    return {
      labels,
      datasets: [
        {
          label: t("expense.statistics.weeklySpending"),
          data: data.dataPoints.map((p) => p.amount),
          backgroundColor: "#8DDBA4",
          borderRadius: 6,
        },
      ],
    };
  }, [data, t]);
  console.log("expenseWeekly", data, chartData);
  return { data, chartData };
};

export default useWeeklyData;
