"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenseStatus } from "../@utils/apis/expense";
import { useMonthlyBudget } from "../@hook/useBudget";

type ExpenseCubeProps = {
  year: string;
  month: string;
  day: string;
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: 4,
    maxWidth: 400,
    userSelect: "none" as const,
  },
  cell: {
    position: "relative" as const,
    height: 32,
    width: 32,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
  },
  fill: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#2563eb",
  },
};

export default function ExpenseCube({ year, month, day }: ExpenseCubeProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["expense-monthly", year, month, day],
    queryFn: () => fetchExpenseStatus(year, month, day, "monthly", ""),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: budget,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = useMonthlyBudget(+year, +month);

  const totalBudget = budget?.budget ?? 0;
  const spent = data?.total ?? 0;
  const totalCells = Math.ceil(totalBudget / 10000); // 1만원 단위 칸 수

  const [selected, setSelected] = useState(spent);

  useEffect(() => {
    setSelected(spent);
  }, [spent]);

  const handleSelect = (newAmount: number) => {
    setSelected(newAmount);
    console.log("선택한 금액:", newAmount);
  };

  if (isLoading || isBudgetLoading) return <div>로딩중...</div>;
  if (isError || isBudgetError || !data || !budget)
    return <div>데이터 오류</div>;

  return (
    <div>
      <div style={styles.gridContainer} aria-label="예산 색칠 그리드">
        {[...Array(totalCells)].map((_, i) => {
          const cellStart = i * 10000;
          const cellEnd = (i + 1) * 10000;
          const fillAmount = Math.max(
            0,
            Math.min(1, (selected - cellStart) / 10000)
          ); // 0~1 사이 비율

          return (
            <motion.div
              key={i}
              style={styles.cell}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect((i + 1) * 10000)}
            >
              <div
                style={{
                  ...styles.fill,
                  width: `${fillAmount * 100}%`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <p style={{ marginTop: 16 }}>현재 지출: {spent.toLocaleString()}원</p>
      <p>잔여 예산: {budget.remaining.toLocaleString()}원</p>
    </div>
  );
}
