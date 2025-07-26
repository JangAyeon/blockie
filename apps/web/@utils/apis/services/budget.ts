import {
  BudgetHistoryResponse,
  BudgetSummary,
  MonthlyBudget,
} from "@type/budget";
import { apiClient } from "../api.client";

export const budgetService = {
  // 내 현황 조회
  getBudgetStatus: ({ month, year }: { month: string; year: string }) =>
    apiClient.get<BudgetSummary>("/budget/status", { year, month }),

  // 예산 업데이트
  updateBudget: (data: MonthlyBudget) => apiClient.post<void>("/budget", data),

  // 예산 히스토리 조회 (CubePage용)
  getBudgetHistory: (months = 6) =>
    apiClient.get<BudgetHistoryResponse>("/budget/history", { months }),
};
