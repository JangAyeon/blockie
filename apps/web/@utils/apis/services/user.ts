import { User, RecentExpense } from "@type/user";

import { BudgetHistoryResponse } from "@type/budget";
import { ApiRoute } from "@constant/api.route";
import { apiClient } from "@utils/apis/api.client";

export const userService = {
  // 내 프로필 조회 "/users/me"
  getMyProfile: () => apiClient.get<User>(`${ApiRoute.users.ME}`),

  // 프로필 업데이트 "/users/me"
  updateMyProfile: (data: Pick<User, "name" | "email" | "phone">) =>
    apiClient.patch<User>(`${ApiRoute.users.ME}`, data),

  // 예산 히스토리 조회 (마이페이지용) "/budget/history"
  getBudgetHistory: (months = 6) =>
    apiClient.get<BudgetHistoryResponse>(`${ApiRoute.budget.GET_HISTORY}`, {
      months,
    }),

  // 최근 지출 조회 (전체 지출에서 최근 몇 개만) "/expenses"
  getRecentExpenses: () =>
    apiClient.get<RecentExpense[]>(`${ApiRoute.expenses.BASE}`),
};
