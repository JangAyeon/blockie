import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createChart,
  CandlestickData,
  HistogramData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
  HistogramSeries,
  CrosshairMode,
} from "lightweight-charts";
import { StockInfo, TradeViewMinute, TradeViewPeriod } from "./types";

interface StockChartProps {
  selectedStock: StockInfo | null;
  tradeViewData: CandlestickData[] | null;
  volumeData: HistogramData[] | null;
}

export const StockTradeView: React.FC<StockChartProps> = ({
  selectedStock,
  tradeViewData,
  volumeData,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  // const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  // const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const candleSeriesRef = useRef<any>(null); // 캔들 데이터 참조
  const volumeSeriesRef = useRef<any>(null); // 거래량 데이터 참조

  // 차트 초기화
  useEffect(() => {
    if (
      !chartContainerRef.current ||
      chartRef.current ||
      !tradeViewData ||
      !volumeData
    )
      return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "white" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: {
        borderColor: "#cccccc",
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      },
      timeScale: {
        borderColor: "#cccccc",
        timeVisible: true,
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: false,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        allowBoldLabels: true,
        visible: true,
      },
      localization: {
        priceFormatter: (price: number) => {
          return new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
            minimumFractionDigits: 0,
          }).format(price);
        },
        timeFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          return date.toLocaleDateString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
      },
    });

    chartRef.current = chart;

    // 캔들스틱 시리즈
    const candlestStickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#ef4444",
      downColor: "#3b82f6",
      borderUpColor: "#ef4444",
      borderDownColor: "#3b82f6",
      wickUpColor: "#ef4444",
      wickDownColor: "#3b82f6",
    });

    candleSeriesRef.current = candlestStickSeries;
    // 거래량 시리즈
    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
      priceScaleId: "",
      priceFormat: { type: "volume" },
    });

    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    });
    candleSeriesRef.current.setData(tradeViewData);
    volumeSeriesRef.current.setData(volumeData);
    chartRef.current?.timeScale().fitContent();
    const handleTimeRangeChange = () => {
      const timeRange = chart.timeScale().getVisibleRange();

      if (
        timeRange &&
        timeRange.from <= candleSeriesRef.current?.data()[5]?.time
      ) {
        console.log("데이터 부족함");
      }
    };

    // 차트 확대/축소나 이동 시 실행되는 이벤트 리스너
    // chart.timeScale().subscribeVisibleTimeRangeChange(() => {
    //   const response = getVisibleTimeRange();

    //   if (response) {
    //     console.log("화면 구간이 변경되었습니다:", response.visibleRange);
    //   }
    //   logChange();
    // });
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(handleTimeRangeChange);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [tradeViewData, volumeData]);

  // 차트 데이터 업데이트
  // useEffect(() => {
  //   if (
  //     tradeViewData &&
  //     volumeData &&
  //     candleSeriesRef.current &&
  //     volumeSeriesRef.current
  //   ) {
  //     candleSeriesRef.current.setData(tradeViewData);
  //     volumeSeriesRef.current.setData(volumeData);
  //     chartRef.current?.timeScale().fitContent();

  //     // subscribeVisibleLogicalRangeChange
  //     chartRef.current
  //       ?.timeScale()
  //       .subscribeVisibleLogicalRangeChange(logChange);
  //     console.log(
  //       "stock Data",
  //       tradeViewData[0],
  //       chartRef.current?.timeScale().getVisibleRange()
  //     );
  //   }
  // }, [tradeViewData, volumeData]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedStock?.name || "주식"} 차트
          </h2>
        </div>
        <div
          ref={chartContainerRef}
          className="w-full h-[400px] border border-gray-200 rounded-lg"
        ></div>
      </motion.div>
    </AnimatePresence>
  );
};
