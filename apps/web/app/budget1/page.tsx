"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { Button, BlockieFace, BlockieBottom } from "@repo/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";
import { Doughnut, Bar, Line, Radar } from "react-chartjs-2";
import { Emotion } from "@type/onboarding";
import useBudgetTab from "@hook/budget/useBudgetTab";

import useAnimatedFrame from "@hook/budget/useAnimationFrame";
import { BudgetStatus, BudgetHistory } from "@type/budget";
import { ExpenseCategory } from "@type/expense";
import {
  BarOptionsAnimation,
  BudgetPageVariants,
  DoughnutOptionsAnimation,
} from "@constant/budget";
import { getExpenseStateWithBudget, getMonthName } from "@utils/budget";

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  BarElement,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title
);

// 커스텀 훅: 지출 통계 계산
// function getExpenseStateWithBudget(spent: number, budget: number) {
//   if (budget === 0) {
//     return {
//       usageRate: 0,
//       usageRateDisplay: 0,
//       isOverBudget: false,
//       isNearLimit: false,
//       emotion: "neutral",
//       status: "미설정",
//       statusColor: "text-yellow-500",
//       barColor: "#9CA3AF",
//     };
//   }

//   const usageRate = (spent / budget) * 100;
//   const usageRateDisplay = usageRate > 100 ? 100 : usageRate;
//   const isOverBudget = spent > budget;
//   const isNearLimit = usageRate > 80 && usageRate <= 100;

//   let emotion = "happy";
//   let status = "여유";
//   let statusColor = "text-green-500";
//   let barColor = "#8DDBA4"; // blockie-green

//   if (isOverBudget) {
//     emotion = "sad";
//     status = "초과";
//     statusColor = "text-red-500";
//     barColor = "#F47D7D"; // blockie-red
//   } else if (isNearLimit) {
//     emotion = "neutral";
//     status = "주의";
//     statusColor = "text-yellow-500";
//     barColor = "#FBBF24"; // warning color
//   }

//   return {
//     usageRate,
//     usageRateDisplay,
//     isOverBudget,
//     isNearLimit,
//     emotion,
//     status,
//     statusColor,
//     barColor,
//   };
// }

// 커스텀 훅: 탭 변경 애니메이션
// function useBudgetTab() {
//   const [activeTab, setActiveTab] = useState("current");
//   const [direction, setDirection] = useState(0);

//   const changeTab = (tab: string) => {
//     const tabOrder = { current: 0, history: 1, insights: 2 };
//     setDirection(
//       tabOrder[tab as keyof typeof tabOrder] -
//         tabOrder[activeTab as keyof typeof tabOrder]
//     );
//     setActiveTab(tab);
//   };

//   return { activeTab, changeTab, direction };
// }

// 커스텀 훅: 애니메이션이 있는 카운터
// function useAnimatedFrame(targetValue: number, duration: number = 1000) {
//   const [displayValue, setDisplayValue] = useState(0);
//   const startTimeRef = useRef<number | null>(null);
//   const startValueRef = useRef(0);
//   const requestRef = useRef<number>(0);

//   useEffect(() => {
//     startValueRef.current = displayValue;
//     startTimeRef.current = null;

//     const animate = (timestamp: number) => {
//       if (startTimeRef.current === null) {
//         startTimeRef.current = timestamp;
//       }

//       const elapsed = timestamp - startTimeRef.current;
//       const progress = Math.min(elapsed / duration, 1);

//       const newValue = Math.floor(
//         startValueRef.current + (targetValue - startValueRef.current) * progress
//       );
//       setDisplayValue(newValue);

//       if (progress < 1) {
//         requestRef.current = requestAnimationFrame(animate);
//       }
//     };

//     requestRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (requestRef.current !== undefined) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, [targetValue, duration]);

//   return displayValue;
// }

// // 예산 상태 타입 정의
// type BudgetStatus = {
//   year: number;
//   month: number;
//   hasBudget: boolean;
//   budget: number;
//   spent: number;
//   remaining: number;
// };

// // 월별 예산 내역 타입 정의
// type BudgetHistory = {
//   year: number;
//   month: number;
//   budget: number;
//   spent: number;
//   remaining: number;
// };

// 지출 카테고리 타입 정의
// type ExpenseCategory = {
//   name: string;
//   amount: number;
//   color: string;
// };

// Mock 데이터 - 예산이 설정되지 않은 상태로 시작
const MOCK_CURRENT_BUDGET: BudgetStatus = {
  year: 2025,
  month: 7, // 7월
  hasBudget: false, // 예산이 설정되지 않음
  budget: 0,
  spent: 320000, // 지출은 있음
  remaining: -320000,
};

// Mock 예산 내역 데이터
const MOCK_BUDGET_HISTORY: BudgetHistory[] = [
  {
    year: 2025,
    month: 6, // 6월
    budget: 500000,
    spent: 480000,
    remaining: 20000,
  },
  {
    year: 2025,
    month: 5, // 5월
    budget: 450000,
    spent: 470000,
    remaining: -20000,
  },
  {
    year: 2025,
    month: 4, // 4월
    budget: 450000,
    spent: 420000,
    remaining: 30000,
  },
  {
    year: 2025,
    month: 3, // 3월
    budget: 400000,
    spent: 390000,
    remaining: 10000,
  },
];

// Mock 지출 카테고리 데이터
const MOCK_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: "식비", amount: 150000, color: "#F4DF7D" }, // blockie-yellow
  { name: "교통비", amount: 50000, color: "#8DDBA4" }, // blockie-green
  { name: "쇼핑", amount: 80000, color: "#7DC0F4" }, // blockie-blue
  { name: "여가", amount: 30000, color: "#C89DF4" }, // blockie-purple
  { name: "주거", amount: 10000, color: "#F48DAE" }, // blockie-pink
];

// 애니메이션 배리언트

// 컴포넌트: 카드
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function BudgetPage() {
  const [loading, setLoading] = useState(true);
  const { activeTab, changeTab, direction } = useBudgetTab();
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const [budgetHistory, setBudgetHistory] = useState<BudgetHistory[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [showSetBudget, setShowSetBudget] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [budgetAdvisor, setBudgetAdvisor] = useState(false);

  // 현재 년월 구하기
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Mock 예산 정보 불러오기
  useEffect(() => {
    // API 호출을 시뮬레이션하기 위한 타임아웃
    const timer = setTimeout(() => {
      setBudgetStatus(MOCK_CURRENT_BUDGET);
      setExpenseCategories(MOCK_EXPENSE_CATEGORIES);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock 예산 내역 불러오기
  useEffect(() => {
    if (activeTab !== "history") return;

    // API 호출을 시뮬레이션하기 위한 타임아웃
    const timer = setTimeout(() => {
      setBudgetHistory(MOCK_BUDGET_HISTORY);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Mock 예산 설정하기
  const handleSetBudget = async () => {
    // 로딩 상태 시뮬레이션
    setLoading(true);

    setTimeout(() => {
      // 새 예산 설정
      const budget = parseInt(newBudget, 10);
      const updatedBudget = {
        ...MOCK_CURRENT_BUDGET,
        hasBudget: true, // 예산이 설정됨
        budget: budget,
        remaining: budget - MOCK_CURRENT_BUDGET.spent,
      };

      setBudgetStatus(updatedBudget);
      setShowSetBudget(false);
      setNewBudget("");
      setLoading(false);
    }, 800);
  };

  // 예산 통계 계산
  const stats = budgetStatus
    ? getExpenseStateWithBudget(budgetStatus.spent, budgetStatus.budget)
    : {
        usageRate: 0,
        usageRateDisplay: 0,
        emotion: "neutral",
        status: "",
        isOverBudget: true,
        isNearLimit: false,
        statusColor: "",
        barColor: "#9CA3AF",
      };

  // 애니메이션이 있는 카운터
  const animatedBudget = useAnimatedFrame(budgetStatus?.budget || 0);
  const animatedSpent = useAnimatedFrame(budgetStatus?.spent || 0);
  const animatedRemaining = useAnimatedFrame(budgetStatus?.remaining || 0);

  // 차트 데이터 - 도넛 차트 (지출 카테고리)
  const doughnutData = {
    labels: expenseCategories.map((cat) => cat.name),
    datasets: [
      {
        data: expenseCategories.map((cat) => cat.amount),
        backgroundColor: expenseCategories.map((cat) => cat.color),
        borderColor: expenseCategories.map(() => "#ffffff"),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  // 차트 데이터 - 바 차트 (예산 내역)
  const barData = {
    labels: budgetHistory.map((item) => `${item.year}년 ${item.month}월`),
    datasets: [
      {
        label: "예산",
        data: budgetHistory.map((item) => item.budget),
        backgroundColor: "#8DDBA4", // blockie-green
        borderRadius: 6,
      },
      {
        label: "지출",
        data: budgetHistory.map((item) => item.spent),
        backgroundColor: "#F47D7D", // blockie-red
        borderRadius: 6,
      },
    ],
  };

  // 차트 옵션

  // 예산 어드바이저
  const advisedBudget = budgetStatus?.spent
    ? Math.ceil((budgetStatus.spent * 1.2) / 10000) * 10000
    : 0;

  // 월 이름 가져오기
  // const getMonthName = (month: number) => {
  //   const monthNames = [
  //     "1월",
  //     "2월",
  //     "3월",
  //     "4월",
  //     "5월",
  //     "6월",
  //     "7월",
  //     "8월",
  //     "9월",
  //     "10월",
  //     "11월",
  //     "12월",
  //   ];
  //   return monthNames[month - 1];
  // };

  if (loading && activeTab === "current") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <BlockieFace size={60} emotion="neutral" />
          <BlockieBottom size={60} />
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">
          예산 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center">예산 관리</h1>
        <p className="text-center text-gray-500 mt-2">
          스마트한 예산 관리로 현명한 소비 습관을 만들어 보세요
        </p>
      </motion.div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center mb-8 relative">
        <nav className="bg-white shadow-md rounded-full px-1 py-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "current" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => changeTab("current")}
            aria-label="이번 달 예산 탭"
          >
            이번 달 예산
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "history" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => changeTab("history")}
            aria-label="예산 내역 탭"
          >
            예산 내역
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "insights" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => changeTab("insights")}
            aria-label="지출 분석 탭"
          >
            지출 분석
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* 현재 예산 탭 */}
        {activeTab === "current" && budgetStatus && (
          <motion.div
            key="current"
            custom={direction}
            variants={BudgetPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card className="lg:col-span-2">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex flex-col items-center mr-4">
                    <BlockieFace size={60} emotion={stats.emotion as Emotion} />
                    <BlockieBottom size={60} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {budgetStatus.year}년 {getMonthName(budgetStatus.month)}
                    </h2>
                    {budgetStatus.hasBudget ? (
                      <p className={`text-sm font-medium ${stats.statusColor}`}>
                        예산 {stats.status} 상태
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-yellow-500">
                        예산 미설정 상태
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  variant={budgetStatus.hasBudget ? "outline" : "primary"}
                  onClick={() => setShowSetBudget(true)}
                >
                  {budgetStatus.hasBudget ? "예산 수정" : "예산 설정"}
                </Button>
              </div>

              {budgetStatus.hasBudget ? (
                <>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">예산</p>
                      <p className="font-bold text-2xl">
                        {animatedBudget.toLocaleString()}원
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">지출</p>
                      <p className="font-bold text-2xl">
                        {animatedSpent.toLocaleString()}원
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">남은 금액</p>
                      <p
                        className={`font-bold text-2xl ${budgetStatus.remaining < 0 ? "text-red-500" : ""}`}
                      >
                        {animatedRemaining.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">예산 사용률</p>
                      <p className="text-sm font-medium">
                        {stats.usageRate.toFixed(0)}%
                      </p>
                    </div>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: stats.barColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.usageRateDisplay}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">지출 패턴</h3>
                      <p className="text-sm text-gray-500">
                        {stats.isOverBudget
                          ? "예산을 초과했습니다. 지출을 줄이거나 예산을 조정해 보세요."
                          : stats.isNearLimit
                            ? "예산의 80% 이상을 사용했습니다. 지출에 주의하세요."
                            : "예산 내에서 지출이 이루어지고 있습니다. 잘 하고 계세요!"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">
                        일일 허용 금액
                      </h3>
                      <p className="text-xl font-bold text-blockie-green">
                        {budgetStatus.remaining > 0
                          ? Math.floor(
                              budgetStatus.remaining /
                                (new Date(
                                  budgetStatus.year,
                                  budgetStatus.month,
                                  0
                                ).getDate() -
                                  now.getDate() +
                                  1)
                            ).toLocaleString()
                          : 0}
                        원
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        남은{" "}
                        {new Date(
                          budgetStatus.year,
                          budgetStatus.month,
                          0
                        ).getDate() -
                          now.getDate() +
                          1}
                        일 기준
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">
                      예산이 설정되지 않았습니다
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      월간 예산을 설정하여 효율적인 지출 관리를 시작해 보세요.
                    </p>

                    {budgetStatus.spent > 0 && (
                      <div className="mt-4 bg-white rounded-lg p-4">
                        <p className="text-yellow-800 font-medium">
                          현재까지 지출 금액
                        </p>
                        <p className="text-yellow-800 text-2xl font-bold mt-1">
                          {budgetStatus.spent.toLocaleString()}원
                        </p>
                        <button
                          className="mt-4 text-sm text-blockie-blue cursor-pointer hover:underline focus:outline-none"
                          onClick={() => setBudgetAdvisor(true)}
                        >
                          내게 맞는 예산 추천받기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-lg font-medium mb-4">지출 카테고리</h3>
              {expenseCategories.length > 0 ? (
                <>
                  <div className="h-60 mb-4">
                    <Doughnut
                      data={doughnutData}
                      options={DoughnutOptionsAnimation}
                    />
                  </div>
                  <div className="space-y-2">
                    {expenseCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {category.amount.toLocaleString()}원
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>카테고리 데이터가 없습니다</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
        {/* 예산 내역 탭 */}
        {activeTab === "history" && (
          <motion.div
            key="history"
            custom={direction}
            // variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-6">월별 예산 내역</h2>

              <div className="h-80 mb-6">
                <Bar data={barData} options={BarOptionsAnimation} />
              </div>

              {budgetHistory.length > 0 ? (
                <div className="space-y-4">
                  {budgetHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">
                          {item.year}년 {getMonthName(item.month)}
                        </h3>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${item.remaining < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                        >
                          {item.remaining < 0 ? "예산 초과" : "예산 내 지출"}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-2 text-sm">
                        <div>
                          <p className="text-gray-500">예산</p>
                          <p className="font-medium">
                            {item.budget.toLocaleString()}원
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">지출</p>
                          <p className="font-medium">
                            {item.spent.toLocaleString()}원
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">잔액</p>
                          <p
                            className={`font-medium ${item.remaining < 0 ? "text-red-500" : ""}`}
                          >
                            {item.remaining.toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${(item.spent / item.budget) * 100 > 90 ? "bg-red-500" : "bg-blockie-green"}`}
                            style={{
                              width: `${Math.min((item.spent / item.budget) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-right text-xs mt-1">
                          {((item.spent / item.budget) * 100).toFixed(0)}% 사용
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>과거 예산 내역이 없습니다</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
        {/* 지출 분석 탭 */}
        {activeTab === "insights" && (
          <motion.div
            key="insights"
            custom={direction}
            variants={BudgetPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card>
              <h3 className="text-lg font-medium mb-4">지출 추세 분석</h3>
              <div className="h-64 mb-4">
                <Line
                  data={{
                    labels: budgetHistory
                      .map((item) => `${item.month}월`)
                      .reverse(),
                    datasets: [
                      {
                        label: "월별 지출 추이",
                        data: budgetHistory.map((item) => item.spent).reverse(),
                        borderColor: "#7DC0F4", // blockie-blue
                        backgroundColor: "rgba(125, 192, 244, 0.1)",
                        tension: 0.3,
                        fill: true,
                      },
                    ],
                  }}
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
                          callback: function (value) {
                            return value.toLocaleString() + "원";
                          },
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>

              {budgetHistory.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700 mb-1">평균 월 지출</p>
                      <p className="text-xl font-bold">
                        {(
                          budgetHistory.reduce(
                            (acc, item) => acc + item.spent,
                            0
                          ) / budgetHistory.length
                        ).toLocaleString()}
                        원
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-purple-700 mb-1">
                        예산 준수율
                      </p>
                      <p className="text-xl font-bold">
                        {(
                          (budgetHistory.filter(
                            (item) => item.spent <= item.budget
                          ).length /
                            budgetHistory.length) *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">
                      지출 트렌드 분석
                    </h4>
                    <p className="text-sm text-gray-600">
                      {budgetHistory[0]?.spent &&
                      budgetHistory[1]?.spent &&
                      budgetHistory[0]?.spent > budgetHistory[1].spent
                        ? "지난 달보다 지출이 증가했습니다. 예산 관리에 더 신경써보세요."
                        : "지난 달보다 지출이 감소했습니다. 좋은 추세를 유지하세요!"}
                    </p>
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

            <Card>
              <h3 className="text-lg font-medium mb-4">카테고리별 지출 추이</h3>
              {expenseCategories.length > 0 ? (
                <>
                  <div className="h-64 mb-4">
                    <Radar
                      data={{
                        labels: expenseCategories.map((cat) => cat.name),
                        datasets: [
                          {
                            label: "이번 달",
                            data: expenseCategories.map((cat) => cat.amount),
                            backgroundColor: "rgba(244, 223, 125, 0.2)", // blockie-yellow
                            borderColor: "#F4DF7D",
                            pointBackgroundColor: "#F4DF7D",
                          },
                          {
                            label: "지난 달",
                            data: expenseCategories.map(
                              (cat) => cat.amount * 0.9
                            ), // Mock 지난 달 데이터
                            backgroundColor: "rgba(125, 192, 244, 0.2)", // blockie-blue
                            borderColor: "#7DC0F4",
                            pointBackgroundColor: "#7DC0F4",
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          r: {
                            angleLines: {
                              display: true,
                              color: "rgba(0, 0, 0, 0.05)",
                            },
                            grid: {
                              color: "rgba(0, 0, 0, 0.05)",
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">주요 증감 카테고리</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="bg-green-50 rounded-lg p-3 flex items-center">
                        <div className="w-2 h-8 bg-green-400 rounded-full mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">
                            가장 많이 절약한 카테고리
                          </p>
                          <p className="text-sm text-green-700">쇼핑 (-12%)</p>
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3 flex items-center">
                        <div className="w-2 h-8 bg-red-400 rounded-full mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">
                            가장 많이 증가한 카테고리
                          </p>
                          <p className="text-sm text-red-700">식비 (+8%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p>카테고리 분석 데이터가 없습니다</p>
                </div>
              )}
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">예산 최적화 제안</h3>

              <div className="bg-blockie-yellow bg-opacity-10 rounded-lg p-4 mb-4">
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
                    <h4 className="text-sm font-medium text-blockie-yellow">
                      맞춤 예산 추천
                    </h4>
                    <p className="text-sm mt-1">
                      지난 몇 개월간의 지출 패턴을 분석한 결과, 귀하에게
                      최적화된 월 예산은
                      <span className="font-bold">
                        {" "}
                        {(
                          (budgetHistory.reduce(
                            (acc, item) => acc + item.spent,
                            0
                          ) /
                            budgetHistory.length) *
                          1.1
                        )
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                      입니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">
                    카테고리별 예산 추천
                  </h4>
                  <div className="space-y-2">
                    {expenseCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">
                          {(category.amount * 1.1)
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">절약 팁</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>
                        식비: 집에서 식사를 준비하면 외식 비용의 약 50%를 절약할
                        수 있습니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>
                        쇼핑: 필요한 물건은 세일 기간에 구매하여 약 20% 절약
                        가능합니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>
                        교통: 대중교통 정기권을 활용하면 최대 30%까지 교통비를
                        줄일 수 있습니다.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewBudget(
                      (
                        (budgetHistory.reduce(
                          (acc, item) => acc + item.spent,
                          0
                        ) /
                          budgetHistory.length) *
                        1.1
                      ).toFixed(0)
                    );
                    setShowSetBudget(true);
                  }}
                >
                  추천 예산으로 설정하기
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 예산 설정 모달 */}
      <AnimatePresence>
        {showSetBudget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSetBudget(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">
                {budgetStatus?.year}년 {budgetStatus?.month}월 예산 설정
              </h2>

              {budgetStatus && budgetStatus.spent > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    현재 지출 금액:{" "}
                    <span className="font-medium">
                      {budgetStatus.spent.toLocaleString()}원
                    </span>
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  예산 금액
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                    placeholder="금액을 입력하세요"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    aria-label="예산 금액 입력"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500">원</span>
                  </div>
                </div>
              </div>

              {/* 예산 제안 */}
              {budgetAdvisor && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">
                    추천 예산 금액
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setNewBudget(advisedBudget.toString())}
                    >
                      {advisedBudget.toLocaleString()}원
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNewBudget((advisedBudget * 1.2).toString())
                      }
                    >
                      {(advisedBudget * 1.2).toLocaleString()}원
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNewBudget((advisedBudget * 0.8).toString())
                      }
                    >
                      {(advisedBudget * 0.8).toLocaleString()}원
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    * 현재 지출 패턴 및 일반적인 예산 관리 원칙을 기반으로
                    제안됩니다.
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowSetBudget(false);
                    setBudgetAdvisor(false);
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSetBudget}
                  disabled={!newBudget || parseInt(newBudget, 10) <= 0}
                >
                  저장
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>효율적인 예산 관리로 건강한 재정 상태를 유지하세요.</p>
        <p className="mt-1">© 2025 Blockie - 모든 권리 보유</p>
      </footer>
    </div>
  );
}
