import { YearMonthNumeric, YearMonthProps } from "./date";

// 예산 상태 타입 정의
export interface BudgetStatus extends YearMonthNumeric {
  hasBudget: boolean;
  budget: number;
  spent: number;
  remaining: number;
}

// 월별 예산 내역 타입 정의
export interface BudgetHistory extends YearMonthNumeric {
  budget: number;
  spent: number;
  remaining: number;
}

export interface BudgetSummary extends YearMonthProps {
  hasBudget: boolean;
  budget: number;
  spent: number;
  remaining: number;
  usagePercentage: number;
  daysInMonth: number;
  daysPassed: number;
  daysRemaining: number;
  dailyAverageSpent: number;
  recommendedDailySpending: number;
  isOverBudget: boolean;
  warningLevel: "safe" | "caution" | "danger";
  expenseCount: number;
  maxSingleExpense: number;
  minSingleExpense: number;
  spendingTrend: "up" | "down" | "stable";
  trendPercentage: number;
  topSpendingCategory: string | null;
  topSpendingAmount: number;
}

export interface BudgetHistoryItem extends YearMonthNumeric {
  hasBudget: boolean;
  budget: number;
  spent: number;
  remaining: number;
  usagePercentage: number | null;
  status: "success" | "warning" | "danger" | "none";
}

export interface BudgetHistoryResponse {
  history: BudgetHistoryItem[];
  totalMonths: number;
  monthsWithBudget: number;
  averageMonthlySpending: number;
  averageMonthlyBudget: number;
  budgetComplianceRate: number;
}

export interface MonthlyBudget extends YearMonthNumeric {
  amount: number;
}
