import { useState } from "react";
import { getKISToken, getCurrentPrice } from "./fetch-api";
import { StockInfo } from "./types";

const WATCHLIST_STOCKS = [
  { code: "005930", name: "삼성전자" },
  { code: "000660", name: "SK하이닉스" },
  { code: "035420", name: "NAVER" },
  { code: "005380", name: "현대차" },
  { code: "035720", name: "카카오" },
];

export const useStockData = () => {
  const [stocksData, setStocksData] = useState<StockInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const loadStockData = async (savingsAmount: string) => {
    try {
      setLoading(true);
      setError("");

      const token = await getKISToken();
      setAccessToken(token);

      const stockPromises = WATCHLIST_STOCKS.map(async (stock) => {
        try {
          const priceData = await getCurrentPrice(token, stock.code);
          const currentPrice = parseInt(priceData.output.stck_prpr);
          const change = parseInt(priceData.output.prdy_vrss);
          const changePercent = parseFloat(priceData.output.prdy_ctrt);

          const amount = parseInt(savingsAmount) || 0;
          const purchasableShares = Math.floor(amount / currentPrice);
          const response = {
            code: stock.code,
            name: stock.name,
            currentPrice,
            change,
            changePercent,
            purchasableShares,
          };
          console.log("### load stock data", response);
          return response;
        } catch (err) {
          console.error(`${stock.name} 데이터 로딩 실패:`, err);
          return null;
        }
      });

      const results = await Promise.all(stockPromises);
      const validStocks = results.filter(
        (stock): stock is StockInfo => stock !== null
      );
      setStocksData(validStocks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "데이터 로딩 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    stocksData,
    loading,
    error,
    accessToken,
    loadStockData,
  };
};
