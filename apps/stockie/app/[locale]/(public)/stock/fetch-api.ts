import {
  InquireDailyItemChartPriceResponse,
  KISAccessTokenResponse,
  StockPriceResponse,
} from "@repo/types";
import { TradeViewMinute, TradeViewPeriod } from "./types";
const localhost = "http://localhost:3001";
const accessToken = `biIsImF1ZCI6ImI1NDdhYTlmLTdlNTgtNGTEzZiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTc1ODcyOTMzMywiaWF0IjoxNzU4NjQyOTMzLCJqdGkiOiJQU1VWb0xEbFpZSUNNbG9sN21OMFFXbU1qNHZDaEQ2QmhWSTIifQ.lTA8K8oa2JVkDtQ5cCXNNXtQs5TQOMz7BPNyRAQbff3sNlR6K-egf2M4O_gIT2H6zxjV62o_lgJeTHg9NbR98w`;
// KIS API 액세스 토큰 발급
export const getKISToken = async (): Promise<string> => {
  // TODO: response type: KISAccessTokenResponse
  try {
    // 실제 구현시에는 서버에서 토큰을 받아와야 함
    return accessToken;
  } catch (err) {
    throw new Error("KIS API 연결 실패");
  }
};

// 주식 현재가 조회
export const getCurrentPrice = async (
  token: string,
  stockCode: string
): Promise<StockPriceResponse> => {
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
export const getTradeChart = async (
  token: string,
  stockCode: string,
  // startDate: Date,
  endDate: Date,
  period: TradeViewPeriod | TradeViewMinute = "D"
): Promise<InquireDailyItemChartPriceResponse> => {
  // 오늘 날짜와 100일 전 날짜 계산
  // const today = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - 200); // 100일 전

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10).replace(/-/g, "");
  };
  // const endDate = new Date(today);
  // endDate.setDate(today.getDate() - 100); // 100일 전
  const endDateStr = formatDate(endDate);
  const startDateStr = formatDate(startDate);
  console.log(
    "get chart data",
    `${localhost}/stock/trade-view/${stockCode}?period=${period}&startDate=${startDateStr}&endDate=${endDateStr}`
  );
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
