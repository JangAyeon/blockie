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
  // user: {
  //   base: [QUERY_KEYS.USER, QUERY_KEYS.ME] as const,
  //   detail: (id: string) => [...queryKeys.user.base, "detail", id] as const, // 안 쓰는 거
  // },
  user: {
    base: ["user"] as const,
    profile: () => [...queryKeys.user.base, "profile"] as const,
    budgetHistory: (months?: number) =>
      [...queryKeys.user.base, "budget-history", { months }] as const,
    recentExpenses: () => [...queryKeys.user.base, "recent-expenses"] as const,
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
