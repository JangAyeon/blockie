export const MIN_BUDGET_BLOCK = 10000;
export const BUDGET_ITEM_COUNT = 5;
export const BudgetPageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    // transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
    opacity: 0,
    // transition: { duration: 0.2 },
  }),
};

export const DoughnutOptionsAnimation = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
  cutout: "70%",
  maintainAspectRatio: false,
};

export const BUDGET_TAB_MENU = {
  CURRENT: "CURRENT",
  HISTORY: "HISTORY",
  INSIGHTS: "INSIGHTS",
} as const;

// 예산 추천 배율 상수들
export const BUDGET_MULTIPLIERS = {
  RECOMMENDED: 1.2,
  CONSERVATIVE: 1.5,
  AGGRESSIVE: 0.8,
} as const;
