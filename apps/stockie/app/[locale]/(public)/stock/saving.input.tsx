import React from "react";
import { motion } from "framer-motion";

interface SavingsInputProps {
  savingsAmount: string;
  setSavingsAmount: (amount: string) => void;
  onLoadData: () => void;
  loading: boolean;
  error: string;
}

export const SavingsInput: React.FC<SavingsInputProps> = ({
  savingsAmount,
  setSavingsAmount,
  onLoadData,
  loading,
  error,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 shadow-lg border"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            오늘 절약한 금액
          </label>
          <div className="relative">
            <input
              type="number"
              value={savingsAmount}
              onChange={(e) => setSavingsAmount(e.target.value)}
              placeholder="예: 5000"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute right-3 top-3 text-gray-500">원</span>
          </div>
        </div>
        <button
          onClick={onLoadData}
          disabled={!savingsAmount || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "조회중..." : "투자 기회 확인"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
    </motion.div>
  );
};
