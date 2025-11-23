import {
  BudgetHistoryResponse,
  BudgetSummary,
  MonthlyBudget,
} from "@type/budget";
import { apiClient } from "@utils/apis/api.client";
import { YearMonthProps } from "@type/date";
import { ApiRoute } from "@constant/api.route";

export const budgetService = {
  // 내 현황 조회 /budget/status
  getBudgetStatus: ({ month, year }: YearMonthProps) =>
    apiClient.get<BudgetSummary>(`${ApiRoute.budget.GET_STATUS}`, {
      year,
      month,
    }),

  // 예산 업데이트 /budget
  updateBudget: (data: MonthlyBudget) =>
    apiClient.post<void>(`${ApiRoute.budget.UPDATE}`, data),

  // 예산 히스토리 조회 /budget/history
  getBudgetHistory: (months = 6) =>
    apiClient.get<BudgetHistoryResponse>(`${ApiRoute.budget.GET_HISTORY}`, {
      months,
    }),
};
