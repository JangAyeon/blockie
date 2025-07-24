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
import useBudgetTab from "@hook/business/budget/useBudgetTab";

import useAnimatedFrame from "@hook/business/budget/useAnimationFrame";
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

interface Achievement {
  title: string;
  description: string;
  earned: boolean;
  icon: string;
  date?: string;
  progress?: number;
}
const SavingsAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      title: "절약 달인",
      description: "이번 달 목표 대비 15% 절약",
      earned: true,
      icon: "🏆",
      date: "2025-07-15",
    },
    {
      title: "예산 킬러",
      description: "3개월 연속 예산 내 지출",
      earned: true,
      icon: "🎯",
      date: "2025-07-01",
    },
    {
      title: "외식 절약왕",
      description: "외식비 50% 절약하기",
      earned: false,
      icon: "🍽️",
      progress: 78,
    },
  ];

  const totalSaved: number = 127000;
  const monthlyGoal: number = 150000;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6 text-gray-800">절약 성과</h3>

      {/* 이번 달 절약 현황 */}
      <div className="mb-6 p-5 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl border border-emerald-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            이번 달 절약 금액
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            {totalSaved.toLocaleString()}원
          </span>
        </div>
        <div className="relative h-3 bg-white/60 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(totalSaved / monthlyGoal) * 100}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          목표까지 {(monthlyGoal - totalSaved).toLocaleString()}원 남음
        </p>
      </div>

      {/* 달성 배지 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-4">달성 배지</h4>
        {achievements.map((achievement: Achievement, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              achievement.earned
                ? "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span
                  className={`text-2xl transition-all duration-300 ${
                    achievement.earned ? "scale-110" : "grayscale opacity-60"
                  }`}
                >
                  {achievement.icon}
                </span>
                <div>
                  <h5
                    className={`font-medium ${
                      achievement.earned ? "text-amber-800" : "text-gray-500"
                    }`}
                  >
                    {achievement.title}
                  </h5>
                  <p
                    className={`text-xs ${
                      achievement.earned ? "text-amber-600" : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {achievement.earned ? (
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
                    {achievement.date}
                  </span>
                ) : (
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium">
                      {achievement.progress}%
                    </span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 다음 도전 과제 */}
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800 mb-3">
          다음 도전 과제
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">🚗 교통비 절약 챌린지</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
              +5,000원
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">📱 구독 서비스 정리</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
              +15,000원
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Mock 데이터 - 예산이 설정되지 않은 상태로 시작
const MOCK_CURRENT_BUDGET: BudgetStatus = {
  year: 2025,
  month: 7, // 7월
  hasBudget: true, // 예산이 설정되지 않음
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
  // const doughnutData = {
  //   labels: expenseCategories.map((cat) => cat.name),
  //   datasets: [
  //     {
  //       data: expenseCategories.map((cat) => cat.amount),
  //       backgroundColor: expenseCategories.map((cat) => cat.color),
  //       borderColor: expenseCategories.map(() => "#ffffff"),
  //       borderWidth: 2,
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

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
    <div className="max-w-5xl mx-auto p-4 md:p-6">
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
            aria-label="예산 분석 탭"
          >
            예산 분석
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* 현재 예산 탭 */}

        {activeTab === "current" && budgetStatus && (
          <motion.div
            key="current"
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <Card className="lg:col-span-2 relative overflow-hidden">
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
                          emotion={stats.emotion as Emotion}
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
                          {stats.emotion === "happy"
                            ? "😊"
                            : stats.emotion === "sad"
                              ? "😞"
                              : "😐"}
                        </span>
                      </motion.div>
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        {budgetStatus.year}년 {getMonthName(budgetStatus.month)}
                      </h2>
                      {budgetStatus.hasBudget ? (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`text-sm font-semibold ${stats.statusColor} flex items-center bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border`}
                        >
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-current mr-2"
                          ></motion.span>
                          예산 {stats.status} 상태
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm font-semibold text-amber-600 flex items-center bg-amber-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-200"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-current mr-2"
                          ></motion.span>
                          예산 미설정 상태
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant={budgetStatus.hasBudget ? "outline" : "primary"}
                      onClick={() => setShowSetBudget(true)}
                      className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      {budgetStatus.hasBudget ? (
                        <>
                          <span className="mr-2">✏️</span>
                          예산 수정
                        </>
                      ) : (
                        <>
                          <span className="mr-2">💰</span>
                          예산 설정
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>

                {budgetStatus.hasBudget ? (
                  <>
                    {/* 예산 통계 카드들 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      {[
                        {
                          label: "예산",
                          value: animatedBudget,
                          color: "from-blue-500 to-blue-600",
                          bgGradient: "from-blue-50 to-indigo-50",
                          borderColor: "border-blue-100",
                          icon: "🎯",
                        },
                        {
                          label: "지출",
                          value: animatedSpent,
                          color: "from-purple-500 to-purple-600",
                          bgGradient: "from-purple-50 to-pink-50",
                          borderColor: "border-purple-100",
                          icon: "💸",
                        },
                        {
                          label: "남은 금액",
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
                              {item.value.toLocaleString()}원
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
                            예산 사용률
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800 mb-1">
                            {stats.usageRate.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {budgetStatus.budget > 0
                              ? `${((budgetStatus.spent / budgetStatus.budget) * 100).toFixed(1)}%`
                              : "0%"}{" "}
                            소비됨
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            className={`h-full rounded-full ${stats.barColor} relative overflow-hidden`}
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.usageRateDisplay}%` }}
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
                        {stats.usageRateDisplay > 0 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.2, type: "spring" }}
                            className="absolute top-0 h-6 w-0.5 bg-gray-600 rounded-full"
                            style={{
                              left: `${Math.min(stats.usageRateDisplay, 98)}%`,
                            }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {stats.usageRate.toFixed(0)}%
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
                            지출 패턴 분석
                          </h3>
                        </div>
                        <div className="flex items-start">
                          <div
                            className={`w-4 h-4 rounded-full mt-1 mr-3 ${
                              stats.isOverBudget
                                ? "bg-red-500"
                                : stats.isNearLimit
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                          ></div>
                          <p className="text-gray-600 leading-relaxed">
                            {stats.isOverBudget
                              ? "⚠️ 예산을 초과했습니다. 지출을 줄이거나 예산을 조정해 보세요."
                              : stats.isNearLimit
                                ? "⚡ 예산의 80% 이상을 사용했습니다. 지출에 주의하세요."
                                : "✅ 예산 내에서 지출이 이루어지고 있습니다. 잘 하고 계세요!"}
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
                              일일 허용 금액
                            </h3>
                          </div>
                          <motion.p
                            key={budgetStatus.remaining}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2"
                          >
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
                          </motion.p>
                          <p className="text-xs text-emerald-600 font-medium bg-emerald-100/50 px-2 py-1 rounded-full inline-block">
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
                          예산이 설정되지 않았습니다
                        </h3>
                        <p className="text-amber-700 mb-8 leading-relaxed text-lg">
                          월간 예산을 설정하여 효율적인 지출 관리를 시작해
                          보세요.
                        </p>

                        {budgetStatus.spent > 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg"
                          >
                            <div className="flex items-center justify-center mb-3">
                              <span className="text-2xl mr-2">💰</span>
                              <p className="text-amber-800 font-semibold">
                                현재까지 지출 금액
                              </p>
                            </div>
                            <p className="text-amber-800 text-3xl font-bold mb-4">
                              {budgetStatus.spent.toLocaleString()}원
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
                              onClick={() => setBudgetAdvisor(true)}
                            >
                              <span className="mr-2">🎯</span>
                              내게 맞는 예산 추천받기
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>

            <SavingsAchievements />
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
