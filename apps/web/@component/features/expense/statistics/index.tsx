import Card from "@component/common/card";
import {
  EXPENSE_TAB_MENU,
  EXPENSE_PAGE_VARIANTS,
  categoryConfig,
} from "@constant/expense";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";

interface StatisticsProps {
  direction: number;
}

const Statistics: React.FC<StatisticsProps> = ({ direction }) => {
  return (
    <motion.div
      key={EXPENSE_TAB_MENU.STATISTICS}
      custom={direction}
      variants={EXPENSE_PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card>
        <h3 className="text-title-3 font-medium mb-4">주간 지출 추이</h3>
        <div className="h-64 mb-4">
          <Bar
            data={barData}
            options={{
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
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-body-2 text-blue-700 mb-1">주간 평균</p>
            <p className="text-title-2 font-bold">
              {((120000 + 95000 + 110000 + 85000) / 4).toLocaleString()}원
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-body-2 text-green-700 mb-1">이번 주</p>
            <p className="text-title-2 font-bold">120,000원</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-title-3 font-medium mb-4">월별 지출 추이</h3>
        <div className="h-64 mb-4">
          <Line
            data={lineData}
            options={{
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
            }}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-body-2 font-medium mb-2">지출 트렌드 분석</h4>
          <p className="text-body-2 text-neutral-dark-gray">
            지난 6개월 동안 평균적으로 안정적인 지출 패턴을 보이고 있습니다.
            이번 달은 예산 범위 내에서 잘 관리되고 있습니다.
          </p>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <h3 className="text-title-3 font-medium mb-4">카테고리별 상세 분석</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        categoryConfig[category]?.color || "#9CA3AF",
                    }}
                  />
                  <span className="font-medium">{category}</span>
                </div>
                <span className="text-body-2 text-neutral-dark-gray">
                  {stats.count}건
                </span>
              </div>
              <p className="text-title-2 font-bold text-neutral-black mb-1">
                {stats.total.toLocaleString()}원
              </p>
              <p className="text-body-2 text-neutral-dark-gray">
                평균 {Math.round(stats.total / stats.count).toLocaleString()}원
              </p>
              <div className="mt-2">
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        categoryConfig[category]?.color || "#9CA3AF",
                      width: `${(stats.total / budget.spent) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-neutral-dark-gray mt-1 text-right">
                  전체의 {Math.round((stats.total / budget.spent) * 100)}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blockie-yellow bg-opacity-10 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blockie-yellow"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-body-2 font-medium text-blockie-yellow">
                지출 패턴 분석
              </h4>
              <p className="text-body-2 mt-1">
                가장 많이 지출하는 카테고리는{" "}
                <strong>
                  {
                    Object.entries(categoryStats).sort(
                      (a, b) => b[1].total - a[1].total
                    )[0]?.[0]
                  }
                </strong>
                입니다. 전체 지출의{" "}
                <strong>
                  {Math.round(
                    ((Object.entries(categoryStats).sort(
                      (a, b) => b[1].total - a[1].total
                    )[0]?.[1].total || 0) /
                      budget.spent) *
                      100
                  )}
                  %
                </strong>
                를 차지합니다.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Statistics;
