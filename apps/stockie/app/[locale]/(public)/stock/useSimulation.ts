import { useState } from "react";
import { SimulationResult, StockInfo } from "./types";

export const useSimulation = () => {
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);

  const calculateSimulation = (
    stock: StockInfo,
    savingsAmount: string
  ): SimulationResult => {
    const amount = parseInt(savingsAmount) || 0;

    // 5년 전 가격 추정 (실제로는 과거 데이터 API 필요)
    const fiveYearAgoPrice = stock.currentPrice * 0.6; // 임시 추정값
    const fiveYearShares = Math.floor(amount / fiveYearAgoPrice);
    const fiveYearValue = fiveYearShares * stock.currentPrice;

    // 매월 투자 시뮬레이션 (5년 = 60개월)
    const monthlyAmount = amount;
    const monthsInFiveYears = 60;
    let totalShares = 0;
    let totalInvested = 0;

    for (let month = 0; month < monthsInFiveYears; month++) {
      // 월별 가격 변동 시뮬레이션 (실제로는 월봉 데이터 필요)
      const monthlyPrice =
        fiveYearAgoPrice * (1 + (month / monthsInFiveYears) * 0.67);
      const monthlyShares = monthlyAmount / monthlyPrice;
      totalShares += monthlyShares;
      totalInvested += monthlyAmount;
    }

    const monthlyInvestmentValue = totalShares * stock.currentPrice;
    const totalReturn = monthlyInvestmentValue - totalInvested;
    const annualizedReturn =
      Math.pow(monthlyInvestmentValue / totalInvested, 1 / 5) - 1;

    return {
      stock,
      fiveYearValue,
      monthlyInvestmentValue,
      totalReturn,
      annualizedReturn: annualizedReturn * 100,
    };
  };

  const runSimulation = (savingsAmount: string, stocksData: StockInfo[]) => {
    if (!savingsAmount || stocksData.length === 0) return;

    const results = stocksData.map((stock) =>
      calculateSimulation(stock, savingsAmount)
    );
    setSimulationResults(results);
  };

  return {
    simulationResults,
    runSimulation,
  };
};
