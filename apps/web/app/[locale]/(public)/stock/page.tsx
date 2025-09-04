"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickData,
  CandlestickSeries,
  HistogramData,
  LineSeries,
  HistogramSeries,
  LineData,
  UTCTimestamp,
} from "lightweight-charts";

// 타입 정의
interface StockOrderCashOutput1 {
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  stck_prdy_clpr: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  hts_kor_isnm: string;
  stck_prpr: string;
}

interface StockOrderCashOutput2 {
  stck_bsop_date: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
  acml_tr_pbmn: string;
}

interface StockTimeResponse {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output1: StockOrderCashOutput1;
  output2: StockOrderCashOutput2[];
}

// 샘플 데이터
const sampleData1: StockTimeResponse = {
  output1: {
    prdy_vrss: "1500",
    prdy_vrss_sign: "2",
    prdy_ctrt: "2.22",
    stck_prdy_clpr: "67600",
    acml_vol: "10604028",
    acml_tr_pbmn: "731582866980",
    hts_kor_isnm: "삼성전자",
    stck_prpr: "69100",
  },
  output2: [
    // {
    //   stck_bsop_date: "20250902",
    //   stck_cntg_hour: "090000",
    //   stck_prpr: "68100",
    //   stck_oprc: "67800",
    //   stck_hgpr: "68100",
    //   stck_lwpr: "67800",
    //   cntg_vol: "230069",
    //   acml_tr_pbmn: "15610102100",
    // },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "153000",
      stck_prpr: "67600",
      stck_oprc: "67600",
      stck_hgpr: "67600",
      stck_lwpr: "67600",
      cntg_vol: "908291",
      acml_tr_pbmn: "815188886300",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152900",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152800",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152700",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152600",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152500",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152400",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152300",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152200",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152100",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "152000",
      stck_prpr: "67700",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67700",
      cntg_vol: "0",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151900",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "32732",
      acml_tr_pbmn: "753788414700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151800",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "16698",
      acml_tr_pbmn: "751574372800",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151700",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "26741",
      acml_tr_pbmn: "750445177100",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151600",
      stck_prpr: "67600",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "22722",
      acml_tr_pbmn: "748636172800",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151500",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "17020",
      acml_tr_pbmn: "747099763350",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151400",
      stck_prpr: "67600",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "32370",
      acml_tr_pbmn: "745948886250",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151300",
      stck_prpr: "67600",
      stck_oprc: "67650",
      stck_hgpr: "67650",
      stck_lwpr: "67600",
      cntg_vol: "20581",
      acml_tr_pbmn: "743760087700",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151200",
      stck_prpr: "67600",
      stck_oprc: "67600",
      stck_hgpr: "67650",
      stck_lwpr: "67600",
      cntg_vol: "22118",
      acml_tr_pbmn: "742368632250",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151100",
      stck_prpr: "67650",
      stck_oprc: "67650",
      stck_hgpr: "67650",
      stck_lwpr: "67600",
      cntg_vol: "39146",
      acml_tr_pbmn: "740873221900",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "151000",
      stck_prpr: "67650",
      stck_oprc: "67600",
      stck_hgpr: "67650",
      stck_lwpr: "67600",
      cntg_vol: "16801",
      acml_tr_pbmn: "738226115300",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150900",
      stck_prpr: "67650",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "10492",
      acml_tr_pbmn: "737090224100",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150800",
      stck_prpr: "67650",
      stck_oprc: "67650",
      stck_hgpr: "67650",
      stck_lwpr: "67600",
      cntg_vol: "14016",
      acml_tr_pbmn: "736380706950",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150700",
      stck_prpr: "67650",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "5525",
      acml_tr_pbmn: "735432995200",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150600",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "37936",
      acml_tr_pbmn: "735059248950",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150500",
      stck_prpr: "67600",
      stck_oprc: "67650",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "10470",
      acml_tr_pbmn: "732492018400",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150400",
      stck_prpr: "67600",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "25609",
      acml_tr_pbmn: "731783900400",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150300",
      stck_prpr: "67700",
      stck_oprc: "67600",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "42809",
      acml_tr_pbmn: "730051346000",
    },
    {
      stck_bsop_date: "20250901",
      stck_cntg_hour: "150200",
      stck_prpr: "67600",
      stck_oprc: "67700",
      stck_hgpr: "67700",
      stck_lwpr: "67600",
      cntg_vol: "12955",
      acml_tr_pbmn: "727154201950",
    },
  ],
  rt_cd: "0",
  msg_cd: "MCA00000",
  msg1: "정상처리 되었습니다.",
};

const sampleData2: StockTimeResponse = {
  rt_cd: "0",
  msg_cd: "MCA00000",
  msg1: "정상처리 되었습니다.",
  output1: {
    prdy_vrss: "1500",
    prdy_vrss_sign: "2",
    prdy_ctrt: "2.15",
    stck_prdy_clpr: "69500",
    acml_vol: "1234567",
    acml_tr_pbmn: "85647291000",
    hts_kor_isnm: "삼성전자",
    stck_prpr: "71000",
  },
  output2: [
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "090000",
      stck_prpr: "69800",
      stck_oprc: "69500",
      stck_hgpr: "70200",
      stck_lwpr: "69300",
      cntg_vol: "12345",
      acml_tr_pbmn: "861234000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "093000",
      stck_prpr: "70100",
      stck_oprc: "69800",
      stck_hgpr: "70300",
      stck_lwpr: "69700",
      cntg_vol: "15678",
      acml_tr_pbmn: "1098765000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "100000",
      stck_prpr: "70500",
      stck_oprc: "70100",
      stck_hgpr: "70800",
      stck_lwpr: "70000",
      cntg_vol: "18234",
      acml_tr_pbmn: "1285432000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "103000",
      stck_prpr: "70200",
      stck_oprc: "70500",
      stck_hgpr: "70600",
      stck_lwpr: "69900",
      cntg_vol: "14567",
      acml_tr_pbmn: "1456789000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "110000",
      stck_prpr: "71000",
      stck_oprc: "70200",
      stck_hgpr: "71200",
      stck_lwpr: "70100",
      cntg_vol: "22345",
      acml_tr_pbmn: "1678901000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "113000",
      stck_prpr: "70800",
      stck_oprc: "71000",
      stck_hgpr: "71100",
      stck_lwpr: "70700",
      cntg_vol: "16789",
      acml_tr_pbmn: "1834567000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "120000",
      stck_prpr: "70600",
      stck_oprc: "70800",
      stck_hgpr: "70900",
      stck_lwpr: "70400",
      cntg_vol: "13456",
      acml_tr_pbmn: "1978234000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "123000",
      stck_prpr: "70900",
      stck_oprc: "70600",
      stck_hgpr: "71000",
      stck_lwpr: "70500",
      cntg_vol: "19876",
      acml_tr_pbmn: "2145678000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "130000",
      stck_prpr: "71200",
      stck_oprc: "70900",
      stck_hgpr: "71300",
      stck_lwpr: "70800",
      cntg_vol: "21234",
      acml_tr_pbmn: "2345789000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "133000",
      stck_prpr: "71100",
      stck_oprc: "71200",
      stck_hgpr: "71250",
      stck_lwpr: "70950",
      cntg_vol: "17890",
      acml_tr_pbmn: "2567890000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "140000",
      stck_prpr: "70950",
      stck_oprc: "71100",
      stck_hgpr: "71150",
      stck_lwpr: "70800",
      cntg_vol: "15432",
      acml_tr_pbmn: "2698765000",
    },
    {
      stck_bsop_date: "20241201",
      stck_cntg_hour: "143000",
      stck_prpr: "71050",
      stck_oprc: "70950",
      stck_hgpr: "71200",
      stck_lwpr: "70900",
      cntg_vol: "18765",
      acml_tr_pbmn: "2834567000",
    },
  ],
};

// Lightweight Charts 모킹 (실제로는 npm install lightweight-charts 필요)

// 한국시각 → timestamp (UTC 변환 없음)
const toKSTTimestamp = (date: string, time: string): UTCTimestamp => {
  const kst = new Date(
    `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T${time.slice(
      0,
      2
    )}:${time.slice(2, 4)}:00+09:00`
  );
  return Math.floor(kst.getTime() / 1000) as UTCTimestamp;
};

// const StockTradingChart: React.FC = () => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<any>(null);
//   const candlestickSeriesRef = useRef<any>(null);
//   const lineSeriesRef = useRef<any>(null);
//   const volumeSeriesRef = useRef<any>(null);

//   const [stockData] = useState<StockTimeResponse>(sampleData);
//   const [chartType, setChartType] = useState<"candlestick" | "line">(
//     "candlestick"
//   );

//   // 데이터 변환
//   const candlestickData: CandlestickData[] = stockData.output2.map((item) => ({
//     time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
//     open: parseFloat(item.stck_oprc),
//     high: parseFloat(item.stck_hgpr),
//     low: parseFloat(item.stck_lwpr),
//     close: parseFloat(item.stck_prpr),
//   }));

//   const volumeData: HistogramData[] = stockData.output2.map((item) => {
//     const open = parseFloat(item.stck_oprc);
//     const close = parseFloat(item.stck_prpr);
//     return {
//       time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
//       value: parseInt(item.cntg_vol),
//       color: close >= open ? "#26a69a" : "#ef5350",
//     };
//   });

//   const lineData: LineData[] = stockData.output2.map((item) => ({
//     time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
//     value: parseFloat(item.stck_prpr),
//   }));

//   // 차트 초기화
//   useEffect(() => {
//     if (!chartContainerRef.current || chartRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: 400,
//       layout: {
//         background: { color: "white" },
//         textColor: "#333",
//       },
//       grid: {
//         vertLines: { color: "#f0f0f0" },
//         horzLines: { color: "#f0f0f0" },
//       },
//       crosshair: { mode: 1 },
//       rightPriceScale: { borderColor: "#cccccc" },
//       timeScale: { borderColor: "#cccccc", timeVisible: true },
//     });
//     chart.applyOptions({
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: false,
//       },
//       localization: {
//         timeFormatter: (time: UTCTimestamp) => {
//           const date = new Date(time * 1000); // timestamp → Date
//           return date.toLocaleString("ko-KR", {
//             timeZone: "Asia/Seoul",
//             hour12: false,
//             month: "2-digit",
//             day: "2-digit",
//             hour: "2-digit",
//             minute: "2-digit",
//           });
//         },
//       },
//     });
//     chartRef.current = chart;

//     // 시리즈 추가
//     candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderDownColor: "#ef5350",
//       borderUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//       wickUpColor: "#26a69a",
//     });

//     lineSeriesRef.current = chart.addSeries(LineSeries, {
//       color: "#2962FF",
//       lineWidth: 2,
//       visible: false, // 기본은 숨김
//     });

//     volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
//       priceScaleId: "",
//       priceFormat: { type: "volume" },
//     });
//     volumeSeriesRef.current.priceScale().applyOptions({
//       scaleMargins: { top: 0.85, bottom: 0 },
//     });

//     chart.timeScale().fitContent();

//     const handleResize = () => {
//       if (chartContainerRef.current) {
//         chart.applyOptions({ width: chartContainerRef.current.clientWidth });
//       }
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       chart.remove();
//       chartRef.current = null;
//     };
//   }, []);

//   // 데이터 업데이트
//   useEffect(() => {
//     if (!chartRef.current) return;
//     candlestickSeriesRef.current.setData(candlestickData);
//     lineSeriesRef.current.setData(lineData);
//     volumeSeriesRef.current.setData(volumeData);
//   }, [candlestickData, lineData, volumeData]);

//   // 차트 타입 토글
//   useEffect(() => {
//     if (!candlestickSeriesRef.current || !lineSeriesRef.current) return;
//     if (chartType === "candlestick") {
//       candlestickSeriesRef.current.applyOptions({ visible: true });
//       lineSeriesRef.current.applyOptions({ visible: false });
//     } else {
//       candlestickSeriesRef.current.applyOptions({ visible: false });
//       lineSeriesRef.current.applyOptions({ visible: true });
//     }
//   }, [chartType]);

//   return (
//     <div className="p-6">
//       <div className="mb-4 flex space-x-2">
//         <button
//           onClick={() => setChartType("candlestick")}
//           className={`px-3 py-1 rounded ${
//             chartType === "candlestick"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           캔들스틱
//         </button>
//         <button
//           onClick={() => setChartType("line")}
//           className={`px-3 py-1 rounded ${
//             chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           라인
//         </button>
//       </div>
//       <div
//         ref={chartContainerRef}
//         className="w-full h-[400px] border border-gray-300 rounded"
//       />
//     </div>
//   );
// };

// export default StockTradingChart;
const StockTradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candleRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);

  const [stockData] = useState<StockTimeResponse>(sampleData2);
  const [chartType, setChartType] = useState<"candlestick" | "line">(
    "candlestick"
  );

  // 데이터 변환
  const candlestickData: CandlestickData[] = stockData.output2.map((item) => ({
    time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
    open: parseFloat(item.stck_oprc),
    high: parseFloat(item.stck_hgpr),
    low: parseFloat(item.stck_lwpr),
    close: parseFloat(item.stck_prpr),
  }));

  const lineData: LineData[] = stockData.output2.map((item) => ({
    time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
    value: parseFloat(item.stck_prpr),
  }));

  const volumeData: HistogramData[] = stockData.output2.map((item) => {
    const open = parseFloat(item.stck_oprc);
    const close = parseFloat(item.stck_prpr);
    return {
      time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
      value: parseInt(item.cntg_vol),
      color: close >= open ? "#26a69a" : "#ef5350",
    };
  });

  // 차트 초기화
  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "white" }, textColor: "#333" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#ccc" },
      timeScale: { borderColor: "#ccc", timeVisible: true },
      // localization: {
      //   timeFormatter: (time: UTCTimestamp) => {
      //     const date = new Date(time * 1000);
      //     return date.toLocaleString("ko-KR", {
      //       timeZone: "Asia/Seoul",
      //       hour12: false,
      //       month: "2-digit",
      //       day: "2-digit",
      //       hour: "2-digit",
      //       minute: "2-digit",
      //     });
      //   },
      // },
    });

    chartRef.current = chart;

    // 캔들스틱
    candleRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // 라인
    lineRef.current = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
      visible: false,
    });

    // 거래량
    volumeRef.current = chart.addSeries(HistogramSeries, {
      priceScaleId: "",
      priceFormat: { type: "volume" },
    });
    chart.priceScale("right").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, []);

  // 데이터 업데이트
  useEffect(() => {
    if (!chartRef.current) return;
    candleRef.current.setData(candlestickData);
    lineRef.current.setData(lineData);
    volumeRef.current.setData(volumeData);
  }, [candlestickData, lineData, volumeData]);

  // 차트 타입 토글
  useEffect(() => {
    if (!candleRef.current || !lineRef.current) return;
    candleRef.current.applyOptions({ visible: chartType === "candlestick" });
    lineRef.current.applyOptions({ visible: chartType === "line" });
  }, [chartType]);

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setChartType("candlestick")}
          className={`px-3 py-1 rounded ${
            chartType === "candlestick"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          캔들스틱
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`px-3 py-1 rounded ${
            chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          라인
        </button>
      </div>
      <div
        ref={chartContainerRef}
        className="w-full h-[400px] border border-gray-300 rounded"
      />
    </div>
  );
};

export default StockTradingChart;
