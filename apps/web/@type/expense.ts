export interface ExpenseRequest {
  year: string;
  month: string;
}

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
