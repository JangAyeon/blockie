import { ApiProperty } from '@nestjs/swagger';

export class TrendDataPointEntity {
  @ApiProperty({
    example: '2025-07',
    description: '기간 라벨 (YYYY-MM, YYYY-WW, YYYY-MM-DD 형식)',
  })
  period: string;

  @ApiProperty({
    example: 450000,
    description: '해당 기간 총 지출 금액',
  })
  amount: number;

  @ApiProperty({
    example: 15,
    description: '해당 기간 지출 건수',
  })
  count: number;

  @ApiProperty({
    example: 30000,
    description: '해당 기간 평균 지출 금액',
  })
  averageAmount: number;

  @ApiProperty({
    example: 2025,
    description: '연도',
  })
  year: number;

  @ApiProperty({
    example: 7,
    description: '월/주/일',
  })
  periodNumber: number;
}

export class CategoryTrendEntity {
  @ApiProperty({
    example: '식비',
    description: '카테고리명',
  })
  category: string;

  @ApiProperty({
    type: [Number],
    example: [120000, 135000, 150000, 140000, 160000, 155000],
    description: '기간별 지출 금액 배열',
  })
  amounts: number[];

  @ApiProperty({
    example: 143333,
    description: '평균 지출 금액',
  })
  averageAmount: number;

  @ApiProperty({
    example: 'increasing',
    description: '트렌드 방향',
    enum: ['increasing', 'decreasing', 'stable'],
  })
  trend: 'increasing' | 'decreasing' | 'stable';

  @ApiProperty({
    example: 12.5,
    description: '트렌드 변화율 (%)',
  })
  changePercentage: number;
}

export class TrendAnalysisEntity {
  @ApiProperty({
    type: [TrendDataPointEntity],
    description: '기간별 지출 데이터 포인트',
  })
  dataPoints: TrendDataPointEntity[];

  @ApiProperty({
    example: 'monthly',
    description: '분석 기간 유형',
    enum: ['monthly', 'weekly', 'daily'],
  })
  periodType: 'monthly' | 'weekly' | 'daily';

  @ApiProperty({
    example: 6,
    description: '분석된 기간 수',
  })
  totalPeriods: number;

  // ========== 전체 트렌드 분석 ==========

  @ApiProperty({
    example: 435000,
    description: '기간별 평균 지출 금액',
  })
  averageSpending: number;

  @ApiProperty({
    example: 'increasing',
    description: '전체 지출 트렌드',
    enum: ['increasing', 'decreasing', 'stable'],
  })
  overallTrend: 'increasing' | 'decreasing' | 'stable';

  @ApiProperty({
    example: 8.5,
    description: '전체 트렌드 변화율 (%)',
  })
  overallChangePercentage: number;

  @ApiProperty({
    example: 520000,
    description: '최대 지출 기간의 금액',
  })
  maxSpending: number;

  @ApiProperty({
    example: 350000,
    description: '최소 지출 기간의 금액',
  })
  minSpending: number;

  @ApiProperty({
    example: '2025-06',
    description: '최대 지출 기간',
  })
  maxSpendingPeriod: string;

  @ApiProperty({
    example: '2025-02',
    description: '최소 지출 기간',
  })
  minSpendingPeriod: string;

  // ========== 변동성 분석 ==========

  @ApiProperty({
    example: 62500,
    description: '지출 표준편차 (변동성 지표)',
  })
  volatility: number;

  @ApiProperty({
    example: 14.4,
    description: '변동 계수 (%) - 변동성의 상대적 크기',
  })
  volatilityCoefficient: number;

  @ApiProperty({
    example: 'moderate',
    description: '변동성 수준',
    enum: ['low', 'moderate', 'high'],
  })
  volatilityLevel: 'low' | 'moderate' | 'high';

  // ========== 카테고리별 트렌드 ==========

  @ApiProperty({
    type: [CategoryTrendEntity],
    description: '카테고리별 트렌드 분석',
  })
  categoryTrends: CategoryTrendEntity[];

  // ========== 예측 정보 ==========

  @ApiProperty({
    example: 465000,
    description: '다음 기간 예상 지출 (선형 회귀 기반)',
  })
  predictedNextPeriod: number;

  @ApiProperty({
    example: 75,
    description: '예측 신뢰도 (%)',
  })
  predictionConfidence: number;

  // ========== 인사이트 ==========

  @ApiProperty({
    example: [
      '지출이 지속적으로 증가하고 있습니다',
      '식비 카테고리의 증가율이 높습니다',
    ],
    description: '자동 생성된 인사이트 메시지',
  })
  insights: string[];

  @ApiProperty({
    example: ['외식을 줄이고 집에서 요리해보세요', '고정비를 재검토해보세요'],
    description: '절약 팁 및 권장사항',
  })
  recommendations: string[];
}
