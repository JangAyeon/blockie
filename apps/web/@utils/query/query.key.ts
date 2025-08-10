import { SupabaseSignUpRequest } from "@repo/types";

import { YearMonthDayProps, YearMonthProps } from "@type/date";
import { getAnalysisProps } from "@type/expense";
import { signOut, signUp } from "@utils/apis/auth";

export enum QUERY_KEYS {
  USER = "USER",
  BUDGET = "BUDGET",
  EXPENSE = "EXPENSE",
  // ME = "ME",
  // DETAIL = "DETAIL",
  AUTH = "AUTH",
}

export enum USER_SUB_QUERY {
  PROFILE = "PROFILE",
  BUDGET_HISTORY = "BUDGET_HISTORY",
  RECENT_EXPENSES = "RECENT_EXPENSES",
}

export enum BUDGET_SUB_QUERY {
  STATUS = "STATUS",
  HISTORY = "HISTORY",
}

export enum EXPENSE_SUB_QUERY {
  CATEGORY = "CATEGORY",
  MONTHLY = "MONTHLY",
  STREAK = "STREAK",
}

export const queryKeys = {
  auth: {
    base: [QUERY_KEYS.AUTH] as const,
  },

  user: {
    base: [QUERY_KEYS.USER] as const,
    profile: () => [...queryKeys.user.base, USER_SUB_QUERY.PROFILE] as const,
    budgetHistory: (months?: number) =>
      [
        ...queryKeys.user.base,
        USER_SUB_QUERY.BUDGET_HISTORY,
        { months },
      ] as const,
    recentExpenses: () =>
      [...queryKeys.user.base, USER_SUB_QUERY.RECENT_EXPENSES] as const,
  },
  budget: {
    base: [QUERY_KEYS.BUDGET] as const,
    status: ({ month, year }: YearMonthProps) =>
      [
        ...queryKeys.budget.base,
        BUDGET_SUB_QUERY.STATUS,
        { month, year },
      ] as const,
    history: (months?: number) =>
      [
        ...queryKeys.budget.base,
        BUDGET_SUB_QUERY.HISTORY,
        ,
        { months },
      ] as const,
  },
  expense: {
    base: [QUERY_KEYS.EXPENSE] as const,
    category: ({ month, year }: YearMonthProps) =>
      [
        ...queryKeys.expense.base,
        EXPENSE_SUB_QUERY.CATEGORY,
        { month, year },
      ] as const,
    monthly: ({ month, year, day }: YearMonthDayProps) =>
      [
        ...queryKeys.expense.base,
        EXPENSE_SUB_QUERY.MONTHLY,
        { month, year, day },
      ] as const,
    streak: () =>
      [...queryKeys.expense.base, EXPENSE_SUB_QUERY.STREAK] as const,
    analysis: (params: getAnalysisProps) =>
      [...queryKeys.expense.base, ...Object.values(params)] as const,
  },
};
export const queryFns = {
  auth: {
    signOut: signOut as () => Promise<void>,
    signUp: signUp as (data: SupabaseSignUpRequest) => Promise<void>,
  },
};
