import { BudgetHistoryResponse } from "@type/budget";

export const useUserEmotion = (budgetHistory?: BudgetHistoryResponse) => {
  if (!budgetHistory?.history.length) return "neutral" as const;

  const latestMonth = budgetHistory.history[0];

  if (latestMonth?.status === "danger") return "sad" as const;
  if (latestMonth?.status === "warning") return "neutral" as const;
  return "happy" as const;
};
