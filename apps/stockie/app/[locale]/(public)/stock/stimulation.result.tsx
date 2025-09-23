import React from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { SimulationResult } from "./types";
import { formatCurrency } from "./utils";

interface SimulationResultsProps {
  simulationResults: SimulationResult[];
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({
  simulationResults,
}) => {
  if (simulationResults.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          투자 시뮬레이션 결과
        </h2>
        <div className="space-y-4">
          {simulationResults.map((result) => (
            <div key={result.stock.code} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">
                {result.stock.name} ({result.stock.code})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">5년 전 일시불 투자</div>
                  <div className="font-bold text-lg text-green-600">
                    {formatCurrency(result.fiveYearValue)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">매월 적립 투자</div>
                  <div className="font-bold text-lg text-blue-600">
                    {formatCurrency(result.monthlyInvestmentValue)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">총 수익</div>
                  <div
                    className={`font-bold text-lg ${
                      result.totalReturn >= 0 ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {formatCurrency(result.totalReturn)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">연평균 수익률</div>
                  <div
                    className={`font-bold text-lg ${
                      result.annualizedReturn >= 0
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {result.annualizedReturn.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            이 시뮬레이션은 과거 데이터를 기반으로 한 가상의 계산입니다. 실제
            투자 수익을 보장하지 않으며, 투자 시에는 신중한 판단이 필요합니다.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
