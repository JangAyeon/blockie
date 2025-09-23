import { UTCTimestamp } from "lightweight-charts";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(amount);
};

// 시간 변환 함수
export const toTimestamp = (dateStr: string): UTCTimestamp => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  return Math.floor(date.getTime() / 1000) as UTCTimestamp;
};
