import { MonthlyLineChartDataProps } from "@type/expense";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import { useTranslations } from "next-intl";

interface MonthlyLineChartProps {
  data: MonthlyLineChartDataProps;
}

const MonthlyLineChart: FC<MonthlyLineChartProps> = ({ data }) => {
  const t = useTranslations();
  
  const LINE_OPTIONS = {
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
      <Line data={data} options={LINE_OPTIONS} />
    </div>
  );
};

export default MonthlyLineChart;
