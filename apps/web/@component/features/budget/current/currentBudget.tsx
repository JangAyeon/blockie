"use client";
import { Dispatch, SetStateAction } from "react";
import { Button, BlockieFace, BlockieBottom } from "@repo/ui";
import { motion } from "framer-motion";

import { Emotion } from "@type/onboarding";
import useAnimatedFrame from "@hook/business/budget/useAnimationFrame";
import { getMonthName } from "@utils/budget";

import { useBudgetStatus } from "@hook/api/budget/useBudget";
import FullLoader from "@component/features/budget/loading/FullLoader";
import Card from "@component/common/card";
import { useRouter } from "@i18n/navigation";
import { pageUrl } from "@constant/page.route";
import { handleDateChangeBtn } from "@utils/expense";
import { useTranslations } from "next-intl";
// import SavingsAchievements from "./_savingsAchievements";

interface CurrentBudgetProps {
  direction: number;
  setShowBudgetModal: Dispatch<SetStateAction<boolean>>;
  setBudgetAdvisor: Dispatch<SetStateAction<boolean>>;
  year: string;
  month: string;
}
const CurrentBudget: React.FC<CurrentBudgetProps> = ({
  direction,
  setShowBudgetModal,
  setBudgetAdvisor,
  year,
  month,
}) => {
  const router = useRouter();
  const t = useTranslations();
  const budgetT = useTranslations("budget.current");
  const now = new Date();

  const { data: budgetStatus } = useBudgetStatus({ year, month });

  // 애니메이션이 있는 카운터
  const animatedBudget = useAnimatedFrame(budgetStatus?.budget ?? 0);
  const animatedSpent = useAnimatedFrame(budgetStatus?.spent ?? 0);
  const animatedRemaining = useAnimatedFrame(budgetStatus?.remaining ?? 0);
  if (!budgetStatus)
    return (
      <>
        <FullLoader />
      </>
    );
  console.log(budgetStatus);
  const statusValueMap: Record<string, string> = {
    미설정: budgetT("statusValue.notSet"),
    여유: budgetT("statusValue.comfortable"),
    초과: budgetT("statusValue.over"),
    주의: budgetT("statusValue.warning"),
  };
  const localizedStatus =
    statusValueMap[budgetStatus.status] ?? budgetStatus.status;
  const daysInMonth = new Date(
    Number(budgetStatus.year),
    Number(budgetStatus.month),
    0
  ).getDate();
  const remainingDaysRaw = daysInMonth - now.getDate() + 1;
  const daysRemainingForLabel = Math.max(remainingDaysRaw, 0);
  const dailyAllowance =
    budgetStatus.remaining > 0 && remainingDaysRaw > 0
      ? Math.floor(budgetStatus.remaining / remainingDaysRaw)
      : 0;
  const currencyLabel = t("common.currency");
  return (
    <motion.div
      key="current"
      initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <Card className="lg:col-span-3 relative overflow-hidden">
        {/* 장식적 배경 요소 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/50 to-blue-100/50 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>

        <div className="relative z-10">
          {/* 헤더 섹션 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative mr-6">
                {/* Blockie 캐릭터 주변 장식 */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/50 to-purple-200/50 rounded-full blur-lg"></div>
                <div className="relative flex flex-col items-center">
                  <BlockieFace
                    size={70}
                    emotion={budgetStatus.emotion as Emotion}
                  />
                  <BlockieBottom size={70} />
                </div>
                {/* 감정 상태 표시 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                >
                  <span className="text-xs">
                    {budgetStatus.emotion === "happy"
                      ? "😊"
                      : budgetStatus.emotion === "sad"
                        ? "😞"
                        : "😐"}
                  </span>
                </motion.div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() =>
                      handleDateChangeBtn(
                        pageUrl.budget,
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
                  <h2 className="text-title-1 font-bold">
                    {budgetStatus.year}년 {getMonthName(Number(month))}
                  </h2>
                  <button
                    onClick={() =>
                      handleDateChangeBtn(
                        pageUrl.budget,
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
                      {budgetT("statusLabel", { status: localizedStatus })}
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-semibold text-amber-600 flex items-center bg-amber-50/80 backdrop-blur-sm px-2 py-1.5 rounded-full border w-fit border-amber-200"
                    >
                      {budgetT("statusUnset")}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant={budgetStatus.hasBudget ? "outline" : "primary"}
                      onClick={() => setShowBudgetModal(true)}
                      className={`shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm font-semibold flex items-center bg-white/60 backdrop-blur-sm px-2 py-1.5 rounded-full w-fit`}
                    >
                      {budgetStatus.hasBudget
                        ? budgetT("editButton")
                        : budgetT("setButton")}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {budgetStatus.hasBudget ? (
            <>
              {/* 예산 통계 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    label: t("common.budget"),
                    value: animatedBudget,
                    color: "from-blue-500 to-blue-600",
                    bgGradient: "from-blue-50 to-indigo-50",
                    borderColor: "border-blue-100",
                    icon: "🎯",
                  },
                  {
                    label: t("common.spending"),
                    value: animatedSpent,
                    color: "from-purple-500 to-purple-600",
                    bgGradient: "from-purple-50 to-pink-50",
                    borderColor: "border-purple-100",
                    icon: "💸",
                  },
                  {
                    label: budgetT("remainingAmount"),
                    value: animatedRemaining,
                    color:
                      budgetStatus.remaining < 0
                        ? "from-red-500 to-red-600"
                        : "from-emerald-500 to-emerald-600",
                    bgGradient:
                      budgetStatus.remaining < 0
                        ? "from-red-50 to-pink-50"
                        : "from-emerald-50 to-green-50",
                    borderColor:
                      budgetStatus.remaining < 0
                        ? "border-red-100"
                        : "border-emerald-100",
                    icon: budgetStatus.remaining < 0 ? "⚠️" : "💰",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    whileHover={{
                      y: -5,
                      rotateX: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 border ${item.borderColor} text-center group cursor-pointer relative overflow-hidden`}
                  >
                    {/* 카드 내부 장식 요소 */}
                    <div className="absolute top-2 right-2 opacity-20 text-2xl">
                      {item.icon}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-3">
                        <span className="text-lg mr-2">{item.icon}</span>
                        <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-700 transition-colors">
                          {item.label}
                        </p>
                      </div>
                      <motion.p
                        key={item.value}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`font-bold text-2xl md:text-3xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                      >
                        {item.value.toLocaleString()}
                        {currencyLabel}
                      </motion.p>
                    </div>

                    {/* 호버 시 나타나는 장식 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </motion.div>
                ))}
              </div>

              {/* 예산 사용률 섹션 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-10 p-6 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📊</span>
                    <p className="text-lg font-semibold text-gray-700">
                      {budgetT("usageRateHeading")}
                    </p>
                  </div>
                  {/* <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800 mb-1">
                      {budgetStatus.usageRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {budgetStatus.budget > 0
                        ? `${((budgetStatus.spent / budgetStatus.budget) * 100).toFixed(1)}%`
                        : "0%"}{" "}
                      소비됨
                    </p>
                  </div> */}
                </div>

                <div className="relative">
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className={`h-full rounded-full  relative overflow-hidden`}
                      initial={{ width: 0 }}
                      animate={{
                        backgroundColor: budgetStatus.barColor,
                        width: `${budgetStatus.usageRateDisplay}%`,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                      {/* 프로그레스 바 내부 애니메이션 효과 */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                  {budgetStatus.usageRateDisplay >= 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                      className="absolute top-0 h-6 w-0.5 bg-gray-600 rounded-full"
                      style={{
                        left: `${Math.min(budgetStatus.usageRateDisplay, 98)}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {budgetStatus.usageRate.toFixed(0)}%
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* 하단 정보 카드들 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="lg:col-span-2 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🔍</span>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {budgetT("patternAnalysis")}
                    </h3>
                  </div>
                  <div className="flex items-start">
                    {/* <div
                      className={`w-4 h-4 rounded-full mt-1 mr-3 ${
                        budgetStateDetail.isOverBudget
                          ? "bg-red-500"
                          : budgetStateDetail.isNearLimit
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    ></div> */}
                    <p className="text-gray-600 leading-relaxed">
                      {budgetStatus.isOverBudget
                        ? budgetT("analysis.overBudget")
                        : budgetStatus.isNearLimit
                          ? budgetT("analysis.nearLimit")
                          : budgetT("analysis.withinBudget")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50 relative overflow-hidden"
                >
                  {/* 장식적 배경 요소 */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-2">📅</span>
                      <h3 className="text-sm font-semibold text-emerald-800">
                        {budgetT("dailyAllowance")}
                      </h3>
                    </div>
                    <motion.p
                      key={budgetStatus.remaining}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2"
                    >
                      {dailyAllowance.toLocaleString()}
                      {currencyLabel}
                    </motion.p>
                    <p className="text-xs text-emerald-600 font-medium bg-emerald-100/50 px-2 py-1 rounded-full inline-block">
                      {budgetT("remainingDaysLabel", {
                        days: daysRemainingForLabel,
                      })}
                    </p>
                  </div>
                </motion.div>
              </div>
            </>
          ) : (
            /* 예산 미설정 상태 */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-3xl p-10 mb-6 max-w-lg mx-auto relative overflow-hidden shadow-xl">
                {/* 장식적 배경 요소들 */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-16 -translate-x-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-200/20 rounded-full translate-y-12 translate-x-12"></div>

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-6xl mb-6"
                  >
                    💡
                  </motion.div>
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">
                    {budgetT("unsetTitle")}
                  </h3>
                  <p className="text-amber-700 mb-8 leading-relaxed text-lg">
                    {budgetT("unsetDescription")}
                  </p>

                  {budgetStatus.spent > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <span className="text-2xl mr-2">💰</span>
                        <p className="text-amber-800 font-semibold">
                          {budgetT("spentSoFar")}
                        </p>
                      </div>
                      <p className="text-amber-800 text-3xl font-bold mb-4">
                        {budgetStatus.spent.toLocaleString()}
                        {currencyLabel}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold text-amber-600 flex items-center bg-amber-50/80 backdrop-blur-sm px-2 py-1.5 rounded-full border w-fit border-amber-200"
                        onClick={() => {
                          setShowBudgetModal(true);
                          setBudgetAdvisor(true);
                        }}
                      >
                        <span className="mr-2">🎯</span>
                        {budgetT("recommendationButton")}
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      {/* <SavingsAchievements /> */}
    </motion.div>
  );
};

export default CurrentBudget;
