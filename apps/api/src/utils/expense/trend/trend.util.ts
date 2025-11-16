import { PeriodType } from '../state/date-range.util';
import { getPeriodEnd, getPeriodStart } from './period.util';

/**
 * 
 * analyzeTrend()
analyzeVolatility()
analyzeCategoryTrends()
predictNextPeriod()
 * 
 */
export const analyzeTrend = (
  dataPoints: {
    period: string;
    amount: number;
    count: number;
    averageAmount: number;
    year: number;
    periodNumber: number;
  }[],
) => {
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
  const xySum = amounts.reduce((sum, amount, index) => sum + amount * index, 0);
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
};

export const analyzeVolatility = (
  dataPoints: {
    period: string;
    amount: number;
    count: number;
    averageAmount: number;
    year: number;
    periodNumber: number;
  }[],
) => {
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
};

export const analyzeCategoryTrends = (
  expenses: any[],
  dataPoints: any[],
  periodType: PeriodType,
) => {
  // 카테고리별로 그룹화
  const categoriesMap = new Map<string, number[]>();

  // 각 기간의 카테고리별 지출 계산
  dataPoints.forEach((dp, index) => {
    const periodStart = getPeriodStart(dp, periodType);
    const periodEnd = getPeriodEnd(dp, periodType);

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
};
export const predictNextPeriod = (
  dataPoints: {
    period: string;
    amount: number;
    count: number;
    averageAmount: number;
    year: number;
    periodNumber: number;
  }[],
) => {
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
  const xySum = amounts.reduce((sum, amount, index) => sum + amount * index, 0);
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
};
