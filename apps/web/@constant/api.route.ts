export const ApiRoute = {
  users: {
    BASE: "/users",
    ME: "/users/me",
  },
  auth: {
    BASE: "/auth",
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    SIGN_OUT: "/auth/signout",
  },
  budget: {
    BASE: "/budget",
    GET_STATUS: "/budget/status",
    UPDATE: "/budget",
    GET_HISTORY: "/budget/history",
  },
  expenses: {
    BASE: "/expenses",
    GET_CATEGORY_STATUS: "/expenses/stats/category",
    GET_MONTHLY_STATUS: "/expenses/stats/monthly",
    GET_STREAK: "/expenses/stats/streak",
    GET_ANALYSIS: "/expenses/analysis",
  },
} as const;

export const ApiMethod = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  delete: "DELETE",
} as const;
