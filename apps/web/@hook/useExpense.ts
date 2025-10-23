import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createExpense,
  deleteExpense,
  fetchExpenseStatus,
  getExpense,
  updateExpense,
} from "../@utils/apis/expense";

export type ExpensePeriodProps = "daily" | "weekly" | "monthly";
export type UpsertExpenseInput = {
  amount: number;
  category: string;
  year: string;
  month: string;
  day: string;
};

export function useExpensesStatus(
  type: ExpensePeriodProps,
  year: string,
  month: string,
  day: string
) {
  return useQuery({
    queryKey: [`expenses`, type, year, month, day],
    queryFn: () => fetchExpenseStatus(year, month, day, type, ""),
  });
}

// 📌 지출 통계 조회
export function useExpenses(
  type: ExpensePeriodProps,
  year: string,
  month: string,
  day: string
) {
  return useQuery({
    queryKey: [`expenses`, type, year, month, day],
    queryFn: () => getExpense({ access_token: "" }),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, category, year, month, day }: UpsertExpenseInput) =>
      createExpense({ year, month, day, category, amount, access_token: "" }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpsertExpenseInput }) => {
      const { year, month, day, amount, category } = data;
      return updateExpense({
        id,
        year,
        month,
        day,
        amount,
        category,
        access_token: "",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      deleteExpense({
        id,
        access_token: "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
