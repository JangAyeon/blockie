import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateExpenseRecord } from 'src/utils/expense/calculate-expense-record.util';
import { getDateRange, PeriodType } from 'src/utils/expense/date-range.util';
import { findExpensesInRange } from 'src/utils/expense/find-expense-inrange.util';

@Injectable()
export class ExpenseStatsService {
  constructor(private prisma: PrismaService) {}

  private async getStatsByPeriod(
    userId: string,
    targetDate: Date,
    period: PeriodType,
  ) {
    const { start, end } = getDateRange(targetDate, period);
    const expenses = await findExpensesInRange(this.prisma, userId, start, end);
    const { total, count, average } = calculateExpenseRecord(expenses);
    return { total, count, average, expenses };
  }

  async getDailyStats(
    userId: string,
    year: number,
    month: number,
    day: number,
  ) {
    const targetDate = new Date(year, month - 1, day);

    // const { start, end } = getDateRange(targetDate, PeriodType.Daily);

    // const start = startOfDay(targetDate);
    // const end = endOfDay(targetDate);

    // const expenses = await this.prisma.expense.findMany({
    //   where: {
    //     userId,
    //     expenseDate: {
    //       gte: start,
    //       lte: end,
    //     },
    //   },
    //   orderBy: { expenseDate: 'asc' },
    // });

    // const expenses = await findExpensesInRange(this.prisma, userId, start, end);

    // // const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    // // return { total, expenses };
    // const { total, count, average } = calculateExpenseRecord(expenses);
    // return { total, count, average, expenses };
    return this.getStatsByPeriod(userId, targetDate, PeriodType.Daily);
  }

  async getWeeklyStats(
    userId: string,
    year: number,
    month: number,
    day: number,
  ) {
    const targetDate = new Date(year, month - 1, day);

    // const { start, end } = getDateRange(targetDate, PeriodType.Weekly);

    // const start = startOfWeek(targetDate, {
    //   weekStartsOn: 1, // 월요일 시작
    // });

    // const end = endOfWeek(targetDate, {
    //   weekStartsOn: 1,
    // });
    // const expenses = await this.prisma.expense.findMany({
    //   where: {
    //     userId,
    //     expenseDate: {
    //       gte: start,
    //       lte: end,
    //     },
    //   },
    //   orderBy: { expenseDate: 'asc' },
    // });

    // const expenses = await findExpensesInRange(this.prisma, userId, start, end);

    // // const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    // // return { total, expenses };
    // const { total, count, average } = calculateExpenseRecord(expenses);
    // return { total, count, average, expenses };
    return this.getStatsByPeriod(userId, targetDate, PeriodType.Weekly);
  }

  async getMonthlyStats(
    userId: string,
    year: number,
    month: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    day: number,
  ) {
    const targetDate = new Date(year, month - 1, 1);
    // const { start, end } = getDateRange(targetDate, PeriodType.Monthly);
    // const start = startOfMonth(new Date(year, month - 1, 1));
    // const end = endOfMonth(new Date(year, month - 1, 1));

    // const expenses = await this.prisma.expense.findMany({
    //   where: {
    //     userId,
    //     expenseDate: {
    //       gte: start,
    //       lte: end,
    //     },
    //   },
    //   orderBy: { expenseDate: 'asc' },
    // });
    // const expenses = await findExpensesInRange(this.prisma, userId, start, end);

    // // const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    // // // console.log('#######', start, end);
    // // // console.log(expenses);
    // // return { total, expenses };
    // const { total, count, average } = calculateExpenseRecord(expenses);
    // return { total, count, average, expenses };
    return this.getStatsByPeriod(userId, targetDate, PeriodType.Monthly);
  }
  async getCategoryStats(userId: string, year: number, month: number) {
    const targetDate = new Date(year, month - 1);

    const { start, end } = getDateRange(targetDate, PeriodType.Monthly);
    // const start = startOfMonth(targetDate);
    // const end = endOfMonth(targetDate);

    // 1) Prisma에서 카테고리별 합계 + 건수를 바로 집계
    const grouped = await this.prisma.expense.groupBy({
      by: ['category'],
      where: {
        userId,
        expenseDate: {
          gte: start,
          lte: end,
        },
      },
      _sum: { amount: true },
      _count: { amount: true },
    });

    // 집계할 데이터가 없다면 빈 데이터 반환
    if (grouped.length === 0) {
      return {
        totalAmount: 0,
        totalCount: 0,
        categories: [],
      };
    }

    // 2) 전체 금액
    const totalAmount = grouped.reduce(
      (sum, c) => sum + (c._sum.amount ?? 0),
      0,
    );
    const totalCount = grouped.reduce((sum, c) => sum + c._count.amount, 0);

    // 3) 카테고리별 비율 포함 데이터 변환
    const categories = grouped
      .map((c) => ({
        category: c.category,
        amount: c._sum.amount ?? 0,
        count: c._count.amount,
        percentage:
          totalAmount > 0 ? ((c._sum.amount ?? 0) / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount); // 가장 많이 쓴 카테고리 순으로 정렬

    return {
      totalAmount,
      totalCount,
      categories,
    };
  }
}
