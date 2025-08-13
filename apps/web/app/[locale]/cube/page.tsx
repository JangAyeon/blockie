"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCube } from "@hook/business/cube/useCube";
import { MyPageLoading } from "@component/features/user";
import MonthlyBudget from "@component/features/cube/monthly.budget";
import InsightExpense from "@component/features/cube/insight.expense";
import BlockExpense from "@component/features/cube/block.monthly.expense";
import ListMonthlyExpense from "@component/features/cube/list.monthly.expense";
import { toYMDWithString } from "@utils/date/YMD";
import StreakCard from "@component/features/cube/streak.expense";
import { MIN_BUDGET_BLOCK } from "@constant/budget";
import EmptyBlockExpense from "@component/features/cube/empty/block.monthly.expnese";
import EmptyMonthlyExpense from "@component/features/cube/empty/list.monthly.expense";
import EmptyMonthlyBudget from "@component/features/cube/empty/monthly.budget.expense";
import { pageUrl } from "@constant/page.route";

export default function ExpenseCubePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;
  const {
    budgetQuery: { data: budgetStatus },
    expenseCategoryQuery: { data: expenseCategory },
    expensesQuery: { data: expenses },
    streakQuery: { data: streak },
    isLoading,
    hasError,
    errors,
    isSuccess,
  } = useCube(
    hasDate ? { year, month, day } : { year: "", month: "", day: "" }
  );

  console.log("expenseCategory", expenseCategory);
  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(`${pageUrl.cube}?year=${year}&month=${month}&day=${day}`);
    }
  }, [router, searchParams, hasDate]);
  if (isLoading || hasError || !hasDate) return <MyPageLoading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {" "}
        <main className="p-6 space-y-6">
          {/* 연속 기록 배지 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <StreakCard streak={streak!} />
          </div>

          {/* 예산 카드 */}
          {budgetStatus!.hasBudget ? (
            <MonthlyBudget budgetStatus={budgetStatus!} />
          ) : (
            <EmptyMonthlyBudget />
          )}

          {/* 블록 컬렉션 */}
          {expenses!.expenses.length > 0 && budgetStatus!.hasBudget ? (
            <BlockExpense
              expensesInfo={expenses?.expenses!}
              categoryInfo={expenseCategory?.categories!}
              totalBlocks={budgetStatus?.spent! / MIN_BUDGET_BLOCK}
              maxBlocks={Math.floor(budgetStatus?.budget! / MIN_BUDGET_BLOCK)}
            />
          ) : (
            <EmptyBlockExpense
              hasBudget={budgetStatus?.hasBudget!}
              maxBlocks={Math.floor(budgetStatus?.budget! / MIN_BUDGET_BLOCK)}
            />
          )}

          {/* 인사이트 카드 */}
          <InsightExpense
            budgetStatus={budgetStatus!}
            expenseCategory={expenseCategory!}
          />

          {/* 최근 지출 목록 */}
          {expenses!.expenses.length > 0 ? (
            <ListMonthlyExpense expensesInfo={expenses?.expenses!} />
          ) : (
            <EmptyMonthlyExpense />
          )}
        </main>
      </main>
    </div>
  );
}
