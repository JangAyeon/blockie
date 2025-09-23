export interface StockInfo {
  code: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  purchasableShares: number;
  historicalGrowth?: number;
}

export interface SimulationResult {
  stock: StockInfo;
  fiveYearValue: number;
  monthlyInvestmentValue: number;
  totalReturn: number;
  annualizedReturn: number;
}

export type TradeViewPeriod = "D" | "W" | "M" | "Y";

export type TradeViewMinute = 1 | 5 | 15 | 60;
