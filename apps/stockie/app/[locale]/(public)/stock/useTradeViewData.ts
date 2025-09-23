import { useState } from "react";
import { CandlestickData, HistogramData } from "lightweight-charts";
import { getTradeChart } from "./fetch-api";
import { toTimestamp } from "./utils";
import { TradeViewPeriod, TradeViewMinute } from "./types";

export const useTradeViewData = () => {
  const [tradeViewData, setTradeviewData] = useState<CandlestickData[] | null>(
    null
  );
  const [volumeData, setVolumeData] = useState<HistogramData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTradeViewData = async (
    accessToken: string,
    stockCode: string,
    endDate: Date,
    selectedPeriod: TradeViewPeriod | TradeViewMinute
  ) => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const chartData = await getTradeChart(
        accessToken,
        stockCode,
        endDate,
        selectedPeriod
      );

      // output2 배열을 역순으로 정렬 (최신 데이터가 마지막에 오도록)
      const sortedData = [...chartData.output2].sort((a, b) =>
        a.stck_bsop_date.localeCompare(b.stck_bsop_date)
      );

      const candlestickData: CandlestickData[] = sortedData.map((item) => ({
        time: toTimestamp(item.stck_bsop_date),
        open: parseFloat(item.stck_oprc),
        high: parseFloat(item.stck_hgpr),
        low: parseFloat(item.stck_lwpr),
        close: parseFloat(item.stck_clpr),
      }));

      const volumeChartData: HistogramData[] = sortedData.map((item) => {
        const open = parseFloat(item.stck_oprc);
        const close = parseFloat(item.stck_clpr);
        return {
          time: toTimestamp(item.stck_bsop_date),
          value: parseInt(item.acml_vol),
          color: close >= open ? "#ef4444" : "#3b82f6",
        };
      });

      setTradeviewData(candlestickData);
      setVolumeData(volumeChartData);
    } catch (err) {
      console.error("차트 데이터 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    tradeViewData,
    volumeData,
    loading,
    loadTradeViewData,
  };
};
