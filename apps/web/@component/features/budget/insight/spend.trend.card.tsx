import { BudgetHistoryResponse } from "@type/budget";
import Card from "@component/common/card";
import { Line } from "react-chartjs-2";

interface SpendingTrendCardProps {
  budgetHistory: BudgetHistoryResponse;
  stats: { averageSpent: number; complianceRate: number } | null;
  trendAnalysis: string;
}

const SpendingTrendCard: React.FC<SpendingTrendCardProps> = ({
  budgetHistory,
  stats,
  trendAnalysis,
}) => {
  const chartData = {
    labels: budgetHistory.history
      .map((item: any) => `${item.month}월`)
      .reverse(),
    datasets: [
      {
        label: "월별 지출 추이",
        data: budgetHistory.history.map((item: any) => item.spent).reverse(),
        borderColor: "#7DC0F4",
        backgroundColor: "rgba(125, 192, 244, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString() + "원";
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card>
      <h3 className="text-lg font-medium mb-4">지출 추세 분석</h3>
      <div className="h-64 mb-4">
        <Line data={chartData} options={chartOptions} />
      </div>

      {budgetHistory.history.length > 0 && stats ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">
                지난 {budgetHistory.history.length}달 간 월 평균 지출
              </p>
              <p className="text-xl font-bold">
                {stats.averageSpent.toLocaleString()}원
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-1">
                지난 {budgetHistory.history.length}달 간 예산 준수율
              </p>
              <p className="text-xl font-bold">
                {stats.complianceRate.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">지출 트렌드 분석</h4>
            <p className="text-sm text-gray-600">{trendAnalysis}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            분석을 위한 충분한 데이터가 없습니다.
          </p>
        </div>
      )}
    </Card>
  );
};

export default SpendingTrendCard;
