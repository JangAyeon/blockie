/**
 * generateInsights()
 */
const generateInsights = (
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
) => {
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
};
