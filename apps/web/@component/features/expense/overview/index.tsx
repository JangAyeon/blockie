import Card from "@component/common/card";
import {
  EXPENSE_TAB_MENU,
  categoryConfig,
  EXPENSE_PAGE_VARIANTS,
} from "@constant/expense";
import { useBudgetStatus } from "@hook/api/budget/useBudget";
import { BlockieFace, BlockieBottom, Button } from "@repo/ui";
import { formatWithCurrencySymbol, formatDate } from "@utils/common/formatter";
import { motion } from "framer-motion";
import FullLoader from "@component/features/expense/loading/FullLoader";
import {
  useExpensesCategory,
  useMonthlyExpenses,
} from "@hook/api/expense/useExpense";
import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "@i18n/navigation";
import { pageUrl } from "@constant/page.route";
import { handleDateChangeBtn } from "@utils/expense";
import { useLocale, useTranslations } from "next-intl";
interface OverviewProps {
  direction: number;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  year: string;
  month: string;
  day: string;
}

const Overview: React.FC<OverviewProps> = ({
  direction,
  setShowAddForm,
  year,
  month,
  day,
}) => {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const { data: budgetStatus, isLoading: isBudgetLoading } = useBudgetStatus({
    year,
    month,
  });
  const { data: expenseCategory } = useExpensesCategory({
    year,
    month,
  });
  const { data: monthlyExpense } = useMonthlyExpenses({
    year,
    month,
    day,
  });

  const isLoading = !budgetStatus || !expenseCategory || !monthlyExpense;
  const budgetCards = useMemo(() => {
    if (!budgetStatus) return [];
    return [
      {
        label: t("expense.dailyRecommended"),
        value: `${
          budgetStatus.remaining > 0
            ? Math.floor(
                budgetStatus.remaining / (31 - new Date().getDate() + 1)
              ).toLocaleString()
            : 0
        }`,
        unit: "expense.overview.currencyUnit",
        icon: "📅",
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-50 to-indigo-50",
        borderColor: "border-blue-200",
      },
      {
        label: t("common.spending"),
        value: budgetStatus.spent,
        unit: "expense.overview.currencyUnit",
        icon: "💸",
        gradient: "from-purple-500 to-pink-600",
        bgGradient: "from-purple-50 to-pink-50",
        borderColor: "border-purple-200",
      },
      {
        label: t("expense.remainingAmount"),
        value: budgetStatus.remaining,
        unit: "expense.overview.currencyUnit",
        icon: budgetStatus.remaining < 0 ? "🚨" : "💰",
        gradient:
          budgetStatus.remaining < 0
            ? "from-red-500 to-red-600"
            : "from-emerald-500 to-green-600",
        bgGradient:
          budgetStatus.remaining < 0
            ? "from-red-50 to-red-50"
            : "from-emerald-50 to-green-50",
        borderColor:
          budgetStatus.remaining < 0 ? "border-red-200" : "border-emerald-200",
      },
    ];
    // month/year 변할 때만 재계산
  }, [
    budgetStatus?.month,
    budgetStatus?.year,
    budgetStatus?.spent,
    budgetStatus?.remaining,
    isBudgetLoading,
  ]);

  const monthlyCards = useMemo(() => {
    if (!monthlyExpense || !budgetStatus || !expenseCategory) return [];
    return [
      {
        label: "expense.totalCount",
        value: `${monthlyExpense.expenses.length}건`,
        icon: "📝",
        color: "text-blue-600",
      },
      {
        label: "expense.averageSpending",
        value: `${monthlyExpense.expenses.length ? Math.round(budgetStatus.spent / monthlyExpense.expenses.length).toLocaleString() : 0}원`,
        icon: "📊",
        color: "text-purple-600",
      },
      {
        label: "cube.insight.topCategory",
        value:
          expenseCategory.categories.sort((a, b) => a.amount - b.amount)[0]
            ?.category || "-",
        icon: "🏆",
        color: "text-emerald-600",
      },
    ];
    // month/year 변할 때만 재계산
  }, [
    monthlyExpense?.expenses,
    budgetStatus?.year,
    budgetStatus?.month,
    expenseCategory?.categories,
  ]);

  if (isLoading) return <FullLoader />;
  return (
    <motion.div
      key={EXPENSE_TAB_MENU.OVERVIEW}
      custom={direction}
      variants={EXPENSE_PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-5xl mx-auto px-1 py-6 md:p-6"
    >
      <Card className="lg:col-span-2 relative overflow-hidden">
        {/* 장식적 배경 요소들 */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-100/40 to-teal-100/40 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>

        <div className="relative z-10">
          {/* 헤더 섹션 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="relative mr-6">
                {/* Blockie 캐릭터 주변 효과 */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-lg"></div>
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      rotateY: [0, 10, -10, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <BlockieFace
                      size={60}
                      emotion={budgetStatus.remaining >= 0 ? "happy" : "sad"}
                    />
                  </motion.div>
                  <BlockieBottom size={60} />
                </div>

                {/* 상태 배지 */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-100"
                >
                  <span className="text-title-3">
                    {budgetStatus.remaining >= 0 ? "✅" : "⚠️"}
                  </span>
                </motion.div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-3 items-center">
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
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-title-1 font-bold text-neutral-black "
                  >
                    {/* {budgetStatus.year}년 {budgetStatus.month}월 */}
                    {t("expense.list.yearMonth", {
                      year: budgetStatus.year,
                      month: budgetStatus.month,
                    })}
                  </motion.h2>
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

                <div className="flex flex-row gap-2">
                  {budgetStatus.hasBudget ? (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`text-sm font-semibold ${budgetStatus.statusColor} flex items-center bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border`}
                    >
                      {t("budget.status")} {budgetStatus.status}{" "}
                      {t("budget.state")}
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-semibold text-amber-600 flex items-center bg-amber-50/80 backdrop-blur-sm px-2 py-1.5 rounded-full border w-fit border-amber-200"
                    >
                      {t("budget.notSet")}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(true)}
                    className=" text-gray-800 rounded-xl font-semibold transition-all duration-200 flex flex-row items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      color="warning"
                      onClick={() => setShowAddForm(true)}
                      className={`drop-shadow-sm transform hover:scale-105 transition-all duration-200 text-body-2 font-semibold flex items-center bg-white/60 backdrop-blur-sm px-2 py-1.5 rounded-full w-fit`}
                    >
                      <div className="flex flex-row gap-2">
                        <motion.div
                          animate={{ rotate: [0, 90, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src="/expense/plus.svg" // public/icons/plus.svg
                            alt="플러스 아이콘"
                            width={24}
                            height={24}
                          />
                        </motion.div>
                        <div>{t("expense.addExpense")}</div>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* 예산 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {budgetCards.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -8,
                  rotateX: 5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
                className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-5 border ${item.borderColor} text-center group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                {/* 카드 내부 장식 */}
                <div className="absolute top-3 right-3 opacity-20 text-3xl">
                  {item.icon}
                </div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <motion.span
                      className="text-title-1 mr-3"
                      animate={{ rotateY: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <p className="text-body-2 font-semibold text-neutral-dark-gray group-hover:text-neutral-black transition-colors">
                      {t(item.label)}
                    </p>
                  </div>
                  <motion.p
                    key={item.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`font-bold text-title-1 md:text-3xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.value.toLocaleString()}
                    {t(item.unit)}
                  </motion.p>
                </div>

                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </motion.div>
            ))}
          </div>

          {/* 예산 사용률 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8 p-6 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-row gap-4">
                <div className="flex items-center">
                  <span className="text-title-1 mr-3">📊</span>
                  <p className="text-title-3 font-semibold text-neutral-black">
                    {/* 예산 사용률 */}
                    {t("budget.current.usageRateHeading")}
                  </p>
                </div>{" "}
              </div>

              <div className="text-right">
                <motion.div
                  key={budgetStatus.spent}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-title-1 font-bold text-gray-800 mb-1"
                >
                  {/* {budgetStatus.budget
                    ? Math.round(
                        (budgetStatus.spent / budgetStatus.budget) * 100
                      )
                    : 0}
                  % */}
                  <p className="text-body-2 text-emerald-600  bg-emerald-100/60 p-1.5 text-center rounded-full">
                    {/* {new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                  ).getDate()}
                  일 중 {new Date().getDate()}일 지남 */}
                    {t("budget.daysPassed", {
                      total: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        0
                      ).getDate(),
                      current: new Date().getDate(),
                    })}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="relative">
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className={`h-full rounded-full relative overflow-hidden ${
                    budgetStatus.spent / budgetStatus.budget > 1
                      ? "bg-gradient-to-r from-red-400 to-red-500"
                      : budgetStatus.spent / budgetStatus.budget > 0.8
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                        : "bg-gradient-to-r from-emerald-400 to-green-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((budgetStatus.spent / budgetStatus.budget) * 100, 100)}%`,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* 프로그레스 바 내부 애니메이션 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {/* 사용률 표시 포인터 */}
              {budgetStatus.spent > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="absolute bottom-0 h-6 w-1 bg-gray-700 rounded-full"
                  style={{
                    left: `${Math.min((budgetStatus.spent / budgetStatus.budget) * 100, 98)}%`,
                  }}
                >
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                    {budgetStatus.budget
                      ? Math.round(
                          (budgetStatus.spent / budgetStatus.budget) * 100
                        )
                      : 0}
                    %
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 하단 정보 카드들 */}
          <div className="grid grid-cols-1  gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <span className="text-title-1 mr-3">📈</span>
                <h3 className="text-title-3 font-semibold text-neutral-black">
                  {/* 이번 달 요약 */}
                  {t("expense.overview.monthSummary")}
                </h3>
              </div>
              <div className="space-y-4">
                {monthlyCards.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-white/60 rounded-xl border border-gray-100/50"
                  >
                    <div className="flex items-center">
                      <span className="text-title-3 mr-3">{item.icon}</span>
                      <span className="text-body-2 text-neutral-dark-gray">
                        {t(item.label)}
                      </span>
                    </div>
                    {/* <span className={`font-semibold ${item.color}`}>
                      {t(item.unit, { value: item.value })}
                    </span> */}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg--white backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 overflow-hidden shadow-sm"
            >
              {/* 장식적 배경 */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 rounded-full -translate-y-12 translate-x-12"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-title-1 mr-3"
                    animate={{ rotateZ: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    📅
                  </motion.span>
                  <h3 className="text-title-3 font-semibold text-neutral-black">
                    {/* 최근 지출 내역 */}
                    {t("expense.overview.recentExpenses")}
                  </h3>
                </div>
                {monthlyExpense.expenses.length <= 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-60 text-neutral-medium-gray"
                  >
                    <motion.div
                      className="flex flex-col items-center mb-6"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <BlockieFace size={50} emotion="neutral" />
                      <BlockieBottom size={50} />
                    </motion.div>
                    <p className="text-title-3 font-medium">
                      {/* 지출 데이터가 없습니다 */}
                      {t("noExpenseData")}
                    </p>
                    <p className="text-body-2 text-center mt-2">
                      {/* 지출을 추가하여
                      <br />
                      최근 지출 내역을 확인해보세요 */}
                      {t("addExpensePrompt")}
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {monthlyExpense.expenses
                      .slice(0, Math.min(monthlyExpense.expenses.length, 6))
                      .map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex flex-row items-center gap-3">
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border 
${categoryConfig[item.category]?.bg ?? "bg-gray-50"} 
${categoryConfig[item.category]?.text ?? "text-neutral-black"} 
${categoryConfig[item.category]?.border ?? "border-gray-200"}`}
                            >
                              {item.category}
                            </div>
                            <div className="text-title-2 font-bold text-neutral-black">
                              {formatWithCurrencySymbol(item.amount)}
                            </div>
                          </div>
                          <p className="text-body-2 text-neutral-dark-gray0">
                            {formatDate(item.expenseDate, locale)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Overview;
