import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StockInfo } from "./types";
import { formatCurrency } from "./utils";

interface StockListProps {
  stocksData: StockInfo[];
  selectedStock: StockInfo | null;
  onStockSelect: (stock: StockInfo) => void;
  onRunSimulation: () => void;
}

export const StockList: React.FC<StockListProps> = ({
  stocksData,
  selectedStock,
  onStockSelect,
  onRunSimulation,
}) => {
  if (stocksData.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          구매 가능한 주식
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stocksData.map((stock) => (
            <motion.div
              key={stock.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStockSelect(stock)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedStock?.code === stock.code
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{stock.name}</h3>
                <span className="text-xs text-gray-500">{stock.code}</span>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">
                {formatCurrency(stock.currentPrice)}
              </div>
              <div
                className={`text-sm mb-2 ${
                  stock.change >= 0 ? "text-red-600" : "text-blue-600"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {formatCurrency(stock.change)}(
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent}%)
              </div>
              <div className="text-sm text-gray-600">
                구매 가능:{" "}
                <span className="font-medium">{stock.purchasableShares}주</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onRunSimulation}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            투자 시뮬레이션 실행
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
