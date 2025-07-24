"use client";

import { useDeleteExpense } from "@hook/useExpense";

export function ExpenseItem({ expense }: { expense: any }) {
  const { mutate: remove } = useDeleteExpense();

  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <div>
        <p>
          💸 {expense.amount.toLocaleString()}원 · {expense.category}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(expense.expenseDate).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={() => remove(expense.id)}
        className="text-red-500 hover:underline text-sm"
      >
        삭제
      </button>
    </li>
  );
}
