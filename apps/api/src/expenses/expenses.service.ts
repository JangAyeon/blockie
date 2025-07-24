import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { UpdateExpensesDto } from './dto/update-expenses.dto';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subWeeks,
  subDays,
  format,
  getWeek,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachDayOfInterval,
} from 'date-fns';
@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  // ✅ 사용자의 모든 지출 데이터를 조회
  async getExpensesByUser(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId }, // 해당 userId의 데이터만 필터링
      orderBy: { expenseDate: 'desc' }, // 최근 지출 순으로 정렬
    });
  }

  // ✅ 지출 생성 (항상 userId를 명시적으로 포함)
  async createExpense(userId: string, dto: CreateExpensesDto) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        userId, // 사용자의 지출로 연결
      },
    });
  }

  // ✅ 지출 수정 (본인의 데이터만 가능)
  async updateExpense(
    userId: string,
    expenseId: string,
    dto: UpdateExpensesDto,
  ) {
    const expense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    });

    console.log('##$$$ ', expense);

    if (!expense || expense.userId !== userId) {
      throw new ForbiddenException('이 지출 항목에 대한 권한이 없습니다.');
    }

    return this.prisma.expense.update({
      where: { id: expenseId },
      data: dto,
    });
  }

  // ✅ 지출 삭제 (본인의 데이터만 가능)
  async deleteExpense(userId: string, expenseId: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!expense || expense.userId !== userId) {
      throw new ForbiddenException('이 지출 항목에 대한 권한이 없습니다.');
    }

    return this.prisma.expense.delete({
      where: { id: expenseId },
    });
  }
  async getDailyStats(userId: string, date: Date) {
    const start = startOfDay(date);
    const end = endOfDay(date);

    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        expenseDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { expenseDate: 'asc' },
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return { total, expenses };
  }

  async getWeeklyStats(userId: string, date: Date) {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // 월요일 시작
    const end = endOfWeek(date, { weekStartsOn: 1 });

    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        expenseDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { expenseDate: 'asc' },
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return { total, expenses };
  }

  async getMonthlyStats(userId: string, date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        expenseDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { expenseDate: 'asc' },
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return { total, expenses };
  }
  async getCategoryStats(userId: string, year: number, month: number) {
    const start = startOfMonth(new Date(year, month - 1, 1));
    const end = endOfMonth(new Date(year, month - 1, 1));

    // 해당 월의 모든 지출 데이터 조회
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        expenseDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        amount: 'desc',
      },
    });

    if (expenses.length === 0) {
      return {
        totalAmount: 0,
        totalCount: 0,
        categories: [],
      };
    }

    // 카테고리별 집계
    const categoryMap = new Map<string, { amount: number; count: number }>();
    let totalAmount = 0;

    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = expense.amount;

      totalAmount += amount;

      if (categoryMap.has(category)) {
        const existing = categoryMap.get(category)!;
        categoryMap.set(category, {
          amount: existing.amount + amount,
          count: existing.count + 1,
        });
      } else {
        categoryMap.set(category, {
          amount: amount,
          count: 1,
        });
      }
    });

    // 결과 변환 및 정렬 (금액 기준 내림차순)
    const categories = Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        amount: data.amount,
        count: data.count,
        percentage: totalAmount > 0 ? (data.amount / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalAmount,
      totalCount: expenses.length,
      categories,
    };
  }

  async getTrendAnalysis(
    userId: string,
    options: {
      months?: number;
      period?: 'monthly' | 'weekly' | 'daily';
      startYear?: number;
      startMonth?: number;
      endYear?: number;
      endMonth?: number;
    },
  ) {
    const periodType = options.period || 'monthly';
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

      if (periodType === 'monthly') {
        startDate = startOfMonth(subMonths(now, months - 1));
      } else if (periodType === 'weekly') {
        startDate = startOfWeek(subWeeks(now, months * 4 - 1), {
          weekStartsOn: 1,
        });
      } else {
        startDate = startOfDay(subDays(now, months * 30 - 1));
      }
    }

    // 전체 지출 데이터 조회
    const allExpenses = await this.prisma.expense.findMany({
      where: {
        userId,
        expenseDate: { gte: startDate, lte: endDate },
      },
      orderBy: { expenseDate: 'asc' },
    });

    // 기간별 데이터 포인트 생성
    const dataPoints = this.generateDataPoints(
      allExpenses,
      startDate,
      endDate,
      periodType,
    );

    // 전체 트렌드 분석
    const trendAnalysis = this.analyzeTrend(dataPoints);

    // 카테고리별 트렌드 분석
    const categoryTrends = this.analyzeCategoryTrends(
      allExpenses,
      dataPoints,
      periodType,
    );

    // 변동성 분석
    const volatilityAnalysis = this.analyzeVolatility(dataPoints);

    // 예측 및 인사이트 생성
    const prediction = this.predictNextPeriod(dataPoints);
    const insights = this.generateInsights(
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
    };
  }

  private generateDataPoints(
    expenses: {
      id: string;
      amount: number;
      category: string;
      userId: string;
      createdAt: Date;
      expenseDate: Date;
    }[],
    startDate: Date,
    endDate: Date,
    periodType: 'monthly' | 'weekly' | 'daily',
  ) {
    let intervals: Date[];

    if (periodType === 'monthly') {
      intervals = eachMonthOfInterval({ start: startDate, end: endDate });
    } else if (periodType === 'weekly') {
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

      if (periodType === 'monthly') {
        intervalEnd = endOfMonth(intervalStart);
        periodLabel = format(intervalStart, 'yyyy-MM');
        periodNumber = intervalStart.getMonth() + 1;
      } else if (periodType === 'weekly') {
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
  }

  private analyzeTrend(
    dataPoints: {
      period: string;
      amount: number;
      count: number;
      averageAmount: number;
      year: number;
      periodNumber: number;
    }[],
  ) {
    if (dataPoints.length < 2) {
      return {
        averageSpending: 0,
        overallTrend: 'stable' as const,
        overallChangePercentage: 0,
        maxSpending: 0,
        minSpending: 0,
        maxSpendingPeriod: '',
        minSpendingPeriod: '',
      };
    }

    const amounts = dataPoints.map((dp) => dp.amount);
    const averageSpending = Math.round(
      amounts.reduce((a, b) => a + b, 0) / amounts.length,
    );

    // 최대/최소 지출 기간
    const maxSpending = Math.max(...amounts);
    const minSpending = Math.min(...amounts);
    const maxIndex = amounts.indexOf(maxSpending);
    const minIndex = amounts.indexOf(minSpending);

    // 선형 회귀로 트렌드 계산
    const n = dataPoints.length;
    const xSum = (n * (n - 1)) / 2; // 0, 1, 2, ... n-1의 합
    const ySum = amounts.reduce((a, b) => a + b, 0);
    const xySum = amounts.reduce(
      (sum, amount, index) => sum + amount * index,
      0,
    );
    const xSquareSum = (n * (n - 1) * (2 * n - 1)) / 6; // 0², 1², 2², ... (n-1)²의 합

    const slope = (n * xySum - xSum * ySum) / (n * xSquareSum - xSum * xSum);

    // 첫 번째와 마지막 값으로 변화율 계산
    const firstAmount = amounts[0];
    const lastAmount = amounts[amounts.length - 1];
    let changePercentage = 0;

    if (firstAmount > 0) {
      changePercentage = ((lastAmount - firstAmount) / firstAmount) * 100;
    }

    // TODO: 트렌드 판단 기준은 changePercentage인 경우
    // 즉, 첫 기간과 마지막 기간의 단순한 차이 비율로만 추세를 판별하고 있어서
    // 중간 기간의 데이터가 어떻게 분포됐든 반영되지 않습니다.
    // let overallTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    // if (Math.abs(changePercentage) > 5) {
    //   overallTrend = changePercentage > 0 ? 'increasing' : 'decreasing';
    // }

    // TODO: slope를 사용한 트렌드 판단
    // threshold는 원하는 민감도에 따라 0.5 ~ 1 정도의 숫자
    // 전체 흐름을 반영한 진짜 추세 분석이 가능
    // 전체 지출 경향 분석 가능
    const threshold = 0.5;
    let overallTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (Math.abs(slope) > threshold) {
      overallTrend = slope > 0 ? 'increasing' : 'decreasing';
    }

    return {
      averageSpending,
      overallTrend,
      overallChangePercentage: Math.round(changePercentage * 10) / 10,
      maxSpending,
      minSpending,
      maxSpendingPeriod: dataPoints[maxIndex].period,
      minSpendingPeriod: dataPoints[minIndex].period,
    };
  }

  private analyzeVolatility(
    dataPoints: {
      period: string;
      amount: number;
      count: number;
      averageAmount: number;
      year: number;
      periodNumber: number;
    }[],
  ) {
    if (dataPoints.length < 2) {
      return {
        volatility: 0,
        volatilityCoefficient: 0,
        volatilityLevel: 'low' as const,
      };
    }

    const amounts = dataPoints.map((dp) => dp.amount);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;

    // 표준편차 계산
    const variance =
      amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) /
      amounts.length;
    const volatility = Math.sqrt(variance);

    // 변동 계수 (CV) 계산
    const volatilityCoefficient = mean > 0 ? (volatility / mean) * 100 : 0;

    // 변동성 수준 분류
    let volatilityLevel: 'low' | 'moderate' | 'high' = 'low';
    if (volatilityCoefficient > 30) {
      volatilityLevel = 'high';
    } else if (volatilityCoefficient > 15) {
      volatilityLevel = 'moderate';
    }

    return {
      volatility: Math.round(volatility),
      volatilityCoefficient: Math.round(volatilityCoefficient * 10) / 10,
      volatilityLevel,
    };
  }

  private analyzeCategoryTrends(
    expenses: any[],
    dataPoints: any[],
    periodType: string,
  ) {
    // 카테고리별로 그룹화
    const categoriesMap = new Map<string, number[]>();

    // 각 기간의 카테고리별 지출 계산
    dataPoints.forEach((dp, index) => {
      const periodStart = this.getPeriodStart(dp, periodType);
      const periodEnd = this.getPeriodEnd(dp, periodType);

      const periodExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.expenseDate);
        return expenseDate >= periodStart && expenseDate <= periodEnd;
      });

      // 이 기간의 카테고리별 지출 집계
      const categoryAmounts = new Map<string, number>();
      periodExpenses.forEach((expense) => {
        const current = categoryAmounts.get(expense.category) || 0;
        categoryAmounts.set(expense.category, current + expense.amount);
      });

      // 모든 카테고리에 대해 금액 기록 (없으면 0)
      const allCategories = new Set([
        ...categoriesMap.keys(),
        ...categoryAmounts.keys(),
      ]);
      allCategories.forEach((category) => {
        if (!categoriesMap.has(category)) {
          categoriesMap.set(category, new Array(index).fill(0));
        }
        categoriesMap.get(category)!.push(categoryAmounts.get(category) || 0);
      });

      // 기존 카테고리 중 이번 기간에 없는 것들은 0 추가
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categoriesMap.forEach((amounts, category) => {
        if (amounts.length === index) {
          amounts.push(0);
        }
      });
    });

    // 카테고리별 트렌드 분석
    return Array.from(categoriesMap.entries())
      .map(([category, amounts]) => {
        const averageAmount = Math.round(
          amounts.reduce((a, b) => a + b, 0) / amounts.length,
        );

        // 첫 번째와 마지막 값으로 트렌드 계산
        const firstAmount = amounts[0];
        const lastAmount = amounts[amounts.length - 1];
        let changePercentage = 0;

        if (firstAmount > 0) {
          changePercentage = ((lastAmount - firstAmount) / firstAmount) * 100;
        }

        let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
        if (Math.abs(changePercentage) > 10) {
          trend = changePercentage > 0 ? 'increasing' : 'decreasing';
        }

        return {
          category,
          amounts,
          averageAmount,
          trend,
          changePercentage: Math.round(changePercentage * 10) / 10,
        };
      })
      .filter((ct) => ct.averageAmount > 0) // 지출이 없는 카테고리 제외
      .sort((a, b) => b.averageAmount - a.averageAmount); // 평균 지출 기준 정렬
  }

  private predictNextPeriod(
    dataPoints: {
      period: string;
      amount: number;
      count: number;
      averageAmount: number;
      year: number;
      periodNumber: number;
    }[],
  ) {
    if (dataPoints.length < 3) {
      return {
        predictedNextPeriod: 0,
        predictionConfidence: 0,
      };
    }

    const amounts = dataPoints.map((dp) => dp.amount);
    const n = amounts.length;

    // 선형 회귀로 다음 값 예측
    const xSum = (n * (n - 1)) / 2;
    const ySum = amounts.reduce((a, b) => a + b, 0);
    const xySum = amounts.reduce(
      (sum, amount, index) => sum + amount * index,
      0,
    );
    const xSquareSum = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * xySum - xSum * ySum) / (n * xSquareSum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    const predictedNextPeriod = Math.round(slope * n + intercept);

    // R² 계산으로 신뢰도 측정
    const mean = ySum / n;
    const totalSumSquares = amounts.reduce(
      (sum, amount) => sum + Math.pow(amount - mean, 2),
      0,
    );
    const residualSumSquares = amounts.reduce((sum, amount, index) => {
      const predicted = slope * index + intercept;
      return sum + Math.pow(amount - predicted, 2);
    }, 0);

    const rSquared =
      totalSumSquares > 0 ? 1 - residualSumSquares / totalSumSquares : 0;
    const predictionConfidence = Math.max(
      0,
      Math.min(100, Math.round(rSquared * 100)),
    );

    return {
      predictedNextPeriod: Math.max(0, predictedNextPeriod),
      predictionConfidence,
    };
  }

  private generateInsights(
    dataPoints: {
      period: string;
      amount: number;
      count: number;
      averageAmount: number;
      year: number;
      periodNumber: number;
    }[],
    categoryTrends: any[],
    trendAnalysis: any,
  ) {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // 전체 트렌드 인사이트
    if (trendAnalysis.overallTrend === 'increasing') {
      insights.push(
        `지출이 ${Math.abs(trendAnalysis.overallChangePercentage)}% 증가하는 추세입니다`,
      );
      recommendations.push(
        '지출 카테고리를 재검토하고 불필요한 지출을 줄여보세요',
      );
    } else if (trendAnalysis.overallTrend === 'decreasing') {
      insights.push(
        `지출이 ${Math.abs(trendAnalysis.overallChangePercentage)}% 감소하는 추세입니다`,
      );
      insights.push('훌륭한 절약 습관을 유지하고 계십니다');
    }

    // 카테고리 트렌드 인사이트
    const increasingCategories = categoryTrends.filter(
      (ct) => ct.trend === 'increasing',
    );
    const decreasingCategories = categoryTrends.filter(
      (ct) => ct.trend === 'decreasing',
    );

    if (increasingCategories.length > 0) {
      const topIncreasing = increasingCategories[0];
      insights.push(
        `${topIncreasing.category} 지출이 ${topIncreasing.changePercentage}% 증가했습니다`,
      );

      // 카테고리별 맞춤 권장사항
      if (topIncreasing.category.includes('식비')) {
        recommendations.push('외식을 줄이고 집에서 요리하는 횟수를 늘려보세요');
      } else if (topIncreasing.category.includes('쇼핑')) {
        recommendations.push('구매 전 필요성을 다시 한 번 고려해보세요');
      } else if (topIncreasing.category.includes('교통')) {
        recommendations.push('대중교통이나 도보를 이용해보세요');
      }
    }

    if (decreasingCategories.length > 0) {
      const topDecreasing = decreasingCategories[0];
      insights.push(
        `${topDecreasing.category} 지출을 ${Math.abs(topDecreasing.changePercentage)}% 절약하셨습니다`,
      );
    }

    // 변동성 인사이트
    if (dataPoints.length > 0) {
      const amounts = dataPoints.map((dp) => dp.amount);
      const maxAmount = Math.max(...amounts);
      const minAmount = Math.min(...amounts);
      const difference = maxAmount - minAmount;

      if (difference > trendAnalysis.averageSpending * 0.5) {
        insights.push('지출 패턴의 변동이 큽니다');
        recommendations.push(
          '매월 일정한 지출을 유지하기 위해 예산을 세워보세요',
        );
      }
    }

    return { insights, recommendations };
  }

  // 헬퍼 메서드들
  private getPeriodStart(dataPoint: any, periodType: string): Date {
    if (periodType === 'monthly') {
      return new Date(dataPoint.year, dataPoint.periodNumber - 1, 1);
    } else if (periodType === 'weekly') {
      // 주차를 기준으로 월요일 계산 (복잡한 로직이므로 간단히 처리)
      return new Date(dataPoint.period + '-01'); // 임시
    } else {
      return new Date(dataPoint.period);
    }
  }

  private getPeriodEnd(dataPoint: any, periodType: string): Date {
    const start = this.getPeriodStart(dataPoint, periodType);
    if (periodType === 'monthly') {
      return endOfMonth(start);
    } else if (periodType === 'weekly') {
      return endOfWeek(start, { weekStartsOn: 1 });
    } else {
      return endOfDay(start);
    }
  }
}
