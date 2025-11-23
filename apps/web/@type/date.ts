// 문자열 기반 연/월
export interface YearMonthProps {
  year: string;
  month: string;
}

// 문자열 기반 연/월/일
export interface YearMonthDayProps extends YearMonthProps {
  day: string;
}

// 숫자 기반 연/월
export interface YearMonthNumeric {
  year: number;
  month: number;
}
// 숫자 기반 연/월/일
export interface YearMonthDayNumeric extends YearMonthNumeric {
  day: number;
}
