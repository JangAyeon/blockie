import Card from "@component/common/card";
import {
  EXPENSE_TAB_MENU,
  EXPENSE_PAGE_VARIANTS,
  categoryConfig,
} from "@constant/expense";
import {
  useExpensesCategory,
  usePeriodExpensesAnalysis,
} from "@hook/api/expense/useExpense";
import useWeeklyData from "@hook/business/expense/useWeeklyData";
import { YearMonthDayProps } from "@type/date";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { WeeklyBarChart } from "./charts/weeklyBar";
import WeeklyStateCard from "./cards/weeklyStateCard";

interface StatisticsProps extends YearMonthDayProps {
  direction: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  direction,
  year,
  month,
  day,
}) => {
  const { data: expenseCategory } = useExpensesCategory({
    year,
    month,
  });
  const { data: weeklyData, chartData: weeklyBarChartData } = useWeeklyData({
    year,
    month,
  });

  const { data: expenseMonthly } = usePeriodExpensesAnalysis({
    startYear: year,
    startMonth: month,
    months: "6",
    period: "monthly",
  });
  const doughnutData = useMemo(() => {
    if (!expenseCategory) return { labels: [], datasets: [] };
    const categories = expenseCategory.categories;
    const labels = categories.map((item) => item.category);
    const data = {
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
    return data;
  }, [expenseCategory?.categories]);
  // const barData = useMemo(() => {
  //   if (!expenseWeekly) return { labels: [], datasets: [] };
  //   const dataPotins = expenseWeekly.dataPoints;
  //   const labels = dataPotins.map((_, idx) => `${idx + 1}주차`);
  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "주간 지출",
  //         data: dataPotins.map((item) => item.amount),
  //         backgroundColor: "#8DDBA4",
  //         borderRadius: 6,
  //       },
  //     ],
  //   };
  //   return data;
  // }, [expenseWeekly?.dataPoints]);

  const lineData = useMemo(() => {
    if (!expenseMonthly) return { labels: [], datasets: [] };
    const dataPotins = expenseMonthly.dataPoints;
    const labels = dataPotins.map((item) => item.period);
    const data = {
      labels,
      datasets: [
        {
          label: "월별 지출 추이",
          data: dataPotins.map((item) => item.amount),
          borderColor: "#7DC0F4",
          backgroundColor: "rgba(125, 192, 244, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
    return data;
  }, [expenseMonthly?.dataPoints]);

  console.log(
    "expenseMonthly",
    expenseMonthly?.startDate,
    expenseMonthly?.endDate,
    JSON.stringify(expenseMonthly?.dataPoints),
    expenseMonthly?.averageSpending,
    expenseMonthly?.insights,
    expenseMonthly?.recommendations
  );
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
          <WeeklyBarChart data={weeklyBarChartData} />
        </div>
        {weeklyData && (
          <WeeklyStateCard
            average={weeklyData.averageSpending}
            max={weeklyData.maxSpending}
            min={weeklyData.minSpending}
            comments={[weeklyData.insights, weeklyData.recommendations].flat()}
          />
        )}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 col-span-1">
            <p className="text-body-2 text-blue-700 mb-1">월간 평균</p>
            <p className="text-title-2 font-bold">
              {expenseMonthly?.averageSpending}원
            </p>
          </div>

          <div className="bg-pink-50 rounded-lg p-4 ">
            <p className="text-body-2 text-pink-700 mb-1">주간 최대</p>
            <p className="text-title-2 font-bold">
              {expenseMonthly?.maxSpending}원
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-body-2 text-green-700 mb-1">주간 최소</p>
            <p className="text-title-2 font-bold">
              {expenseMonthly?.minSpending}원
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-body-2 font-medium mb-2">월간 추이 분석</h4>
          <div className="text-body-2 text-neutral-dark-gray">
            {[expenseMonthly?.insights, expenseMonthly?.recommendations]
              .flat()
              .map((item, idx) => (
                <div key={idx}>* {item}</div>
              ))}
            {/* 지난 6개월 동안 평균적으로 안정적인 지출 패턴을 보이고 있습니다.
            이번 달은 예산 범위 내에서 잘 관리되고 있습니다. */}
          </div>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <h3 className="text-title-3 font-medium mb-4">카테고리별 상세 분석</h3>
        {expenseCategory &&
          Object.keys(expenseCategory.categories).length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-60 mb-6 relative"
              >
                <Doughnut
                  data={doughnutData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    animation: {
                      animateRotate: true,
                      animateScale: true,
                      duration: 2000,
                    },
                  }}
                />
              </motion.div>
            </>
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseCategory?.categories &&
            Object.entries(expenseCategory?.categories).map(
              ([category, stats]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            categoryConfig[stats.category]?.color || "#9CA3AF",
                        }}
                      />
                      <span className="font-medium">{stats.category}</span>
                    </div>
                    <span className="text-body-2 text-neutral-dark-gray">
                      {stats.count}건
                    </span>
                  </div>
                  <p className="text-title-2 font-bold text-neutral-black mb-1">
                    {stats.amount.toLocaleString()}원
                  </p>
                  <p className="text-body-2 text-neutral-dark-gray">
                    평균{" "}
                    {Math.round(stats.amount / stats.count).toLocaleString()}원
                  </p>
                  <div className="mt-2">
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            categoryConfig[stats.category]?.color || "#9CA3AF",
                          width: `${stats.percentage.toFixed(1)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-neutral-dark-gray mt-1 text-right">
                      전체의 {stats.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              )
            )}
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
                  {(expenseCategory &&
                    expenseCategory.categories.sort(
                      (a, b) => -a.amount + b.amount
                    )[0]?.category) ||
                    "-"}
                </strong>
                입니다. 전체 지출의{" "}
                <strong>
                  {expenseCategory &&
                    expenseCategory.categories
                      .sort((a, b) => -a.amount + b.amount)[0]
                      ?.percentage.toFixed(1)}
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
