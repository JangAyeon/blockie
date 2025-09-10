"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  createChart,
  CandlestickData,
  CandlestickSeries,
  HistogramData,
  LineSeries,
  HistogramSeries,
  LineData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
  ColorType,
  CrosshairMode,
} from "lightweight-charts";

// @repo/types에서 KIS 타입 import
import type {
  DailyChartPeriod,
  KISAccessTokenResponse,
  StockPriceResponse,
  StockDailyResponse,
  StockDailyOutput,
  StockTimeResponse,
  StockOrderCashOutput1,
  StockOrderCashOutput2,
} from "@repo/types";

// 차트 설정 타입
interface ChartConfig {
  stockCode: string;
  period: DailyChartPeriod;
  chartType: "candlestick" | "line";
  timeframe: "daily" | "intraday";
}

// 변환된 차트 데이터 타입
interface ConvertedChartData {
  candlestickData: CandlestickData[];
  lineData: LineData[];
  volumeData: HistogramData[];
}

// 가격 변동 정보 타입
interface PriceChangeInfo {
  current: number;
  change: number;
  changePercent: number;
  sign: string;
  isPositive: boolean;
  isNegative: boolean;
  isFlat: boolean;
}

const StockTradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  // 상태 관리
  const [config, setConfig] = useState<ChartConfig>({
    stockCode: "005930", // 삼성전자
    period: "D",
    chartType: "candlestick",
    timeframe: "daily",
  });

  const [dailyData, setDailyData] = useState<StockDailyResponse | null>(null);
  const [timeData, setTimeData] = useState<StockTimeResponse | null>(null);
  const [currentPrice, setCurrentPrice] = useState<StockPriceResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  // 한국 시간을 UTC 타임스탬프로 변환
  const toKSTTimestamp = useCallback(
    (date: string, time?: string): UTCTimestamp => {
      let dateStr: string;

      if (time) {
        // 분봉 데이터용 (YYYYMMDD + HHMMSS)
        dateStr = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}+09:00`;
      } else {
        // 일봉 데이터용 (YYYYMMDD)
        dateStr = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T09:00:00+09:00`;
      }

      const kst = new Date(dateStr);
      return Math.floor(kst.getTime() / 1000) as UTCTimestamp;
    },
    []
  );

  // Access Token 발급
  const getAccessToken = useCallback(async (): Promise<string> => {
    try {
      //   const response = await fetch("http://localhost:3001/stock/accessToken", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   if (!response.ok) {
      //     throw new Error("토큰 발급 실패");
      //   }

      //   const data: KISAccessTokenResponse = await response.json();
      //   return data.access_token;

      return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImZlZDQyNWYyLTIwZWQtNDg0MS1hMGU2LTkxMDc5ZTZlOTA0NCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTc1NzQzMDI3MiwiaWF0IjoxNzU3MzQzODcyLCJqdGkiOiJQU1VWb0xEbFpZSUNNbG9sN21OMFFXbU1qNHZDaEQ2QmhWSTIifQ.XDM6pCJY_iLK2hu8dl7lnSiLrRo_5RwfuUvY6Gsq3VjsES-KAenGzHVFR-de_NxHitcRJJJhSNnXZdIuOoF7Yg`;
    } catch (error) {
      console.error("Access token 발급 실패:", error);
      throw error;
    }
  }, []);

  // 현재가 조회
  const getCurrentPrice = useCallback(
    async (token: string, stockCode: string): Promise<StockPriceResponse> => {
      try {
        const response = await fetch(
          `http://localhost:3001/stock/price/${stockCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("현재가 조회 실패");
        }

        const data: StockPriceResponse = await response.json();
        return data;
      } catch (error) {
        console.error("현재가 조회 실패:", error);
        throw error;
      }
    },
    []
  );

  // 일봉/주봉/월봉 데이터 조회
  const getDailyChart = useCallback(
    async (
      token: string,
      stockCode: string,
      period: DailyChartPeriod
    ): Promise<StockDailyResponse> => {
      try {
        const response = await fetch(
          `http://localhost:3001/stock/daily/${stockCode}?period=${period}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("차트 데이터 조회 실패");
        }

        const data: StockDailyResponse = await response.json();
        return data;
      } catch (error) {
        console.error("차트 데이터 조회 실패:", error);
        throw error;
      }
    },
    []
  );

  // 분봉 데이터 조회
  const getTimeChart = useCallback(
    async (
      token: string,
      stockCode: string,
      startTime: string = "090000"
    ): Promise<StockTimeResponse> => {
      try {
        const response = await fetch(
          `http://localhost:3001/stock/time/${stockCode}?inqr_start_dt=${startTime}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("분봉 데이터 조회 실패");
        }

        const data: StockTimeResponse = await response.json();
        return data;
      } catch (error) {
        console.error("분봉 데이터 조회 실패:", error);
        throw error;
      }
    },
    []
  );

  // 일봉 데이터를 차트 데이터로 변환
  const convertDailyDataToChart = useCallback(
    (dailyData: StockDailyResponse): ConvertedChartData => {
      const candlestickData: CandlestickData[] = [];
      const lineData: LineData[] = [];
      const volumeData: HistogramData[] = [];

      // output 배열을 역순으로 정렬 (가장 오래된 데이터부터)
      const sortedData = [...dailyData.output].reverse();

      sortedData.forEach((item: StockDailyOutput) => {
        const timestamp = toKSTTimestamp(item.stck_bsop_date);

        const open = parseFloat(item.stck_oprc);
        const high = parseFloat(item.stck_hgpr);
        const low = parseFloat(item.stck_lwpr);
        const close = parseFloat(item.stck_clpr);
        const volume = parseInt(item.acml_vol);

        // 캔들스틱 데이터
        candlestickData.push({
          time: timestamp,
          open,
          high,
          low,
          close,
        });

        // 라인 데이터
        lineData.push({
          time: timestamp,
          value: close,
        });

        // 거래량 데이터 (상승/하락 색상 구분)
        const color =
          item.prdy_vrss_sign === "2"
            ? "#26a69a" // 상승 (초록)
            : item.prdy_vrss_sign === "1"
              ? "#ef5350" // 하락 (빨강)
              : "#9e9e9e"; // 보합 (회색)

        volumeData.push({
          time: timestamp,
          value: volume,
          color,
        });
      });

      return { candlestickData, lineData, volumeData };
    },
    [toKSTTimestamp]
  );

  // 분봉 데이터를 차트 데이터로 변환
  const convertTimeDataToChart = useCallback(
    (timeData: StockTimeResponse): ConvertedChartData => {
      const candlestickData: CandlestickData[] = [];
      const lineData: LineData[] = [];
      const volumeData: HistogramData[] = [];

      // output2 배열을 시간순으로 정렬
      const sortedData = [...timeData.output2].sort(
        (a: StockOrderCashOutput2, b: StockOrderCashOutput2) => {
          const timeA = parseInt(a.stck_cntg_hour);
          const timeB = parseInt(b.stck_cntg_hour);
          return timeA - timeB;
        }
      );

      sortedData.forEach((item: StockOrderCashOutput2) => {
        const timestamp = toKSTTimestamp(
          item.stck_bsop_date,
          item.stck_cntg_hour
        );

        const open = parseFloat(item.stck_oprc);
        const high = parseFloat(item.stck_hgpr);
        const low = parseFloat(item.stck_lwpr);
        const close = parseFloat(item.stck_prpr);
        const volume = parseInt(item.cntg_vol);

        // 0 거래량인 경우 제외
        if (volume === 0) return;

        // 캔들스틱 데이터
        candlestickData.push({
          time: timestamp,
          open,
          high,
          low,
          close,
        });

        // 라인 데이터
        lineData.push({
          time: timestamp,
          value: close,
        });

        // 거래량 데이터
        volumeData.push({
          time: timestamp,
          value: volume,
          color: close >= open ? "#26a69a" : "#ef5350",
        });
      });

      return { candlestickData, lineData, volumeData };
    },
    [toKSTTimestamp]
  );

  // 데이터 로드
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Access Token 발급
      let token = accessToken;
      if (!token) {
        token = await getAccessToken();
        setAccessToken(token);
      }

      // 2. 현재가 조회
      const priceData = await getCurrentPrice(token, config.stockCode);
      setCurrentPrice(priceData);

      // 3. 차트 데이터 조회
      if (config.timeframe === "daily") {
        const chartData = await getDailyChart(
          token,
          config.stockCode,
          config.period
        );
        setDailyData(chartData);
        setTimeData(null); // 분봉 데이터 클리어
      } else {
        const chartData = await getTimeChart(token, config.stockCode);
        console.log("### 분봉", chartData);
        setTimeData(chartData);
        setDailyData(null); // 일봉 데이터 클리어
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setError(error instanceof Error ? error.message : "데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  }, [
    config,
    accessToken,
    getAccessToken,
    getCurrentPrice,
    getDailyChart,
    getTimeChart,
  ]);

  // 차트 초기화
  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
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
        secondsVisible: config.timeframe === "intraday",
        rightOffset: 12, // 오른쪽 여백
        barSpacing: 3,
        fixLeftEdge: false,
        fixRightEdge: true, // 오른쪽 끝을 고정
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        allowBoldLabels: true,
        visible: true,
      },
      localization: {
        priceFormatter: (price: number) => {
          return new Intl.NumberFormat("ko-KR").format(price) + "원";
        },
        timeFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          if (config.timeframe === "intraday") {
            return date.toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
              hour12: false,
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
          } else {
            return date.toLocaleDateString("ko-KR", {
              timeZone: "Asia/Seoul",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          }
        },
      },
    });

    chartRef.current = chart;

    // 캔들스틱 시리즈 추가
    candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      visible: config.chartType === "candlestick",
    });

    // 라인 시리즈 추가
    lineSeriesRef.current = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
      visible: config.chartType === "line",
    });

    // 거래량 시리즈 추가
    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    // 거래량 스케일 설정
    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    }); // 화면에 보이는 구간 확인하는 함수
    function getVisibleTimeRange() {
      const visibleRange = chart.timeScale().getVisibleRange();

      if (visibleRange) {
        // 시간 값을 실제 날짜로 변환
        const fromDate = new Date(Number(visibleRange.from) * 1000);
        const toDate = new Date(Number(visibleRange.to) * 1000);

        console.log("보이는 구간:");
        console.log("시작:", fromDate.toISOString());
        console.log("끝:", toDate.toISOString());

        return {
          from: fromDate,
          to: toDate,
          fromTimestamp: visibleRange.from,
          toTimestamp: visibleRange.to,
        };
      }

      return null;
    }
    // 차트 확대/축소나 이동 시 실행되는 이벤트 리스너
    chart.timeScale().subscribeVisibleTimeRangeChange(() => {
      const range = getVisibleTimeRange();
      if (range) {
        console.log("화면 구간이 변경되었습니다:", range);
      }
    });
    // 리사이즈 핸들러
    const handleResize = () => {
      console.log("handleResize", chartContainerRef.current);
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
        lineSeriesRef.current = null;
        volumeSeriesRef.current = null;
      }
    };
  }, [config.chartType, config.timeframe]);

  // 차트 데이터 업데이트
  const updateChartData = useCallback(() => {
    if (!chartRef.current) return;

    let chartData: ConvertedChartData;

    // 현재 설정에 따라 적절한 데이터 변환
    if (config.timeframe === "daily" && dailyData) {
      chartData = convertDailyDataToChart(dailyData);
      console.log("daily chartData", chartData);
    } else if (config.timeframe === "intraday" && timeData) {
      chartData = convertTimeDataToChart(timeData);
      console.log("intraday chartData", chartData);
    } else {
      console.log("chartData 없음");
      return; // 데이터가 없으면 업데이트하지 않음
    }

    const { candlestickData, lineData, volumeData } = chartData;
    console.log("세팅 완료ㅕ ~~", { candlestickData, lineData, volumeData });
    console.log(
      "세팅 완료ㅕ ~~",
      candlestickSeriesRef.current,
      candlestickSeriesRef.current,
      volumeSeriesRef.current
    );
    // 시리즈에 데이터 설정
    if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setData(candlestickData);
      console.log("세팅 완료ㅕ ~~", candlestickSeriesRef.current.data.length);
    }
    if (lineSeriesRef.current) {
      lineSeriesRef.current.setData(lineData);
      console.log("세팅 완료ㅕ ~~", lineSeriesRef.current.data.length);
    }
    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.setData(volumeData);
      console.log("세팅 완료ㅕ ~~", volumeSeriesRef.current.data.length);
    }

    // 차트 뷰 맞추기
    chartRef.current.timeScale().fitContent();
  }, [
    config.timeframe,
    dailyData,
    timeData,
    convertDailyDataToChart,
    convertTimeDataToChart,
  ]);

  // 차트 타입 변경
  const handleChartTypeChange = useCallback(
    (newType: "candlestick" | "line") => {
      if (candlestickSeriesRef.current && lineSeriesRef.current) {
        candlestickSeriesRef.current.applyOptions({
          visible: newType === "candlestick",
        });
        lineSeriesRef.current.applyOptions({
          visible: newType === "line",
        });
      }
      setConfig((prev) => ({ ...prev, chartType: newType }));
    },
    []
  );

  // 종목 코드 변경
  const handleStockCodeChange = useCallback((newStockCode: string) => {
    setConfig((prev) => ({ ...prev, stockCode: newStockCode }));
  }, []);

  // 기간 변경
  const handlePeriodChange = useCallback((newPeriod: DailyChartPeriod) => {
    setConfig((prev) => ({ ...prev, period: newPeriod }));
  }, []);

  // 타임프레임 변경
  const handleTimeframeChange = useCallback(
    (newTimeframe: "daily" | "intraday") => {
      setConfig((prev) => ({ ...prev, timeframe: newTimeframe }));
    },
    []
  );

  // 가격 변동률 계산 (현재가 기준)
  const getPriceChangeInfo = useCallback((): PriceChangeInfo | null => {
    if (!currentPrice?.output) return null;

    const current = parseFloat(currentPrice.output.stck_prpr);
    const previous = parseFloat(currentPrice.output.stck_oprc); // 시가 대비로 계산
    const priceChange = parseFloat(currentPrice.output.prdy_vrss);
    const changePercent = parseFloat(currentPrice.output.prdy_ctrt);
    const sign = currentPrice.output.prdy_vrss_sign;

    return {
      current,
      change: priceChange,
      changePercent,
      sign,
      isPositive: sign === "2", // 상승
      isNegative: sign === "1", // 하락
      isFlat: sign === "3", // 보합
    };
  }, [currentPrice]);

  // 종목명 가져오기
  const getStockName = useCallback((): string => {
    if (timeData?.output1?.hts_kor_isnm) {
      return timeData.output1.hts_kor_isnm;
    }
    return currentPrice?.output?.rprs_mrkt_kor_name || "종목명";
  }, [currentPrice, timeData]);

  // 거래량 정보 가져오기
  const getVolumeInfo = useCallback(() => {
    if (timeData?.output1?.acml_vol) {
      return parseInt(timeData.output1.acml_vol);
    }
    if (currentPrice?.output?.acml_vol) {
      return parseInt(currentPrice.output.acml_vol);
    }
    return 0;
  }, [currentPrice, timeData]);

  // 차트 초기화 effect
  useEffect(() => {
    const cleanup = initializeChart();
    return cleanup;
  }, [initializeChart]);

  // 데이터 로드 effect
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 차트 데이터 업데이트 effect
  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  // 자동 새로고침 (현재가)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (accessToken && config.stockCode) {
        try {
          const priceData = await getCurrentPrice(
            accessToken,
            config.stockCode
          );
          console.log("갱신", priceData);
          setCurrentPrice(priceData);
        } catch (error) {
          console.error("실시간 데이터 갱신 실패:", error);
        }
      }
    }, 5000); // 5초마다 현재가 갱신

    return () => clearInterval(interval);
  }, [accessToken, config.stockCode, getCurrentPrice]);

  const priceInfo = getPriceChangeInfo();
  const stockName = getStockName();
  const volume = getVolumeInfo();

  return (
    <div className="w-full p-6 bg-white">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              {stockName} ({config.stockCode})
            </h1>
            {loading && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            )}
          </div>

          {/* 종목 검색 */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="종목코드 입력"
              value={config.stockCode}
              onChange={(e) => handleStockCodeChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={6}
            />
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              조회
            </button>
          </div>
        </div>

        {/* 현재가 정보 */}
        {priceInfo && (
          <div className="flex items-center space-x-6">
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat("ko-KR").format(priceInfo.current)}원
            </div>
            <div
              className={`flex items-center space-x-2 ${
                priceInfo.isPositive
                  ? "text-red-500"
                  : priceInfo.isNegative
                    ? "text-blue-500"
                    : "text-gray-500"
              }`}
            >
              <span className="text-lg font-semibold">
                {priceInfo.change > 0 ? "+" : ""}
                {new Intl.NumberFormat("ko-KR").format(priceInfo.change)}
              </span>
              <span className="text-lg font-semibold">
                ({priceInfo.changePercent > 0 ? "+" : ""}
                {priceInfo.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-sm text-gray-500">
              거래량: {new Intl.NumberFormat("ko-KR").format(volume)}
            </div>
          </div>
        )}
      </div>

      {/* 컨트롤 패널 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* 타임프레임 선택 */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeframeChange("daily")}
              className={`px-3 py-2 rounded-lg ${
                config.timeframe === "daily"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              일봉
            </button>
            <button
              onClick={() => handleTimeframeChange("intraday")}
              className={`px-3 py-2 rounded-lg ${
                config.timeframe === "intraday"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              분봉
            </button>
          </div>

          {/* 기간 선택 (일봉일 때만) */}
          {config.timeframe === "daily" && (
            <div className="flex space-x-2">
              {(["D", "W", "M"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-3 py-2 rounded-lg ${
                    config.period === period
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {period === "D" ? "30일" : period === "W" ? "30주" : "30월"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 차트 타입 선택 */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleChartTypeChange("candlestick")}
            className={`px-3 py-2 rounded-lg ${
              config.chartType === "candlestick"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            캔들스틱
          </button>
          <button
            onClick={() => handleChartTypeChange("line")}
            className={`px-3 py-2 rounded-lg ${
              config.chartType === "line"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            라인
          </button>
        </div>
      </div>

      {/* 에러 표시 */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* 차트 컨테이너 */}
      <div
        ref={chartContainerRef}
        className="w-full h-[500px] border border-gray-300 rounded-lg bg-white"
      />

      {/* 데이터 정보 표시 */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {currentPrice?.output && (
          <>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-600">시가</div>
              <div className="font-semibold">
                {new Intl.NumberFormat("ko-KR").format(
                  parseFloat(currentPrice.output.stck_oprc)
                )}
                원
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-600">고가</div>
              <div className="font-semibold text-red-500">
                {new Intl.NumberFormat("ko-KR").format(
                  parseFloat(currentPrice.output.stck_hgpr)
                )}
                원
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-600">저가</div>
              <div className="font-semibold text-blue-500">
                {new Intl.NumberFormat("ko-KR").format(
                  parseFloat(currentPrice.output.stck_lwpr)
                )}
                원
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-600">거래대금</div>
              <div className="font-semibold">
                {(
                  parseFloat(currentPrice.output.acml_tr_pbmn) / 100000000
                ).toFixed(0)}
                억원
              </div>
            </div>
          </>
        )}
      </div>

      {/* 차트 정보 */}
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <div>• 실시간 데이터는 5초마다 자동 갱신됩니다.</div>
        <div>• 한국투자증권 OpenAPI를 통해 제공되는 데이터입니다.</div>
        <div>• 차트를 드래그하여 확대/축소할 수 있습니다.</div>
        <div>
          • 현재 표시 중:{" "}
          {config.timeframe === "daily"
            ? `${config.period === "D" ? "일봉" : config.period === "W" ? "주봉" : "월봉"}`
            : "분봉"}{" "}
          ({config.chartType === "candlestick" ? "캔들스틱" : "라인차트"})
        </div>
      </div>
    </div>
  );
};

export default StockTradingChart;
