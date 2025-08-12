import { MonthlyLineChartDataProps } from "@type/expense";
import { FC } from "react";
import { Line } from "react-chartjs-2";

interface MonthlyLineChartProps {
  data: MonthlyLineChartDataProps;
}

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
          return value.toLocaleString() + "원";
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const MonthlyLineChart: FC<MonthlyLineChartProps> = ({ data }) => {
  return (
    <div className="h-64 mb-4">
      <Line data={data} options={LINE_OPTIONS} />
    </div>
  );
};

export default MonthlyLineChart;
