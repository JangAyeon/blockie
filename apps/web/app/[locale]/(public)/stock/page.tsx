// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   createChart,
//   CandlestickData,
//   CandlestickSeries,
//   HistogramData,
//   LineSeries,
//   HistogramSeries,
//   LineData,
//   UTCTimestamp,
// } from "lightweight-charts";

// // 타입 정의
// interface StockOrderCashOutput1 {
//   prdy_vrss: string;
//   prdy_vrss_sign: string;
//   prdy_ctrt: string;
//   stck_prdy_clpr: string;
//   acml_vol: string;
//   acml_tr_pbmn: string;
//   hts_kor_isnm: string;
//   stck_prpr: string;
// }

// interface StockOrderCashOutput2 {
//   stck_bsop_date: string;
//   stck_cntg_hour: string;
//   stck_prpr: string;
//   stck_oprc: string;
//   stck_hgpr: string;
//   stck_lwpr: string;
//   cntg_vol: string;
//   acml_tr_pbmn: string;
// }

// interface StockTimeResponse {
//   rt_cd: string;
//   msg_cd: string;
//   msg1: string;
//   output1: StockOrderCashOutput1;
//   output2: StockOrderCashOutput2[];
// }

// // 샘플 데이터
// const sampleData1: StockTimeResponse = {
//   output1: {
//     prdy_vrss: "1500",
//     prdy_vrss_sign: "2",
//     prdy_ctrt: "2.22",
//     stck_prdy_clpr: "67600",
//     acml_vol: "10604028",
//     acml_tr_pbmn: "731582866980",
//     hts_kor_isnm: "삼성전자",
//     stck_prpr: "69100",
//   },
//   output2: [
//     // {
//     //   stck_bsop_date: "20250902",
//     //   stck_cntg_hour: "090000",
//     //   stck_prpr: "68100",
//     //   stck_oprc: "67800",
//     //   stck_hgpr: "68100",
//     //   stck_lwpr: "67800",
//     //   cntg_vol: "230069",
//     //   acml_tr_pbmn: "15610102100",
//     // },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "153000",
//       stck_prpr: "67600",
//       stck_oprc: "67600",
//       stck_hgpr: "67600",
//       stck_lwpr: "67600",
//       cntg_vol: "908291",
//       acml_tr_pbmn: "815188886300",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152900",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152800",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152700",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152600",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152500",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152400",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152300",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152200",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152100",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "152000",
//       stck_prpr: "67700",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67700",
//       cntg_vol: "0",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151900",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "32732",
//       acml_tr_pbmn: "753788414700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151800",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "16698",
//       acml_tr_pbmn: "751574372800",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151700",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "26741",
//       acml_tr_pbmn: "750445177100",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151600",
//       stck_prpr: "67600",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "22722",
//       acml_tr_pbmn: "748636172800",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151500",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "17020",
//       acml_tr_pbmn: "747099763350",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151400",
//       stck_prpr: "67600",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "32370",
//       acml_tr_pbmn: "745948886250",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151300",
//       stck_prpr: "67600",
//       stck_oprc: "67650",
//       stck_hgpr: "67650",
//       stck_lwpr: "67600",
//       cntg_vol: "20581",
//       acml_tr_pbmn: "743760087700",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151200",
//       stck_prpr: "67600",
//       stck_oprc: "67600",
//       stck_hgpr: "67650",
//       stck_lwpr: "67600",
//       cntg_vol: "22118",
//       acml_tr_pbmn: "742368632250",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151100",
//       stck_prpr: "67650",
//       stck_oprc: "67650",
//       stck_hgpr: "67650",
//       stck_lwpr: "67600",
//       cntg_vol: "39146",
//       acml_tr_pbmn: "740873221900",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "151000",
//       stck_prpr: "67650",
//       stck_oprc: "67600",
//       stck_hgpr: "67650",
//       stck_lwpr: "67600",
//       cntg_vol: "16801",
//       acml_tr_pbmn: "738226115300",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150900",
//       stck_prpr: "67650",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "10492",
//       acml_tr_pbmn: "737090224100",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150800",
//       stck_prpr: "67650",
//       stck_oprc: "67650",
//       stck_hgpr: "67650",
//       stck_lwpr: "67600",
//       cntg_vol: "14016",
//       acml_tr_pbmn: "736380706950",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150700",
//       stck_prpr: "67650",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "5525",
//       acml_tr_pbmn: "735432995200",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150600",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "37936",
//       acml_tr_pbmn: "735059248950",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150500",
//       stck_prpr: "67600",
//       stck_oprc: "67650",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "10470",
//       acml_tr_pbmn: "732492018400",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150400",
//       stck_prpr: "67600",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "25609",
//       acml_tr_pbmn: "731783900400",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150300",
//       stck_prpr: "67700",
//       stck_oprc: "67600",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "42809",
//       acml_tr_pbmn: "730051346000",
//     },
//     {
//       stck_bsop_date: "20250901",
//       stck_cntg_hour: "150200",
//       stck_prpr: "67600",
//       stck_oprc: "67700",
//       stck_hgpr: "67700",
//       stck_lwpr: "67600",
//       cntg_vol: "12955",
//       acml_tr_pbmn: "727154201950",
//     },
//   ],
//   rt_cd: "0",
//   msg_cd: "MCA00000",
//   msg1: "정상처리 되었습니다.",
// };

// const sampleData2: StockTimeResponse = {
//   rt_cd: "0",
//   msg_cd: "MCA00000",
//   msg1: "정상처리 되었습니다.",
//   output1: {
//     prdy_vrss: "1500",
//     prdy_vrss_sign: "2",
//     prdy_ctrt: "2.15",
//     stck_prdy_clpr: "69500",
//     acml_vol: "1234567",
//     acml_tr_pbmn: "85647291000",
//     hts_kor_isnm: "삼성전자",
//     stck_prpr: "71000",
//   },
//   output2: [
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "090000",
//       stck_prpr: "69800",
//       stck_oprc: "69500",
//       stck_hgpr: "70200",
//       stck_lwpr: "69300",
//       cntg_vol: "12345",
//       acml_tr_pbmn: "861234000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "093000",
//       stck_prpr: "70100",
//       stck_oprc: "69800",
//       stck_hgpr: "70300",
//       stck_lwpr: "69700",
//       cntg_vol: "15678",
//       acml_tr_pbmn: "1098765000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "100000",
//       stck_prpr: "70500",
//       stck_oprc: "70100",
//       stck_hgpr: "70800",
//       stck_lwpr: "70000",
//       cntg_vol: "18234",
//       acml_tr_pbmn: "1285432000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "103000",
//       stck_prpr: "70200",
//       stck_oprc: "70500",
//       stck_hgpr: "70600",
//       stck_lwpr: "69900",
//       cntg_vol: "14567",
//       acml_tr_pbmn: "1456789000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "110000",
//       stck_prpr: "71000",
//       stck_oprc: "70200",
//       stck_hgpr: "71200",
//       stck_lwpr: "70100",
//       cntg_vol: "22345",
//       acml_tr_pbmn: "1678901000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "113000",
//       stck_prpr: "70800",
//       stck_oprc: "71000",
//       stck_hgpr: "71100",
//       stck_lwpr: "70700",
//       cntg_vol: "16789",
//       acml_tr_pbmn: "1834567000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "120000",
//       stck_prpr: "70600",
//       stck_oprc: "70800",
//       stck_hgpr: "70900",
//       stck_lwpr: "70400",
//       cntg_vol: "13456",
//       acml_tr_pbmn: "1978234000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "123000",
//       stck_prpr: "70900",
//       stck_oprc: "70600",
//       stck_hgpr: "71000",
//       stck_lwpr: "70500",
//       cntg_vol: "19876",
//       acml_tr_pbmn: "2145678000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "130000",
//       stck_prpr: "71200",
//       stck_oprc: "70900",
//       stck_hgpr: "71300",
//       stck_lwpr: "70800",
//       cntg_vol: "21234",
//       acml_tr_pbmn: "2345789000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "133000",
//       stck_prpr: "71100",
//       stck_oprc: "71200",
//       stck_hgpr: "71250",
//       stck_lwpr: "70950",
//       cntg_vol: "17890",
//       acml_tr_pbmn: "2567890000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "140000",
//       stck_prpr: "70950",
//       stck_oprc: "71100",
//       stck_hgpr: "71150",
//       stck_lwpr: "70800",
//       cntg_vol: "15432",
//       acml_tr_pbmn: "2698765000",
//     },
//     {
//       stck_bsop_date: "20241201",
//       stck_cntg_hour: "143000",
//       stck_prpr: "71050",
//       stck_oprc: "70950",
//       stck_hgpr: "71200",
//       stck_lwpr: "70900",
//       cntg_vol: "18765",
//       acml_tr_pbmn: "2834567000",
//     },
//   ],
// };

// // Lightweight Charts 모킹 (실제로는 npm install lightweight-charts 필요)

// // 한국시각 → timestamp (UTC 변환 없음)
// const toKSTTimestamp = (date: string, time: string): UTCTimestamp => {
//   const kst = new Date(
//     `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T${time.slice(
//       0,
//       2
//     )}:${time.slice(2, 4)}:00+09:00`
//   );
//   return Math.floor(kst.getTime() / 1000) as UTCTimestamp;
// };

// // const StockTradingChart: React.FC = () => {
// //   const chartContainerRef = useRef<HTMLDivElement>(null);
// //   const chartRef = useRef<any>(null);
// //   const candlestickSeriesRef = useRef<any>(null);
// //   const lineSeriesRef = useRef<any>(null);
// //   const volumeSeriesRef = useRef<any>(null);

// //   const [stockData] = useState<StockTimeResponse>(sampleData);
// //   const [chartType, setChartType] = useState<"candlestick" | "line">(
// //     "candlestick"
// //   );

// //   // 데이터 변환
// //   const candlestickData: CandlestickData[] = stockData.output2.map((item) => ({
// //     time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
// //     open: parseFloat(item.stck_oprc),
// //     high: parseFloat(item.stck_hgpr),
// //     low: parseFloat(item.stck_lwpr),
// //     close: parseFloat(item.stck_prpr),
// //   }));

// //   const volumeData: HistogramData[] = stockData.output2.map((item) => {
// //     const open = parseFloat(item.stck_oprc);
// //     const close = parseFloat(item.stck_prpr);
// //     return {
// //       time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
// //       value: parseInt(item.cntg_vol),
// //       color: close >= open ? "#26a69a" : "#ef5350",
// //     };
// //   });

// //   const lineData: LineData[] = stockData.output2.map((item) => ({
// //     time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
// //     value: parseFloat(item.stck_prpr),
// //   }));

// //   // 차트 초기화
// //   useEffect(() => {
// //     if (!chartContainerRef.current || chartRef.current) return;

// //     const chart = createChart(chartContainerRef.current, {
// //       width: chartContainerRef.current.clientWidth,
// //       height: 400,
// //       layout: {
// //         background: { color: "white" },
// //         textColor: "#333",
// //       },
// //       grid: {
// //         vertLines: { color: "#f0f0f0" },
// //         horzLines: { color: "#f0f0f0" },
// //       },
// //       crosshair: { mode: 1 },
// //       rightPriceScale: { borderColor: "#cccccc" },
// //       timeScale: { borderColor: "#cccccc", timeVisible: true },
// //     });
// //     chart.applyOptions({
// //       timeScale: {
// //         timeVisible: true,
// //         secondsVisible: false,
// //       },
// //       localization: {
// //         timeFormatter: (time: UTCTimestamp) => {
// //           const date = new Date(time * 1000); // timestamp → Date
// //           return date.toLocaleString("ko-KR", {
// //             timeZone: "Asia/Seoul",
// //             hour12: false,
// //             month: "2-digit",
// //             day: "2-digit",
// //             hour: "2-digit",
// //             minute: "2-digit",
// //           });
// //         },
// //       },
// //     });
// //     chartRef.current = chart;

// //     // 시리즈 추가
// //     candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
// //       upColor: "#26a69a",
// //       downColor: "#ef5350",
// //       borderDownColor: "#ef5350",
// //       borderUpColor: "#26a69a",
// //       wickDownColor: "#ef5350",
// //       wickUpColor: "#26a69a",
// //     });

// //     lineSeriesRef.current = chart.addSeries(LineSeries, {
// //       color: "#2962FF",
// //       lineWidth: 2,
// //       visible: false, // 기본은 숨김
// //     });

// //     volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
// //       priceScaleId: "",
// //       priceFormat: { type: "volume" },
// //     });
// //     volumeSeriesRef.current.priceScale().applyOptions({
// //       scaleMargins: { top: 0.85, bottom: 0 },
// //     });

// //     chart.timeScale().fitContent();

// //     const handleResize = () => {
// //       if (chartContainerRef.current) {
// //         chart.applyOptions({ width: chartContainerRef.current.clientWidth });
// //       }
// //     };
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //       chart.remove();
// //       chartRef.current = null;
// //     };
// //   }, []);

// //   // 데이터 업데이트
// //   useEffect(() => {
// //     if (!chartRef.current) return;
// //     candlestickSeriesRef.current.setData(candlestickData);
// //     lineSeriesRef.current.setData(lineData);
// //     volumeSeriesRef.current.setData(volumeData);
// //   }, [candlestickData, lineData, volumeData]);

// //   // 차트 타입 토글
// //   useEffect(() => {
// //     if (!candlestickSeriesRef.current || !lineSeriesRef.current) return;
// //     if (chartType === "candlestick") {
// //       candlestickSeriesRef.current.applyOptions({ visible: true });
// //       lineSeriesRef.current.applyOptions({ visible: false });
// //     } else {
// //       candlestickSeriesRef.current.applyOptions({ visible: false });
// //       lineSeriesRef.current.applyOptions({ visible: true });
// //     }
// //   }, [chartType]);

// //   return (
// //     <div className="p-6">
// //       <div className="mb-4 flex space-x-2">
// //         <button
// //           onClick={() => setChartType("candlestick")}
// //           className={`px-3 py-1 rounded ${
// //             chartType === "candlestick"
// //               ? "bg-blue-500 text-white"
// //               : "bg-gray-200"
// //           }`}
// //         >
// //           캔들스틱
// //         </button>
// //         <button
// //           onClick={() => setChartType("line")}
// //           className={`px-3 py-1 rounded ${
// //             chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           라인
// //         </button>
// //       </div>
// //       <div
// //         ref={chartContainerRef}
// //         className="w-full h-[400px] border border-gray-300 rounded"
// //       />
// //     </div>
// //   );
// // };

// // export default StockTradingChart;
// const StockTradingChart: React.FC = () => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<any>(null);
//   const candleRef = useRef<any>(null);
//   const lineRef = useRef<any>(null);
//   const volumeRef = useRef<any>(null);

//   const [stockData] = useState<StockTimeResponse>(sampleData2);
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

//   const lineData: LineData[] = stockData.output2.map((item) => ({
//     time: toKSTTimestamp(item.stck_bsop_date, item.stck_cntg_hour),
//     value: parseFloat(item.stck_prpr),
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

//   // 차트 초기화
//   useEffect(() => {
//     if (!chartContainerRef.current || chartRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: 400,
//       layout: { background: { color: "white" }, textColor: "#333" },
//       grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
//       crosshair: { mode: 1 },
//       rightPriceScale: { borderColor: "#ccc" },
//       timeScale: { borderColor: "#ccc", timeVisible: true },
//       // localization: {
//       //   timeFormatter: (time: UTCTimestamp) => {
//       //     const date = new Date(time * 1000);
//       //     return date.toLocaleString("ko-KR", {
//       //       timeZone: "Asia/Seoul",
//       //       hour12: false,
//       //       month: "2-digit",
//       //       day: "2-digit",
//       //       hour: "2-digit",
//       //       minute: "2-digit",
//       //     });
//       //   },
//       // },
//     });

//     chartRef.current = chart;

//     // 캔들스틱
//     candleRef.current = chart.addSeries(CandlestickSeries, {
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderUpColor: "#26a69a",
//       borderDownColor: "#ef5350",
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });

//     // 라인
//     lineRef.current = chart.addSeries(LineSeries, {
//       color: "#2962FF",
//       lineWidth: 2,
//       visible: false,
//     });

//     // 거래량
//     volumeRef.current = chart.addSeries(HistogramSeries, {
//       priceScaleId: "",
//       priceFormat: { type: "volume" },
//     });
//     chart.priceScale("right").applyOptions({
//       scaleMargins: {
//         top: 0.8,
//         bottom: 0,
//       },
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
//     candleRef.current.setData(candlestickData);
//     lineRef.current.setData(lineData);
//     volumeRef.current.setData(volumeData);
//   }, [candlestickData, lineData, volumeData]);

//   // 차트 타입 토글
//   useEffect(() => {
//     if (!candleRef.current || !lineRef.current) return;
//     candleRef.current.applyOptions({ visible: chartType === "candlestick" });
//     lineRef.current.applyOptions({ visible: chartType === "line" });
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
} from "lightweight-charts";

// KIS API 응답 타입 정의 (기존 코드 기반)
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

interface KISDailyChartResponse {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output2: Array<{
    stck_bsop_date: string; // 영업일자
    stck_clpr: string; // 종가
    stck_oprc: string; // 시가
    stck_hgpr: string; // 고가
    stck_lwpr: string; // 저가
    acml_vol: string; // 누적거래량
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
  // KIS API 액세스 토큰 발급
  const getKISToken = async (): Promise<string> => {
    try {
      // const response = await fetch("/api/stock/accessToken", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      // });

      // const data = await response.json();
      // if (data.access_token) {
      //   return data.access_token;
      // }
      return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImZlZDQyNWYyLTIwZWQtNDg0MS1hMGU2LTkxMDc5ZTZlOTA0NCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTc1NzQzMDI3MiwiaWF0IjoxNzU3MzQzODcyLCJqdGkiOiJQU1VWb0xEbFpZSUNNbG9sN21OMFFXbU1qNHZDaEQ2QmhWSTIifQ.XDM6pCJY_iLK2hu8dl7lnSiLrRo_5RwfuUvY6Gsq3VjsES-KAenGzHVFR-de_NxHitcRJJJhSNnXZdIuOoF7Yg`;
      throw new Error("토큰 발급 실패");
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

  // 일봉 차트 데이터 조회
  const getDailyChart = async (
    token: string,
    stockCode: string,
    period: string = "D"
  ): Promise<KISDailyChartResponse> => {
    const response = await fetch(
      `${localhost}/stock/daily/${stockCode}?period=${period}`,
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
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#cccccc" },
      timeScale: { borderColor: "#cccccc", timeVisible: true },
      localization: {
        priceFormatter: (price: number) => {
          return new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
            minimumFractionDigits: 0,
          }).format(price);
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
    if (!accessToken || !chartRef.current) return;

    try {
      const chartData = await getDailyChart(accessToken, stock.code, "D");

      const candlestickData: CandlestickData[] = chartData.output2
        .map((item) => ({
          time: toTimestamp(item.stck_bsop_date),
          open: parseFloat(item.stck_oprc),
          high: parseFloat(item.stck_hgpr),
          low: parseFloat(item.stck_lwpr),
          close: parseFloat(item.stck_clpr),
        }))
        .reverse(); // 최신 데이터가 마지막에 오도록

      const volumeData: HistogramData[] = chartData.output2
        .map((item) => {
          const open = parseFloat(item.stck_oprc);
          const close = parseFloat(item.stck_clpr);
          return {
            time: toTimestamp(item.stck_bsop_date),
            value: parseInt(item.acml_vol),
            color: close >= open ? "#ef4444" : "#3b82f6",
          };
        })
        .reverse();

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
          💰 절약 금액 투자 시뮬레이터
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
              🎯 구매 가능한 주식
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
                📈 투자 시뮬레이션 실행
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 차트 섹션 */}
      <AnimatePresence>
        {selectedStock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                📊 {selectedStock.name} 차트
              </h2>
            </div>
            <div
              ref={chartContainerRef}
              className="w-full h-[400px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center"
            ></div>
          </motion.div>
        )}
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
              🚀 투자 시뮬레이션 결과
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
                ⚠️ 이 시뮬레이션은 과거 데이터를 기반으로 한 가상의 계산입니다.
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
