import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

export enum PeriodType {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export const getDateRange = (date: Date, period: PeriodType) => {
  switch (period) {
    case PeriodType.Daily:
      return { start: startOfDay(date), end: endOfDay(date) };
    case PeriodType.Weekly:
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case PeriodType.Monthly:
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
  }
};
