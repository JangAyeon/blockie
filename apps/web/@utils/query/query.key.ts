import { AuthUser, SupabaseSignUpRequest } from "@repo/types";
// import { fetchMe, updateMe } from "../apis/user";
import { signIn, signOut, signUp } from "../apis/auth";

export enum QUERY_KEYS {
  USER = "USER",
  ME = "ME",
  DETAIL = "DETAIL",
  AUTH = "AUTH",
}

export const queryKeys = {
  auth: {
    base: [QUERY_KEYS.AUTH] as const,
  },

  user: {
    base: ["user"] as const,
    profile: () => [...queryKeys.user.base, "profile"] as const,
    budgetHistory: (months?: number) =>
      [...queryKeys.user.base, "budget-history", { months }] as const,
    recentExpenses: () => [...queryKeys.user.base, "recent-expenses"] as const,
  },
  budget: {
    base: ["budget"] as const,
    status: ({ month, year }: { month: string; year: string }) =>
      [...queryKeys.budget.base, "budget-status", { month, year }] as const,
    budgetHistory: (months?: number) =>
      [...queryKeys.budget.base, "budget-history", { months }] as const,
  },
  expense: {
    base: ["expense"] as const,
    category: ({ month, year }: { month: string; year: string }) =>
      [...queryKeys.expense.base, "expense-category", { month, year }] as const,
  },
};
export const queryFns = {
  // user: {
  //   // getMe: fetchMe as () => Promise<AuthUser>,
  //   // updateMe: updateMe as (
  //   //   data: Pick<AuthUser, "name" | "email" | "phone">
  //   // ) => Promise<AuthUser>,
  // },
  auth: {
    signOut: signOut as () => Promise<void>,
    signUp: signUp as (data: SupabaseSignUpRequest) => Promise<void>,
  },
};
