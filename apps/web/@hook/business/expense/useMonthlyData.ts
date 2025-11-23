import { usePeriodExpensesAnalysis } from "@hook/api/expense/useExpense";
import { YearMonthProps } from "@type/date";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const useMonthlyData = ({ year, month }: YearMonthProps) => {
  const t = useTranslations();
  const { data } = usePeriodExpensesAnalysis({
    startYear: year,
    startMonth: month,
    months: "6",
    period: "monthly",
  });

  const chartData = useMemo(() => {
    if (!data) return { labels: [], datasets: [] };
    const dataPotins = data.dataPoints;
    const labels = dataPotins.map((item) => item.period);

    return {
      labels,
      datasets: [
        {
          label: t("expense.statistics.monthlySpendingTrend"),
          data: dataPotins.map((item) => item.amount),
          borderColor: "#7DC0F4",
          backgroundColor: "rgba(125, 192, 244, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [data?.dataPoints, t]);
  console.log("expenseMonthly", data, chartData);
  return { data, chartData };
};

export default useMonthlyData;
