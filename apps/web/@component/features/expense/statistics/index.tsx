import Card from "@component/common/card";
import { EXPENSE_TAB_MENU, EXPENSE_PAGE_VARIANTS } from "@constant/expense";

import useWeeklyData from "@hook/business/expense/useWeeklyData";
import { YearMonthDayProps } from "@type/date";
import { motion } from "framer-motion";

import { WeeklyBarChart } from "./charts/weeklyBar";
import WeeklyStateCard from "./cards/weeklyStateCard";
import useMonthlyData from "@hook/business/expense/useMonthlyData";
import MonthlyLineChart from "./charts/monthlyLine";
import MonthlyStateCard from "./cards/monthlyStateCard";
import useCategoryData from "@hook/business/expense/useCategoryData";
import CategoryDoughnutChart from "./charts/categoryDoughnut";
import CategoryStateCard from "./cards/categoryStateCard";
import { pageUrl } from "@constant/page.route";
import { handleDateChangeBtn } from "@utils/expense";
import { useRouter } from "@i18n/navigation";

interface StatisticsProps extends YearMonthDayProps {
  direction: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  direction,
  year,
  month,
  day,
}) => {
  const router = useRouter();
  const { data: weeklyData, chartData: weeklyBarData } = useWeeklyData({
    year,
    month,
  });
  const { data: monthlyData, chartData: monthlyLineData } = useMonthlyData({
    year,
    month,
  });

  const { data: categoryData, chartData: categoryDoughnutData } =
    useCategoryData({ year, month });

  return (
    <div className="flex flex-col gap-6">
      {/* <Card className=" !flex !flex-row !gap-2 !w-fit">
        <button
          onClick={() =>
            handleDateChangeBtn(pageUrl.expense, "prev", year, month, router)
          }
        >
          {" "}
          ◁
        </button>
        <div className="!text-title-1 !font-semibold">
          📅 {year}년 {month}월
        </div>
        <button
          onClick={() =>
            handleDateChangeBtn(pageUrl.expense, "next", year, month, router)
          }
        >
          {" "}
          ▷
        </button>
      </Card> */}
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
          <WeeklyBarChart data={weeklyBarData} />

          {weeklyData && (
            <WeeklyStateCard
              average={weeklyData.averageSpending}
              max={weeklyData.maxSpending}
              min={weeklyData.minSpending}
              comments={[
                weeklyData.insights,
                weeklyData.recommendations,
              ].flat()}
            />
          )}
        </Card>

        <Card>
          <h3 className="text-title-3 font-medium mb-4">월별 지출 추이</h3>

          <MonthlyLineChart data={monthlyLineData} />
          {monthlyData && (
            <MonthlyStateCard
              average={monthlyData.averageSpending}
              max={monthlyData.maxSpending}
              min={monthlyData.minSpending}
              comments={[
                monthlyData.insights,
                monthlyData.recommendations,
              ].flat()}
            />
          )}
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-title-3 font-medium mb-4">
            카테고리별 상세 분석
          </h3>
          <CategoryDoughnutChart data={categoryDoughnutData} />
          {categoryData && <CategoryStateCard data={categoryData} />}
        </Card>
      </motion.div>
    </div>
  );
};

export default Statistics;
