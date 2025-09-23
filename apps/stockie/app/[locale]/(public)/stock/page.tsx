"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { SavingsInput } from "./saving.input";
import { useStockData } from "./useStockData";
import { StockList } from "./stock.list";
import { StockInfo, TradeViewPeriod, TradeViewMinute } from "./types";
import { useTradeViewData } from "./useTradeViewData";
import { useSimulation } from "./useSimulation";
import { StockTradeView } from "./stock.tradeview";
import { SimulationResults } from "./stimulation.result";

const InvestmentSimulator: React.FC = () => {
  const [savingsAmount, setSavingsAmount] = useState<string>("1000000");
  const [selectedStock, setSelectedStock] = useState<StockInfo | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<
    TradeViewPeriod | TradeViewMinute
  >("Y");
  const [dateRange, setDateRange] = useState({
    from: new Date("2000-01-01"),
    to: new Date(),
  });
  const PeriodItems: { period: TradeViewPeriod; content: string }[] = [
    { period: "D", content: "일" },
    { period: "W", content: "주" },
    { period: "M", content: "월" },
    { period: "Y", content: "년" },
  ];
  const MinuteItems: { period: TradeViewMinute; content: string }[] = [
    { period: 1, content: "1분" },
    { period: 5, content: "5분" },
    { period: 15, content: "15분" },
    { period: 60, content: "60분" },
  ];
  const { stocksData, loading, error, accessToken, loadStockData } =
    useStockData();
  const [mostPastDate, setMostPastDate] = useState(new Date());
  const { tradeViewData, volumeData, loadTradeViewData } = useTradeViewData();
  const { simulationResults, runSimulation } = useSimulation();
  const handleLoadData = () => {
    loadStockData(savingsAmount);
  };
  const handleStockSelect = (stock: StockInfo) => {
    setSelectedStock(stock);
    if (accessToken) {
      loadTradeViewData(accessToken, stock.code, mostPastDate, selectedPeriod);
    }
  };

  const handleStockPeriod = (period: TradeViewPeriod | TradeViewMinute) => {
    setSelectedPeriod(period);
    if (accessToken && selectedStock) {
      loadTradeViewData(accessToken, selectedStock.code, mostPastDate, period);
    }
  };

  const handleRunSimulation = () => {
    if (savingsAmount && stocksData.length > 0) {
      runSimulation(savingsAmount, stocksData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          절약 금액 투자 시뮬레이터
        </h1>
        <p className="text-gray-600">
          오늘 아낀 돈으로 어떤 투자 기회를 만들 수 있는지 확인해보세요
        </p>
      </motion.div>

      <SavingsInput
        savingsAmount={savingsAmount}
        setSavingsAmount={setSavingsAmount}
        onLoadData={handleLoadData}
        loading={loading}
        error={error}
      />
      <StockList
        stocksData={stocksData}
        selectedStock={selectedStock}
        onStockSelect={handleStockSelect}
        onRunSimulation={handleRunSimulation}
      />
      <div className="flex flex-row gap-5 bg-white p-3">
        {PeriodItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleStockPeriod(item.period)}
            className={`${selectedPeriod === item.period ? "bg-red-400" : "bg-transparent"}`}
          >
            {item.content}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-5 bg-white p-3">
        {MinuteItems.map((item, idx) => (
          <button
            className={`${selectedPeriod === item.period ? "bg-red-400" : "bg-transperent"}`}
            key={idx}
            onClick={() => handleStockPeriod(item.period)}
          >
            {item.content}
          </button>
        ))}
      </div>
      <StockTradeView
        selectedStock={selectedStock}
        tradeViewData={tradeViewData}
        volumeData={volumeData}
      />
      {/* <SimulationResults simulationResults={simulationResults} /> */}
    </div>
  );
};

export default InvestmentSimulator;
