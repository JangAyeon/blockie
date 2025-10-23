"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExpenseCube from "../../@component/ExpenseCube";
import { toYMDWithString } from "../../@utils/date/YMD";

export default function ExpenseCubePage() {
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
    <div className="p-6">
      <h1 className="mb-4 font-bold text-lg">색칠형 예산 시각화</h1>

      {hasDate && <ExpenseCube year={year} month={month} day={day} />}
    </div>
  );
}
