import {
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getWeek,
  endOfDay,
  format,
} from 'date-fns';

import { PeriodType } from '../state/date-range.util';
import { Expense } from '@prisma/client';
import { TrendDataPoint } from './trend.util';

/*
getPeriodStart(), getPeriodEnd()

generateDataPoints()

startOfPeriod, endOfPeriod 계산 관련 헬퍼
*/
export const getPeriodStart = (
  dataPoint: TrendDataPoint,
  periodType: PeriodType,
): Date => {
  if (periodType === PeriodType.Monthly) {
    return new Date(dataPoint.year, dataPoint.periodNumber - 1, 1);
  } else if (periodType === PeriodType.Weekly) {
    // 주차를 기준으로 월요일 계산 (복잡한 로직이므로 간단히 처리)
    return new Date(dataPoint.period + '-01'); // 임시
  } else {
    return new Date(dataPoint.period);
  }
};

export const getPeriodEnd = (
  dataPoint: TrendDataPoint,
  periodType: PeriodType,
): Date => {
  const start = getPeriodStart(dataPoint, periodType);
  if (periodType === PeriodType.Monthly) {
    return endOfMonth(start);
  } else if (periodType === PeriodType.Weekly) {
    return endOfWeek(start, { weekStartsOn: 1 });
  } else {
    return endOfDay(start);
  }
};
export const generateDataPoints = (
  expenses: Expense[],
  startDate: Date,
  endDate: Date,
  periodType: PeriodType,
) => {
  let intervals: Date[];

  if (periodType === PeriodType.Monthly) {
    intervals = eachMonthOfInterval({ start: startDate, end: endDate });
  } else if (periodType === PeriodType.Weekly) {
    intervals = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 },
    );
  } else {
    intervals = eachDayOfInterval({ start: startDate, end: endDate });
  }

  return intervals.map((intervalStart) => {
    let intervalEnd: Date;
    let periodLabel: string;
    let periodNumber: number;

    if (periodType === PeriodType.Monthly) {
      intervalEnd = endOfMonth(intervalStart);
      periodLabel = format(intervalStart, 'yyyy-MM');
      periodNumber = intervalStart.getMonth() + 1;
    } else if (periodType === PeriodType.Weekly) {
      intervalEnd = endOfWeek(intervalStart, { weekStartsOn: 1 });
      const weekNumber = getWeek(intervalStart, { weekStartsOn: 1 });
      periodLabel = `${format(intervalStart, 'yyyy')}-W${weekNumber.toString().padStart(2, '0')}`;
      periodNumber = weekNumber;
    } else {
      intervalEnd = endOfDay(intervalStart);
      periodLabel = format(intervalStart, 'yyyy-MM-dd');
      periodNumber = intervalStart.getDate();
    }

    // 해당 기간의 지출 필터링
    const periodExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);
      return expenseDate >= intervalStart && expenseDate <= intervalEnd;
    });

    const totalAmount = periodExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0,
    );
    const count = periodExpenses.length;
    const averageAmount = count > 0 ? Math.round(totalAmount / count) : 0;

    return {
      period: periodLabel,
      amount: totalAmount,
      count,
      averageAmount,
      year: intervalStart.getFullYear(),
      periodNumber,
    };
  });
};
