import Card from "@component/common/card";
import { EXPENSE_TAB_MENU, EXPENSE_PAGE_VARIANTS } from "@constant/expense";

import useWeeklyData from "@hook/business/expense/useWeeklyData";
import { YearMonthDayProps } from "@type/date";
import { motion } from "framer-motion";
import Image from "next/image";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
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
          <div className="w-full flex flex-row items-start max-sm:flex-col md:justify-between gap-3">
            <div className=" flex flex-row gap-2">
              {" "}
              <button
                onClick={() =>
                  handleDateChangeBtn(
                    pageUrl.expense,
                    "prev",
                    year,
                    month,
                    router
                  )
                }
              >
                {" "}
                ◁
              </button>
              <div className="text-title-1 text-neutral-black">
                📅 {t("expense.list.yearMonth", { year, month })}
              </div>
              <button
                onClick={() =>
                  handleDateChangeBtn(
                    pageUrl.expense,
                    "next",
                    year,
                    month,
                    router
                  )
                }
              >
                {" "}
                ▷
              </button>
            </div>
          </div>
          <h3 className="text-title-3 font-medium mb-4">
            {t("expense.statistics.weeklyTrend")}
          </h3>
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
          <h3 className="text-title-3 font-medium mb-4">
            {t("expense.statistics.monthlyTrend")}
          </h3>

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
            {t("expense.statistics.categoryAnalysis")}
          </h3>

          {categoryData && categoryDoughnutData ? (
            <div>
              <CategoryDoughnutChart data={categoryDoughnutData} />
              <CategoryStateCard data={categoryData} />
            </div>
          ) : (
            <div className="flex flex-col h-full gap-2 items-center justify-center  text-neutral-medium-gray">
              <Image
                src="/common/noMonthListed.svg"
                alt="plus icon"
                width={32}
                height={32}
              />
              <div>
                <p>{t("expense.statistics.insufficientData")}</p>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Statistics;
