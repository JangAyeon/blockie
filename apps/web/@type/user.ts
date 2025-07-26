export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: string; // ISO string
}

export interface RecentExpense {
  id: string;
  amount: number;
  category: string;
  expenseDate: string; // ISO string
  createdAt: string; // ISO string
}
