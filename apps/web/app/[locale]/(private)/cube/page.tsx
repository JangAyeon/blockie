"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@i18n/navigation";
import { useEffect } from "react";

import { useCube } from "@hook/business/cube/useCube";

import { toYMDWithString } from "@utils/date/YMD";

import { pageUrl } from "@constant/page.route";
import StreakContainer from "@component/features/cube/streak/container";
import BudgetContainer from "@component/features/cube/budget/container";
import BlockContainer from "@component/features/cube/block/contianer";
import InsightContainer from "@component/features/cube/insight/container";
import ExpenseContainer from "@component/features/cube/expense/container";
import ErrorCard from "@component/common/error.card";
import FullLoader from "@component/features/budget/loading/FullLoader";

export interface CubeContainerProps {
  dateInfo: {
    year: string;
    month: string;
    day: string;
  };
}

export default function CubeContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;
  const { isFullPageLoading, hasError, errors, isSuccess } = useCube(
    hasDate ? { year, month, day } : { year: "", month: "", day: "" }
  );

  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(`${pageUrl.cube}?year=${year}&month=${month}&day=${day}`);
    }
  }, [router, searchParams, hasDate]);
  if (isFullPageLoading || !hasDate) return <FullLoader />;
  else if (hasError) return <ErrorCard errors={errors} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-1 py-8">
        {" "}
        <main className="py-6 px-1 space-y-6">
          {/* 연속 기록 배지 */}
          <StreakContainer dateInfo={{ year, month, day }} />

          {/* 예산 카드 */}
          <BudgetContainer dateInfo={{ year, month, day }} />

          {/* 블록 컬렉션 */}
          <BlockContainer dateInfo={{ year, month, day }} />

          {/* 인사이트 카드 */}
          <InsightContainer dateInfo={{ year, month, day }} />

          {/* 최근 지출 목록 */}
          <ExpenseContainer dateInfo={{ year, month, day }} />
        </main>
      </main>
    </div>
  );
}
