"use client";
import React, { useState, useEffect } from "react";

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
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { BlockieFace, BlockieBottom } from "@repo/ui";

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  BarElement
);

// 내장 아이콘 컴포넌트들
const PlusIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const EditIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const TrashIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// 애니메이션 배리언트
const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    // transition: {
    //   duration: 0.3,
    //   ease: "easeOut",
    // },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    // transition: {
    //   duration: 0.3,
    //   ease: "easeIn",
    // },
  }),
};

// 더미 데이터
const initialExpenses = [
  {
    id: "1",
    amount: 45000,
    category: "식비",
    expenseDate: "2025-01-19T12:30:00Z",
    createdAt: "2025-01-19T12:35:00Z",
  },
  {
    id: "2",
    amount: 8500,
    category: "교통비",
    expenseDate: "2025-01-19T08:00:00Z",
    createdAt: "2025-01-19T08:05:00Z",
  },
  {
    id: "3",
    amount: 125000,
    category: "의료비",
    expenseDate: "2025-01-18T14:20:00Z",
    createdAt: "2025-01-18T14:25:00Z",
  },
  {
    id: "4",
    amount: 32000,
    category: "쇼핑",
    expenseDate: "2025-01-18T16:45:00Z",
    createdAt: "2025-01-18T16:50:00Z",
  },
  {
    id: "5",
    amount: 15000,
    category: "카페",
    expenseDate: "2025-01-17T10:15:00Z",
    createdAt: "2025-01-17T10:20:00Z",
  },
  {
    id: "6",
    amount: 89000,
    category: "생활용품",
    expenseDate: "2025-01-16T13:00:00Z",
    createdAt: "2025-01-16T13:05:00Z",
  },
];

// 카테고리별 색상 매핑 (Blockie 색상 팔레트 사용)
const categoryConfig: Record<
  string,
  { bg: string; color: string; text: string; border: string }
> = {
  식비: {
    color: "#F4DF7D",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  교통비: {
    color: "#7DC0F4",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  의료비: {
    color: "#F47D7D",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  쇼핑: {
    color: "#F48DAE",
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
  카페: {
    color: "#C89DF4",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  생활용품: {
    color: "#8DDBA4",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  기타: {
    color: "#9CA3AF",
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};

// 예산 데이터
const initialBudget = {
  year: 2025,
  month: 1,
  hasBudget: true,
  budget: 500000,
  spent: 315000,
  remaining: 185000,
};

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

// 커스텀 훅: 탭 변경 애니메이션
function useExpenseTab() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [direction, setDirection] = useState(0);

  const changeTab = (tab: string) => {
    const tabOrder: Record<string, number> = {
      overview: 0,
      list: 1,
      statistics: 2,
    };
    console.log(tabOrder[tab], tabOrder[activeTab]);
    if (tabOrder[tab] === undefined || tabOrder[activeTab] === undefined)
      return;
    setDirection(tabOrder[tab] - tabOrder[activeTab]);
    setActiveTab(tab);
  };

  return { activeTab, changeTab, direction };
}

function ExpenseManagementPage() {
  const [loading, setLoading] = useState(true);
  const { activeTab, changeTab, direction } = useExpenseTab();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [budget, setBudget] = useState(initialBudget);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<{
    id: string;
    amount: number;
    category: string;
    expenseDate: string;
    createdAt: string;
  } | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    expenseDate: new Date().toISOString().split("T")[0],
  });

  console.log(activeTab);
  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // 금액 포맷팅 함수
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  // 필터링된 지출 목록
  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      selectedCategory === "all" || expense.category === selectedCategory;

    if (selectedPeriod === "all") return categoryMatch;

    const expenseDate = new Date(expense.expenseDate);
    const now = new Date();

    switch (selectedPeriod) {
      case "today":
        return (
          categoryMatch && expenseDate.toDateString() === now.toDateString()
        );
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return categoryMatch && expenseDate >= weekAgo;
      case "month":
        return (
          categoryMatch &&
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      default:
        return categoryMatch;
    }
  });

  // 카테고리별 통계 계산
  const categoryStats = expenses.reduce(
    (stats: Record<string, { count: number; total: number }>, expense) => {
      const category = expense.category;
      if (!stats[category]) {
        stats[category] = { count: 0, total: 0 };
      }
      stats[category].count += 1;
      stats[category].total += expense.amount;
      return stats;
    },
    {}
  );

  // 총 지출 계산
  const totalSpent = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // 지출 추가 핸들러
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category) return;

    const expense = {
      id: Date.now().toString(),
      amount: parseInt(newExpense.amount),
      category: newExpense.category,
      expenseDate: new Date(
        newExpense.expenseDate + "T" + new Date().toTimeString().split(" ")[0]
      ).toISOString(),
      createdAt: new Date().toISOString(),
    };

    setExpenses([expense, ...expenses]);
    setBudget((prev) => ({
      ...prev,
      spent: prev.spent + expense.amount,
      remaining: prev.budget - (prev.spent + expense.amount),
    }));

    setNewExpense({
      amount: "",
      category: "",
      expenseDate: new Date().toISOString().split("T")[0],
    });
    setShowAddForm(false);
  };

  // 지출 삭제 핸들러
  const handleDeleteExpense = (expenseId: string) => {
    const expenseToDelete = expenses.find((e) => e.id === expenseId);
    if (expenseToDelete) {
      setExpenses(expenses.filter((e) => e.id !== expenseId));
      setBudget((prev) => ({
        ...prev,
        spent: prev.spent - expenseToDelete.amount,
        remaining: prev.budget - (prev.spent - expenseToDelete.amount),
      }));
    }
  };

  // 지출 수정 핸들러
  const handleEditExpense = (expense: {
    id: string;
    amount: number;
    category: string;
    expenseDate: string;
    createdAt: string;
  }) => {
    setEditingExpense({
      ...expense,
      expenseDate:
        new Date(expense.expenseDate).toISOString().split("T")[0] ?? "",
    });
  };

  const handleUpdateExpense = () => {
    if (!editingExpense || !editingExpense.amount || !editingExpense.category)
      return;

    const originalExpense = expenses.find((e) => e.id === editingExpense.id);
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? {
            ...expense,
            amount: parseInt(editingExpense.amount.toString()),
            category: editingExpense.category,
            expenseDate: new Date(
              editingExpense.expenseDate +
                "T" +
                new Date().toTimeString().split(" ")[0]
            ).toISOString(),
          }
        : expense
    );

    setExpenses(updatedExpenses);

    // 예산 업데이트
    const amountDiff =
      parseInt(`${editingExpense.amount}`) - (originalExpense?.amount || 0);
    setBudget((prev) => ({
      ...prev,
      spent: prev.spent + amountDiff,
      remaining: prev.budget - (prev.spent + amountDiff),
    }));

    setEditingExpense(null);
  };

  // 차트 데이터 준비
  const doughnutData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats).map((stat) => stat.total),
        backgroundColor: Object.keys(categoryStats).map(
          (category) => categoryConfig[category]?.color || "#9CA3AF"
        ),
        borderColor: Object.keys(categoryStats).map(() => "#ffffff"),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["이번 주", "지난 주", "2주 전", "3주 전"],
    datasets: [
      {
        label: "주간 지출",
        data: [120000, 95000, 110000, 85000], // Mock 데이터
        backgroundColor: "#8DDBA4",
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "월별 지출 추이",
        data: [280000, 320000, 290000, 350000, 310000, 315000], // Mock 데이터
        borderColor: "#7DC0F4",
        backgroundColor: "rgba(125, 192, 244, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <BlockieFace size={60} emotion="neutral" />
          <BlockieBottom size={60} />
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">
          지출 정보를 불러오는 중...
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
        <h1 className="text-3xl font-bold text-center">지출 관리</h1>
        <p className="text-center text-gray-500 mt-2">
          스마트한 지출 관리로 건강한 소비 습관을 만들어 보세요
        </p>
      </motion.div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center mb-8">
        <nav className="bg-white shadow-md rounded-full px-1 py-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-blockie-yellow text-neutral-black"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => changeTab("overview")}
          >
            지출 현황
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "list"
                ? "bg-blockie-yellow text-neutral-black"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => changeTab("list")}
          >
            지출 내역
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "statistics"
                ? "bg-blockie-yellow text-neutral-black"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => changeTab("statistics")}
          >
            통계 분석
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* 지출 현황 탭 */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <Card className="lg:col-span-2 relative overflow-hidden">
              {/* 장식적 배경 요소들 */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-100/40 to-teal-100/40 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>

              <div className="relative z-10">
                {/* 헤더 섹션 */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                  <div className="flex items-center mb-6 md:mb-0">
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
                            emotion={budget.remaining >= 0 ? "happy" : "sad"}
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
                        <span className="text-lg">
                          {budget.remaining >= 0 ? "✅" : "⚠️"}
                        </span>
                      </motion.div>
                    </div>

                    <div>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2"
                      >
                        {budget.year}년 {budget.month}월 지출
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center ${
                          budget.remaining >= 0
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-current mr-2"
                        ></motion.span>
                        {budget.remaining >= 0 ? "예산 내 지출" : "예산 초과"}
                      </motion.p>
                    </div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(true)}
                    className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <motion.div
                      animate={{ rotate: [0, 90, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <PlusIcon className="w-5 h-5" />
                    </motion.div>
                    지출 추가
                  </motion.button>
                </div>

                {/* 예산 통계 카드들 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      label: "예산",
                      value: budget.budget,
                      icon: "🎯",
                      gradient: "from-blue-500 to-indigo-600",
                      bgGradient: "from-blue-50 to-indigo-50",
                      borderColor: "border-blue-200",
                    },
                    {
                      label: "지출",
                      value: budget.spent,
                      icon: "💸",
                      gradient: "from-purple-500 to-pink-600",
                      bgGradient: "from-purple-50 to-pink-50",
                      borderColor: "border-purple-200",
                    },
                    {
                      label: "남은 금액",
                      value: budget.remaining,
                      icon: budget.remaining < 0 ? "🚨" : "💰",
                      gradient:
                        budget.remaining < 0
                          ? "from-red-500 to-red-600"
                          : "from-emerald-500 to-green-600",
                      bgGradient:
                        budget.remaining < 0
                          ? "from-red-50 to-red-50"
                          : "from-emerald-50 to-green-50",
                      borderColor:
                        budget.remaining < 0
                          ? "border-red-200"
                          : "border-emerald-200",
                    },
                  ].map((item, index) => (
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
                      className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 border ${item.borderColor} text-center group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}
                    >
                      {/* 카드 내부 장식 */}
                      <div className="absolute top-3 right-3 opacity-20 text-3xl">
                        {item.icon}
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-start mb-4">
                          <motion.span
                            className="text-2xl mr-3"
                            animate={{ rotateY: [0, 360] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {item.icon}
                          </motion.span>
                          <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-700 transition-colors">
                            {item.label}
                          </p>
                        </div>
                        <motion.p
                          key={item.value}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className={`font-bold text-2xl md:text-3xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                        >
                          {item.value.toLocaleString()}원
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
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📊</span>
                      <p className="text-lg font-semibold text-gray-700">
                        예산 사용률
                      </p>
                    </div>
                    <div className="text-right">
                      <motion.p
                        key={budget.spent}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-gray-800 mb-1"
                      >
                        {Math.round((budget.spent / budget.budget) * 100)}%
                      </motion.p>
                      <p className="text-xs text-gray-500">목표 대비 달성률</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className={`h-full rounded-full relative overflow-hidden ${
                          budget.spent / budget.budget > 1
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : budget.spent / budget.budget > 0.8
                              ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                              : "bg-gradient-to-r from-emerald-400 to-green-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min((budget.spent / budget.budget) * 100, 100)}%`,
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
                    {budget.spent > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute top-0 h-6 w-1 bg-gray-700 rounded-full"
                        style={{
                          left: `${Math.min((budget.spent / budget.budget) * 100, 98)}%`,
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                          {Math.round((budget.spent / budget.budget) * 100)}%
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* 하단 정보 카드들 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm"
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-2xl mr-3">📈</span>
                      <h3 className="text-lg font-semibold text-gray-700">
                        이번 달 요약
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          label: "총 지출 건수",
                          value: `${expenses.length}건`,
                          icon: "📝",
                          color: "text-blue-600",
                        },
                        {
                          label: "평균 지출",
                          value: `${Math.round(budget.spent / expenses.length).toLocaleString()}원`,
                          icon: "📊",
                          color: "text-purple-600",
                        },
                        {
                          label: "가장 많이 지출한 카테고리",
                          value:
                            Object.entries(categoryStats).sort(
                              (a, b) => b[1].total - a[1].total
                            )[0]?.[0] || "-",
                          icon: "🏆",
                          color: "text-emerald-600",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="flex justify-between items-center p-3 bg-white/60 rounded-xl border border-gray-100/50"
                        >
                          <div className="flex items-center">
                            <span className="text-lg mr-3">{item.icon}</span>
                            <span className="text-sm text-gray-600">
                              {item.label}
                            </span>
                          </div>
                          <span className={`font-semibold ${item.color}`}>
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50 relative overflow-hidden shadow-sm"
                  >
                    {/* 장식적 배경 */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 rounded-full -translate-y-12 translate-x-12"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <motion.span
                          className="text-2xl mr-3"
                          animate={{ rotateZ: [0, 10, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          📅
                        </motion.span>
                        <h3 className="text-lg font-semibold text-emerald-800">
                          일일 허용 금액
                        </h3>
                      </div>
                      <motion.p
                        key={budget.remaining}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-4xl font-bold text-emerald-600 mb-3"
                      >
                        {budget.remaining > 0
                          ? Math.floor(
                              budget.remaining / (31 - new Date().getDate() + 1)
                            ).toLocaleString()
                          : 0}
                        원
                      </motion.p>
                      <p className="text-sm text-emerald-600 font-medium bg-emerald-100/60 px-3 py-1.5 rounded-full inline-block">
                        남은 {31 - new Date().getDate() + 1}일 기준
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* 카테고리별 지출 카드 */}
            <Card className="relative overflow-hidden">
              {/* 장식적 배경 */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full -translate-y-16 -translate-x-16 blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-2xl mr-3"
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🍩
                  </motion.span>
                  <h3 className="text-xl font-semibold text-gray-800">
                    카테고리별 지출
                  </h3>
                </div>

                {Object.keys(categoryStats).length > 0 ? (
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
                          elements: {
                            arc: {
                              borderWidth: 3,
                              borderColor: "#ffffff",
                            },
                          },
                          animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 2000,
                          },
                        }}
                      />
                    </motion.div>

                    <div className="space-y-3">
                      {Object.entries(categoryStats).map(
                        ([category, stats], index) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl border border-gray-100/50 hover:bg-white/80 transition-all duration-200 group"
                          >
                            <div className="flex items-center">
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="w-4 h-4 rounded-full mr-3 shadow-sm"
                                style={{
                                  backgroundColor:
                                    categoryConfig[category]?.color ||
                                    "#9CA3AF",
                                }}
                              />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">
                                {category}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-800">
                                {stats.total.toLocaleString()}원
                              </div>
                              <div className="text-xs text-gray-500">
                                {((stats.total / budget.spent) * 100).toFixed(
                                  1
                                )}
                                %
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-60 text-gray-400"
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
                    <p className="text-lg font-medium">
                      카테고리 데이터가 없습니다
                    </p>
                    <p className="text-sm text-center mt-2">
                      지출을 추가하여
                      <br />
                      카테고리별 분석을 확인해보세요
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* 지출 내역 탭 */}
        {activeTab === "list" && (
          <motion.div
            key="list"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">지출 내역</h2>
                  <p className="text-gray-500">
                    총 {filteredExpenses.length}건의 지출
                  </p>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 md:mt-0 bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  지출 추가
                </button>
              </div>

              {/* 필터 섹션 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기간
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                  >
                    <option value="all">전체</option>
                    <option value="today">오늘</option>
                    <option value="week">최근 7일</option>
                    <option value="month">이번 달</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                  >
                    <option value="all">전체</option>
                    {Object.keys(categoryStats).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 지출 목록 */}
              <div className="space-y-4">
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="flex flex-col items-center mb-4">
                      <BlockieFace size={80} emotion="neutral" />
                      <BlockieBottom size={80} />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">
                      지출 내역이 없습니다
                    </h4>
                    <p className="text-gray-500">새로운 지출을 추가해보세요</p>
                  </div>
                ) : (
                  filteredExpenses.map((expense, index) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                categoryConfig[expense.category]?.bg ||
                                "bg-gray-50"
                              } ${
                                categoryConfig[expense.category]?.text ||
                                "text-gray-700"
                              } ${
                                categoryConfig[expense.category]?.border ||
                                "border-gray-200"
                              }`}
                            >
                              {expense.category}
                            </span>
                            <span className="text-xl font-bold text-neutral-black">
                              {formatAmount(expense.amount)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {formatDate(expense.expenseDate)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditExpense(expense)}
                            className="p-2 text-gray-400 hover:text-blockie-blue hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* 통계 분석 탭 */}
        {activeTab === "statistics" && (
          <motion.div
            key="statistics"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card>
              <h3 className="text-lg font-medium mb-4">주간 지출 추이</h3>
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
                  <p className="text-sm text-blue-700 mb-1">주간 평균</p>
                  <p className="text-xl font-bold">
                    {((120000 + 95000 + 110000 + 85000) / 4).toLocaleString()}원
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-1">이번 주</p>
                  <p className="text-xl font-bold">120,000원</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-medium mb-4">월별 지출 추이</h3>
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
                <h4 className="text-sm font-medium mb-2">지출 트렌드 분석</h4>
                <p className="text-sm text-gray-600">
                  지난 6개월 동안 평균적으로 안정적인 지출 패턴을 보이고
                  있습니다. 이번 달은 예산 범위 내에서 잘 관리되고 있습니다.
                </p>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">카테고리별 상세 분석</h3>

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
                      <span className="text-sm text-gray-500">
                        {stats.count}건
                      </span>
                    </div>
                    <p className="text-xl font-bold text-neutral-black mb-1">
                      {stats.total.toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-500">
                      평균{" "}
                      {Math.round(stats.total / stats.count).toLocaleString()}원
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
                      <p className="text-xs text-gray-500 mt-1 text-right">
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
                    <h4 className="text-sm font-medium text-blockie-yellow">
                      지출 패턴 분석
                    </h4>
                    <p className="text-sm mt-1">
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
        )}
      </AnimatePresence>

      {/* 지출 추가 모달 */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">새 지출 추가</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    금액
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                      placeholder="예: 15000"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">원</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, category: e.target.value })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="식비">식비</option>
                    <option value="교통비">교통비</option>
                    <option value="의료비">의료비</option>
                    <option value="쇼핑">쇼핑</option>
                    <option value="카페">카페</option>
                    <option value="생활용품">생활용품</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지출 날짜
                  </label>
                  <input
                    type="date"
                    value={newExpense.expenseDate}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        expenseDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleAddExpense}
                  disabled={!newExpense.amount || !newExpense.category}
                  className="flex-1 px-4 py-3 bg-blockie-yellow text-neutral-black rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  추가
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 지출 수정 모달 */}
      <AnimatePresence>
        {editingExpense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setEditingExpense(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">지출 수정</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    금액
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={editingExpense.amount}
                      onChange={(e) =>
                        setEditingExpense({
                          ...editingExpense,
                          amount: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                      placeholder="예: 15000"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">원</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={editingExpense.category}
                    onChange={(e) =>
                      setEditingExpense({
                        ...editingExpense,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="식비">식비</option>
                    <option value="교통비">교통비</option>
                    <option value="의료비">의료비</option>
                    <option value="쇼핑">쇼핑</option>
                    <option value="카페">카페</option>
                    <option value="생활용품">생활용품</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지출 날짜
                  </label>
                  <input
                    type="date"
                    value={editingExpense.expenseDate}
                    onChange={(e) =>
                      setEditingExpense({
                        ...editingExpense,
                        expenseDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setEditingExpense(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdateExpense}
                  disabled={!editingExpense.amount || !editingExpense.category}
                  className="flex-1 px-4 py-3 bg-blockie-blue text-white rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  수정
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>스마트한 지출 관리로 건강한 소비 습관을 만들어 보세요.</p>
        <p className="mt-1">© 2025 Blockie - 모든 권리 보유</p>
      </footer>
    </div>
  );
}

export default ExpenseManagementPage;
