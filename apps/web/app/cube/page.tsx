"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import ExpenseCube from "../../@component/ExpenseCube";
import { toYMDWithString } from "../../@utils/date/YMD";
import { BlockieFace } from "@repo/ui";

interface UserData {
  name: string;
  monthlyBudget: number;
  totalSpent: number;
  totalBlocks: number;
  streak: number;
  expenses: Expense[];
  categoryBlocks: CategoryBlock[];
}

interface Expense {
  id: number;
  category: string;
  icon: string;
  name: string;
  amount: number;
  date: string;
  timestamp?: number;
}

interface CategoryBlock {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getCategoryColor = (
  categoryId: string,
  categories: CategoryBlock[]
): string => {
  return categories.find((cat) => cat.id === categoryId)?.color ?? "#9CA3AF";
};

const useExpenseData = () => {
  const [userData] = useState<UserData>({
    name: "김블로키",
    monthlyBudget: 500000,
    totalSpent: 320000,
    totalBlocks: 32,
    streak: 7,
    expenses: [
      {
        id: 1,
        category: "food",
        icon: "🍔",
        name: "점심 식사",
        amount: 15000,
        date: "오늘 12:30",
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
      },
      {
        id: 2,
        category: "transportation",
        icon: "🚗",
        name: "택시",
        amount: 12000,
        date: "오늘 09:15",
        timestamp: Date.now() - 5 * 60 * 60 * 1000,
      },
      {
        id: 3,
        category: "shopping",
        icon: "🛍️",
        name: "신발 구매",
        amount: 89000,
        date: "어제",
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
      },
      {
        id: 4,
        category: "entertainment",
        icon: "🎮",
        name: "영화 관람",
        amount: 15000,
        date: "2일 전",
        timestamp: Date.now() - 48 * 60 * 60 * 1000,
      },
      {
        id: 5,
        category: "food",
        icon: "🍔",
        name: "저녁 식사",
        amount: 25000,
        date: "3일 전",
        timestamp: Date.now() - 72 * 60 * 60 * 1000,
      },
    ],
    categoryBlocks: [
      { id: "food", name: "식비", icon: "🍔", color: "#F4DF7D", count: 12 },
      {
        id: "transportation",
        name: "교통",
        icon: "🚗",
        color: "#7DC0F4",
        count: 8,
      },
      { id: "shopping", name: "쇼핑", icon: "🛍️", color: "#F48DAE", count: 7 },
      {
        id: "entertainment",
        name: "엔터",
        icon: "🎮",
        color: "#C89DF4",
        count: 5,
      },
    ],
  });

  // 메모이제이션된 계산값들
  const analytics = useMemo(() => {
    const usageRate = (userData.totalSpent / userData.monthlyBudget) * 100;
    const remainingBudget = userData.monthlyBudget - userData.totalSpent;
    const daysLeft =
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate() - new Date().getDate();
    const dailyBudget =
      remainingBudget > 0 ? Math.floor(remainingBudget / daysLeft) : 0;

    const categoryAnalytics = userData.categoryBlocks.reduce(
      (acc, category) => {
        const categoryExpenses = userData.expenses.filter(
          (exp) => exp.category === category.id
        );
        const totalAmount = categoryExpenses.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );
        const avgAmount =
          categoryExpenses.length > 0
            ? totalAmount / categoryExpenses.length
            : 0;

        acc[category.id] = {
          totalAmount,
          avgAmount,
          expenseCount: categoryExpenses.length,
          percentage: (totalAmount / userData.totalSpent) * 100,
        };
        return acc;
      },
      {} as Record<string, any>
    );

    const emotion: "happy" | "neutral" | "sad" =
      usageRate > 90 ? "sad" : usageRate > 70 ? "neutral" : "happy";

    return {
      usageRate,
      remainingBudget,
      dailyBudget,
      daysLeft,
      emotion,
      categoryAnalytics,
      topCategory: Object.entries(categoryAnalytics).sort(
        ([, a], [, b]) => b.totalAmount - a.totalAmount
      )[0]?.[0],
    };
  }, [userData]);

  return { userData, analytics };
};

// 블록 컬렉션 컴포넌트
const BlockCollection = memo<{
  categoryBlocks: CategoryBlock[];
  totalBlocks: number;
  maxBlocks: number;
}>(({ categoryBlocks, totalBlocks, maxBlocks }) => {
  const blocks = useMemo(() => {
    return categoryBlocks.flatMap((category) =>
      Array.from({ length: category.count }, (_, i) => ({
        id: `${category.id}-${i}`,
        color: category.color,
        categoryId: category.id,
      }))
    );
  }, [categoryBlocks]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">
            이번 달 블록 컬렉션
          </h2>
          <div className="flex flex-row gap-2">
            {/* 남은 공간 표시 */}
            <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
              남은 공간: {maxBlocks - totalBlocks}칸
            </div>
            <div className="text-sm px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              {totalBlocks}/{maxBlocks} 블록
            </div>
          </div>
        </div>

        <div className="h-48 relative mb-4 bg-gray-50/50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
          {/* 그리드 배경 */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 블록들 */}
          <div className="absolute inset-4 flex flex-wrap content-start gap-1">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="w-8 h-8 rounded-sm shadow-sm transform transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer hover:z-10 relative"
                style={{
                  backgroundColor: block.color,
                  animationDelay: `${index * 50}ms`,
                }}
                title={`${categoryBlocks.find((c) => c.id === block.categoryId)?.name} 블록`}
              />
            ))}
          </div>
        </div>

        {/* 범례 */}
        <div className="flex justify-center flex-wrap gap-4">
          {categoryBlocks.map((category) => (
            <div
              key={category.id}
              className="flex items-center group cursor-pointer"
            >
              <div
                className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                {category.name} ({category.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

BlockCollection.displayName = "BlockCollection";
const ProgressBar = memo<{
  value: number;
  max: number;
  className?: string;
  showAnimation?: boolean;
}>(({ value, max, className = "", showAnimation = true }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClass = useMemo(() => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 70) return "bg-yellow-500";
    return "bg-green-500";
  }, [percentage]);

  return (
    <div className={`relative ${className}`}>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative ${colorClass} ${
            showAnimation ? "animate-pulse" : ""
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
      <div className="flex justify-between text-sm mt-2 text-gray-600">
        <span>사용: {formatCurrency(value)}</span>
        <span className="font-semibold">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
export default function ExpenseCubePage() {
  const { userData, analytics } = useExpenseData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;

  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(`/cube?year=${year}&month=${month}&day=${day}`);
    }
  }, [router, searchParams, hasDate]);
  return (
    // <div className="p-6">
    //   <h1 className="mb-4 font-bold text-lg">색칠형 예산 시각화</h1>

    //   {hasDate && <ExpenseCube year={year} month={month} day={day} />}
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {" "}
        <main className="p-6 space-y-6">
          {/* 연속 기록 배지 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center relative z-10">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-yellow-400 to-orange-400 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {userData.streak}일 연속 기록 중!
                </h3>
                <p className="text-sm text-gray-600">
                  꾸준히 기록하면 특별한 보상이 기다려요
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">다음 보상까지</div>
                <div className="text-sm font-bold text-yellow-600">
                  {7 - (userData.streak % 7)}일
                </div>
              </div>
            </div>
          </div>

          {/* 예산 카드 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full translate-y-12 -translate-x-12 blur-xl" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <BlockieFace size={48} emotion={analytics.emotion} />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      이번 달 컬렉션 공간
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {formatCurrency(userData.monthlyBudget)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">남은 공간</div>
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(analytics.remainingBudget)}
                  </div>
                  <div className="text-xs text-gray-500">
                    일 평균 {formatCurrency(analytics.dailyBudget)}
                  </div>
                </div>
              </div>

              <ProgressBar
                value={userData.totalSpent}
                max={userData.monthlyBudget}
                className="mb-4"
              />

              {/* 상태별 메시지 */}
              <div
                className={`p-3 rounded-lg text-sm ${
                  analytics.emotion === "sad"
                    ? "bg-red-50 text-red-700"
                    : analytics.emotion === "neutral"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-green-50 text-green-700"
                }`}
              >
                {analytics.emotion === "sad"
                  ? "⚠️ 예산 사용률이 높습니다. 지출을 줄여보세요!"
                  : analytics.emotion === "neutral"
                    ? "⚡ 예산의 70% 이상을 사용했습니다. 주의하세요!"
                    : "✅ 훌륭한 예산 관리를 하고 계시네요!"}
              </div>
            </div>
          </div>

          {/* 블록 컬렉션 */}
          <BlockCollection
            categoryBlocks={userData.categoryBlocks}
            totalBlocks={userData.totalBlocks}
            maxBlocks={Math.floor(userData.monthlyBudget / 10000)}
          />

          {/* 인사이트 카드 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10" />
            <div className="flex items-start relative z-10">
              <div className="mr-4 mt-1">
                <BlockieFace size={48} emotion={analytics.emotion} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-3">
                  💡 스마트 인사이트
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      가장 많이 지출한 카테고리
                    </span>
                    <span className="font-semibold text-gray-800">
                      {userData.categoryBlocks.find(
                        (c) => c.id === analytics.topCategory
                      )?.name || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      이번 달 평균 일일 지출
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(
                        Math.floor(userData.totalSpent / new Date().getDate())
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      예상 월말 지출
                    </span>
                    <span
                      className={`font-semibold ${
                        (userData.totalSpent / new Date().getDate()) * 31 >
                        userData.monthlyBudget
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {formatCurrency(
                        Math.floor(
                          (userData.totalSpent / new Date().getDate()) * 31
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 최근 지출 목록 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-800">최근 지출</h2>
              <button
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                onClick={() => console.log("전체 지출 내역 보기")}
              >
                전체보기
              </button>
            </div>

            <div className="space-y-3">
              {userData.expenses.slice(0, 3).map((expense, index) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `${getCategoryColor(expense.category, userData.categoryBlocks)}40`,
                      }}
                    >
                      <span className="text-xl">{expense.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                        {expense.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span className="mr-2">{expense.date}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                          {
                            userData.categoryBlocks.find(
                              (c) => c.id === expense.category
                            )?.name
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {formatCurrency(expense.amount)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {Math.ceil(expense.amount / 10000)} 블록
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200">
              <span className="text-sm font-medium">
                더 많은 지출 내역 보기
              </span>
            </button>
          </div>
        </main>
      </main>
    </div>
  );
}
