"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createChart,
  CandlestickData,
  LineData,
  HistogramData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
  LineSeries,
  HistogramSeries,
  CrosshairMode,
} from "lightweight-charts";

// 새로운 KIS API 응답 타입 정의
interface KISStockPriceResponse {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output: {
    stck_prpr: string; // 현재가
    prdy_vrss: string; // 전일대비
    prdy_vrss_sign: string; // 전일대비 부호
    prdy_ctrt: string; // 전일대비율
    hts_kor_isnm: string; // 한글종목명
    acml_vol: string; // 누적거래량
  };
}

// 일봉 차트 API 응답 구조
interface InquireDailyItemChartPriceResponse {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output1: {
    prdy_vrss: string; // 전일 대비
    prdy_vrss_sign: string; // 전일 대비 부호
    prdy_ctrt: string; // 전일 대비율
    stck_prdy_clpr: string; // 주식 전일 종가
    acml_vol: string; // 누적 거래량
    acml_tr_pbmn: string; // 누적 거래 대금
    hts_kor_isnm: string; // HTS 한글 종목명
    stck_prpr: string; // 주식 현재가
  };
  output2: Array<{
    stck_bsop_date: string; // 주식 영업 일자
    stck_clpr: string; // 주식 종가
    stck_oprc: string; // 주식 시가
    stck_hgpr: string; // 주식 최고가
    stck_lwpr: string; // 주식 최저가
    acml_vol: string; // 누적 거래량
    acml_tr_pbmn: string; // 누적 거래 대금
    flng_cls_code: string; // 락 구분 코드
    prtt_rate: string; // 분할 비율
    mod_yn: string; // 변경 여부
    prdy_vrss_sign: string; // 전일 대비 부호
    prdy_vrss: string; // 전일 대비
    revl_issu_reas: string; // 재평가사유코드
  }>;
}

// 관심 종목 리스트
const WATCHLIST_STOCKS = [
  { code: "005930", name: "삼성전자" },
  { code: "000660", name: "SK하이닉스" },
  { code: "035420", name: "NAVER" },
  { code: "005380", name: "현대차" },
  { code: "035720", name: "카카오" },
];

interface StockInfo {
  code: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  purchasableShares: number;
  historicalGrowth?: number;
}

interface SimulationResult {
  stock: StockInfo;
  fiveYearValue: number;
  monthlyInvestmentValue: number;
  totalReturn: number;
  annualizedReturn: number;
}

const InvestmentSimulator: React.FC = () => {
  const [savingsAmount, setSavingsAmount] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [stocksData, setStocksData] = useState<StockInfo[]>([]);
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);
  const [selectedStock, setSelectedStock] = useState<StockInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 차트 관련 refs
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const localhost = "http://localhost:3001";
  const [config, setConfig] = useState<{
    timeframe: "daily" | "intraday";
  }>({
    timeframe: "daily",
  });
  // KIS API 액세스 토큰 발급
  const getKISToken = async (): Promise<string> => {
    try {
      // 실제 구현시에는 서버에서 토큰을 받아와야 함
      return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImNhZDlmNDZkLTg2NTEtNDFhNi04NDNkLWU3YWVkNTFhMmYyNiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTc1NzY5NTM4NiwiaWF0IjoxNzU3NjA4OTg2LCJqdGkiOiJQU1VWb0xEbFpZSUNNbG9sN21OMFFXbU1qNHZDaEQ2QmhWSTIifQ.s_Bj3WPb1LLksAbOEYc9I40srWo0xtxJjCT-pIfoKWFttLQCEhPnjGDYGmPB3eswU8B7bnhwNYxV6TuYaU5efg`;
    } catch (err) {
      throw new Error("KIS API 연결 실패");
    }
  };

  // 주식 현재가 조회
  const getCurrentPrice = async (
    token: string,
    stockCode: string
  ): Promise<KISStockPriceResponse> => {
    const response = await fetch(`${localhost}/stock/price/${stockCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`주식 정보 조회 실패: ${stockCode}`);
    }

    return response.json();
  };

  // 일봉 차트 데이터 조회 - 새로운 API 구조 적용
  const getTradeChart = async (
    token: string,
    stockCode: string,
    period: string = "D"
  ): Promise<InquireDailyItemChartPriceResponse> => {
    // 오늘 날짜와 100일 전 날짜 계산
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 100); // 100일 전

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 10).replace(/-/g, "");
    };

    const endDateStr = formatDate(today);
    const startDateStr = formatDate(startDate);

    const response = await fetch(
      `${localhost}/stock/trade-view/${stockCode}?period=${period}&startDate=${startDateStr}&endDate=${endDateStr}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`차트 데이터 조회 실패: ${stockCode}`);
    }

    return response.json();
  };

  // 시간 변환 함수
  const toTimestamp = (dateStr: string): UTCTimestamp => {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    return Math.floor(date.getTime() / 1000) as UTCTimestamp;
  };

  // 차트 초기화
  useEffect(() => {
    console.log("차트 초기화", chartContainerRef.current, chartRef.current);
    if (!chartContainerRef.current || chartRef.current) return;

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
        // secondsVisible: config.timeframe === "intraday",
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
    candleSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#ef4444",
      downColor: "#3b82f6",
      borderUpColor: "#ef4444",
      borderDownColor: "#3b82f6",
      wickUpColor: "#ef4444",
      wickDownColor: "#3b82f6",
    });

    // 거래량 시리즈
    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
      priceScaleId: "",
      priceFormat: { type: "volume" },
    });

    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    });

    chart.timeScale().fitContent();
    // 화면에 보이는 구간 확인하는 함수
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
    const handleResize = () => {
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
      }
    };
  }, []);

  // 주식 데이터 로딩
  const loadStockData = async () => {
    try {
      setLoading(true);
      setError("");

      // 토큰 발급
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

          return {
            code: stock.code,
            name: stock.name,
            currentPrice,
            change,
            changePercent,
            purchasableShares,
          };
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

  // 차트 데이터 로딩
  const loadChartData = async (stock: StockInfo) => {
    console.log("load chart Data", accessToken, chartRef.current);
    if (!accessToken || !chartRef.current) return;

    try {
      const chartData = await getTradeChart(accessToken, stock.code, "D");

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

      const volumeData: HistogramData[] = sortedData.map((item) => {
        const open = parseFloat(item.stck_oprc);
        const close = parseFloat(item.stck_clpr);
        return {
          time: toTimestamp(item.stck_bsop_date),
          value: parseInt(item.acml_vol),
          color: close >= open ? "#ef4444" : "#3b82f6",
        };
      });

      if (candleSeriesRef.current && volumeSeriesRef.current) {
        candleSeriesRef.current.setData(candlestickData);
        volumeSeriesRef.current.setData(volumeData);
        chartRef.current.timeScale().fitContent();
      }
    } catch (err) {
      console.error("차트 데이터 로딩 실패:", err);
    }
  };

  // 투자 시뮬레이션 계산
  const calculateSimulation = (stock: StockInfo): SimulationResult => {
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

  // 시뮬레이션 실행
  const runSimulation = () => {
    if (!savingsAmount || stocksData.length === 0) return;

    const results = stocksData.map(calculateSimulation);
    setSimulationResults(results);
  };

  const handleStockSelect = (stock: StockInfo) => {
    setSelectedStock(stock);
    loadChartData(stock);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount);
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

      {/* 입력 섹션 */}
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
            onClick={loadStockData}
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

      {/* 주식 목록 */}
      <AnimatePresence>
        {stocksData.length > 0 && (
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
                  onClick={() => handleStockSelect(stock)}
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
                    <span className="font-medium">
                      {stock.purchasableShares}주
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={runSimulation}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                투자 시뮬레이션 실행
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 차트 섹션 */}
      <AnimatePresence>
        {
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedStock?.name} 차트
              </h2>
            </div>
            <div
              ref={chartContainerRef}
              className="w-full h-[400px] border border-gray-200 rounded-lg"
            ></div>
          </motion.div>
        }
      </AnimatePresence>

      {/* 시뮬레이션 결과 */}
      <AnimatePresence>
        {simulationResults.length > 0 && (
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
                <div
                  key={result.stock.code}
                  className="p-4 bg-gray-50 rounded-lg"
                >
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
                          result.totalReturn >= 0
                            ? "text-red-600"
                            : "text-blue-600"
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
                이 시뮬레이션은 과거 데이터를 기반으로 한 가상의 계산입니다.
                실제 투자 수익을 보장하지 않으며, 투자 시에는 신중한 판단이
                필요합니다.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestmentSimulator;
