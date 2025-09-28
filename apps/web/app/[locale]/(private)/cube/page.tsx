"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@i18n/navigation";
import { useEffect } from "react";

import { useCube } from "@hook/business/cube/useCube";
import { MyPageLoading } from "@component/features/user";

import { toYMDWithString } from "@utils/date/YMD";

import { pageUrl } from "@constant/page.route";
import StreakContainer from "@component/features/cube/streak/container";
import BudgetContainer from "@component/features/cube/budget/container";
import BlockContainer from "@component/features/cube/block/contianer";
import InsightContainer from "@component/features/cube/insight/container";
import ExpenseContainer from "@component/features/cube/expense/container";

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

  // console.log("expenseCategory", expenseCategory);
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
          <StreakContainer streak={streak} dateInfo={{ year, month, day }} />

          {/* 예산 카드 */}
          <BudgetContainer budgetStatus={budgetStatus} />

          {/* 블록 컬렉션 */}
          <BlockContainer
            expenses={expenses}
            budgetStatus={budgetStatus}
            expenseCategory={expenseCategory}
          />

          {/* 인사이트 카드 */}
          <InsightContainer
            budgetStatus={budgetStatus!}
            expenseCategory={expenseCategory!}
          />

          {/* 최근 지출 목록 */}
          <ExpenseContainer expenses={expenses} />
        </main>
      </main>
    </div>
  );
}
