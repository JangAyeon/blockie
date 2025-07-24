// 예산 상태 타입 정의
export interface BudgetStatus {
  year: number;
  month: number;
  hasBudget: boolean;
  budget: number;
  spent: number;
  remaining: number;
}

// 월별 예산 내역 타입 정의
export interface BudgetHistory {
  year: number;
  month: number;
  budget: number;
  spent: number;
  remaining: number;
}
