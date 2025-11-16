/**
 * 
 * - getTrendAnalysis()
- generateDataPoints()
- analyzeTrend()
- analyzeCategoryTrends()
- analyzeVolatility()
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subWeeks,
  subDays,
} from 'date-fns';
import { PeriodType } from 'src/utils/expense/state/date-range.util';

import { findExpensesInRange } from 'src/utils/expense/state/find-expense-inrange.util';
import { generateDataPoints } from 'src/utils/expense/trend/period.util';
import {
  analyzeCategoryTrends,
  analyzeTrend,
  analyzeVolatility,
  predictNextPeriod,
} from 'src/utils/expense/trend/trend.util';
import { generateInsights } from 'src/utils/expense/trend/insights.util';

@Injectable()
export class ExpenseTrendService {
  constructor(private prisma: PrismaService) {}

  // 헬퍼 메서드들

  async getTrendAnalysis(
    userId: string,
    options: {
      months?: number;
      period?: PeriodType;
      startYear?: number;
      startMonth?: number;
      endYear?: number;
      endMonth?: number;
    },
  ) {
    const periodType = options.period || PeriodType.Monthly;
    const months = options.months || 6;

    // 날짜 범위 결정
    let startDate: Date;
    let endDate: Date;

    if (
      options.startYear &&
      options.startMonth &&
      options.endYear &&
      options.endMonth
    ) {
      startDate = new Date(options.startYear, options.startMonth - 1, 1);
      endDate = endOfMonth(new Date(options.endYear, options.endMonth - 1, 1));
    } else {
      const now = new Date();
      endDate = endOfMonth(now);

      if (periodType === PeriodType.Monthly) {
        startDate = startOfMonth(subMonths(now, months - 1));
      } else if (periodType === PeriodType.Weekly) {
        startDate = startOfWeek(subWeeks(now, months * 4 - 1), {
          weekStartsOn: 1,
        });
      } else {
        startDate = startOfDay(subDays(now, months * 30 - 1));
      }
    }

    // 전체 지출 데이터 조회
    // const allExpenses = await this.prisma.expense.findMany({
    //   where: {
    //     userId,
    //     expenseDate: { gte: startDate, lte: endDate },
    //   },
    //   orderBy: { expenseDate: 'asc' },
    // });
    const allExpenses = await findExpensesInRange(
      this.prisma,
      userId,
      startDate,
      endDate,
    );

    // 기간별 데이터 포인트 생성
    const dataPoints = generateDataPoints(
      allExpenses,
      startDate,
      endDate,
      periodType,
    );

    // 전체 트렌드 분석
    const trendAnalysis = analyzeTrend(dataPoints);

    // 카테고리별 트렌드 분석
    const categoryTrends = analyzeCategoryTrends(
      allExpenses,
      dataPoints,
      periodType,
    );

    // 변동성 분석
    const volatilityAnalysis = analyzeVolatility(dataPoints);

    // 예측 및 인사이트 생성
    const prediction = predictNextPeriod(dataPoints);
    const insights = generateInsights(
      dataPoints,
      categoryTrends,
      trendAnalysis,
    );

    return {
      dataPoints,
      periodType,
      totalPeriods: dataPoints.length,
      ...trendAnalysis,
      ...volatilityAnalysis,
      categoryTrends,
      ...prediction,
      ...insights,
      startDate,
      endDate,
    };
  }
}
