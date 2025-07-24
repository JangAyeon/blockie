export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: string; // ISO string
}

export interface BudgetHistoryItem {
  year: number;
  month: number;
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

export interface RecentExpense {
  id: string;
  amount: number;
  category: string;
  expenseDate: string; // ISO string
  createdAt: string; // ISO string
}
