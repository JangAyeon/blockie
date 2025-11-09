import { WeeklyBarChartDataProps } from "@type/expense";
import { Bar } from "react-chartjs-2";
import { useTranslations } from "next-intl";

export function WeeklyBarChart({ data }: { data: WeeklyBarChartDataProps }) {
  const t = useTranslations();
  
  const BAR_OPTIONS = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString() + t("common.currency");
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64 mb-4">
      <Bar data={data} options={BAR_OPTIONS} />
    </div>
  );
}
