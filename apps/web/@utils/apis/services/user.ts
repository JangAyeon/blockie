import { User, BudgetHistoryResponse, RecentExpense } from "@type/user";
import { apiClient } from "../api.client";

export const userService = {
  // 내 프로필 조회
  getMyProfile: () => apiClient.get<User>("/users/me"),

  // 프로필 업데이트
  updateMyProfile: (data: Pick<User, "name" | "email" | "phone">) =>
    apiClient.patch<User>("/users/me", data),

  // 예산 히스토리 조회 (마이페이지용)
  getBudgetHistory: (months = 6) =>
    apiClient.get<BudgetHistoryResponse>("/budget/history", { months }),

  // 최근 지출 조회 (전체 지출에서 최근 몇 개만)
  getRecentExpenses: () => apiClient.get<RecentExpense[]>("/expenses"),
};
