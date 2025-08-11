export type ExpenseCategory = {
  name: string;
  amount: number;
  color: string;
};

export interface ExpenseCategoryItem {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface ExpenseCategorySummary {
  totalAmount: number;
  totalCount: number;
  categories: ExpenseCategoryItem[];
}
// 개별 지출 항목
export interface ExpenseItem {
  id: string;
  amount: number;
  category: string;
  userId: string;
  createdAt: string; // ISO string
  expenseDate: string; // ISO string
}

export interface DeleteExpenseItem {
  id: ExpenseItem["id"];
}

export interface UpsertExpenseItem {
  id: ExpenseItem["id"];
  data: Pick<ExpenseItem, "amount" | "category" | "expenseDate">;
}

// 전체 응답 구조
export interface ExpenseItemListResponse {
  total: number;
  expenses: ExpenseItem[];
}

export interface StreakInfoResponse {
  currentStreak: number;
  maxStreak: number;
  daysToNextReward: number;
  nextRewardTarget: number;
  lastRecordDate: string; // ISO 날짜 문자열
  streakStartDate: string | null; // null 가능
  totalRecordDays: number;
  hasRecordToday: boolean;
  streakLevel: "bronze" | "silver" | "gold" | "platinum"; // 필요한 경우 enum으로도 가능
}
export interface DataPoint {
  period: string;
  amount: number;
  count: number;
  averageAmount: number;
  year: number;
  periodNumber: number;
}

export interface getAnalysisProps {
  months?: string;
  period?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
}

export interface SpendingAnalysisResponse {
  dataPoints: DataPoint[];
  periodType: string; // e.g., "weekly"
  totalPeriods: number;
  averageSpending: number;
  overallTrend: string; // e.g., "increasing", "decreasing"
  overallChangePercentage: number;
  maxSpending: number;
  minSpending: number;
  maxSpendingPeriod: string;
  minSpendingPeriod: string;
  volatility: number;
  volatilityCoefficient: number;
  volatilityLevel: string; // e.g., "high", "medium", "low"
  categoryTrends: any[]; // If you know the structure, replace `any` with a proper type
  predictedNextPeriod: number;
  predictionConfidence: number;
  insights: string[];
  recommendations: string[];
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}
export interface WeeklyBarChartDataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
}
