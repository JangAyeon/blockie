"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMonthlyBudget, useUpsertBudget } from "../@hook/useBudget";

const MIN_BUDGET = 10000;

export default function BudgetManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // year, month 가져오기 (없으면 기본값은 오늘 기준)
  const today = new Date();
  const year = parseInt(
    searchParams.get("year") ?? today.getFullYear().toString()
  );
  const month = parseInt(
    searchParams.get("month") ?? (today.getMonth() + 1).toString()
  );

  // 예산 상태 조회
  const { data, isLoading, isError } = useMonthlyBudget(year, month);

  // 로컬 상태로 form 데이터 관리 (수정용)
  const [formBudget, setFormBudget] = useState<string>(
    data?.budget.toString() ?? ""
  );

  // 예산 수정 뮤테이션
  const mutation = useUpsertBudget(year, month);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormBudget(Number(e.target.value));
  // };

  const handleSave = () => {
    console.log();
    const value = Number(formBudget);
    if (formBudget === undefined || isNaN(value)) {
      alert("올바른 예산 금액을 입력하세요.");
      return;
    } else if (value < MIN_BUDGET) {
      alert("최소한 만원 이상을 입력하세요.");
    }
    mutation.mutate(value);
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`?year=${e.target.value}&month=${month}`);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`?year=${year}&month=${e.target.value}`);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    console.log(e.target.value, value);
    setFormBudget(value);
  };

  useEffect(() => {
    if (!data?.budget) {
      setFormBudget("");
    } else {
      setFormBudget(data.budget.toString());
    }
  }, [data?.budget, year, month]);
  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">예산 관리</h2>

      {/* 🔽 년/월 선택 */}
      <div className="flex gap-2 mb-4">
        <select
          value={year}
          onChange={handleYearChange}
          className="border px-3 py-2 rounded"
        >
          {[2022, 2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
        <select
          value={month}
          onChange={handleMonthChange}
          className="border px-3 py-2 rounded"
        >
          {Array.from({ length: 12 }, (_, idx) => idx + 1).map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 예산 입력 폼 */}
      <div className="mb-4">
        <label className="block mb-1">예산 금액 (원):</label>
        <input
          value={formBudget}
          onChange={handleBudgetChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* 📈 예산 통계 */}

      {data.hasBudget && (
        <div className="mb-4 text-sm text-gray-700">
          <p>잔여 예산: {data.remaining.toLocaleString()}원</p>
          <p>소비 금액: {data.spent.toLocaleString()}원</p>
        </div>
      )}

      {/* 💾 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending
          ? "저장중..."
          : data.hasBudget
            ? "예산 수정하기 !!"
            : "예산 설정하기"}
      </button>
    </div>
  );
}
