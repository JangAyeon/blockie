// utils/formatters.ts
const defaultCurrencyMap: Record<string, string> = {
  ko: "KRW",
  en: "USD",
};

const defaultLocaleMap: Record<string, string> = {
  ko: "ko-KR",
  en: "en-US",
  zh: "zh-CN",
};
// ₩123,456 형식
export const formatWithCurrencySymbol = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(amount);
};
export const getCurrencySymbol = (locale: string): string => {
  const lang: string = locale ?? "ko"; // fallback "ko"
  const currency = defaultCurrencyMap[lang]; // fallback
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatToParts(0);

  return parts.find((p) => p.type === "currency")?.value || "";
};
export const formatNumberWithCommas = (value: string): string => {
  // 1. 숫자만 추출
  let digits = value.replace(/\D/g, "");
  // 2. 선행 0 제거 (단, 전체가 "0"인 경우는 유지)
  digits = digits.replace(/^0+(?=\d)/, "");
  // 4. 3자리마다 콤마 삽입
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 123,456 형식
export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

// 날짜 format 함수
export const formatDate = (dateString: string, locale: string = "ko") => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(defaultLocaleMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
