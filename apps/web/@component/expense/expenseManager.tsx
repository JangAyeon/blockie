// 전체 컨테이너, 날짜 필터 포함

"use client";

import React, { useState } from "react";
import { ExpenseForm } from "./expenseForm";
import { ExpensePeriodProps } from "../../@hook/useExpense";
import { ExpenseList } from "./expenseList";

export default function ExpenseManager() {
  const [filterType, setFilterType] = useState<ExpensePeriodProps>("monthly");
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  ); // YYYY-MM-DD

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border rounded px-3 py-1"
        >
          <option value="daily">일간</option>
          <option value="weekly">주간</option>
          <option value="monthly">월간</option>
        </select>
      </div>

      <ExpenseForm selectedDate={selectedDate} />
      <ExpenseList selectedDate={selectedDate} filterType={filterType} />
    </div>
  );
}
