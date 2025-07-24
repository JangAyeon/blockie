import { ApiProperty } from '@nestjs/swagger';

export class EnhancedBudgetStatusEntity {
  @ApiProperty({
    example: 2025,
    description: '연도',
  })
  year: number;

  @ApiProperty({
    example: 7,
    description: '월 (1~12)',
  })
  month: number;

  @ApiProperty({
    example: true,
    description: '해당 월에 예산이 설정되었는지 여부',
  })
  hasBudget: boolean;

  @ApiProperty({
    example: 500000,
    description: '설정된 예산 금액',
  })
  budget: number;

  @ApiProperty({
    example: 320000,
    description: '현재까지의 지출 금액',
  })
  spent: number;

  @ApiProperty({
    example: 180000,
    description: '남은 예산 금액 (예산 - 지출)',
  })
  remaining: number;

  // ========== 새로 추가되는 필드들 ==========

  @ApiProperty({
    example: 64.0,
    description: '예산 사용률 (%) - 예산이 없으면 null',
  })
  usagePercentage: number | null;

  @ApiProperty({
    example: 31,
    description: '해당 월의 총 일수',
  })
  daysInMonth: number;

  @ApiProperty({
    example: 20,
    description: '현재까지 경과된 일수',
  })
  daysPassed: number;

  @ApiProperty({
    example: 11,
    description: '남은 일수',
  })
  daysRemaining: number;

  @ApiProperty({
    example: 16000,
    description: '일평균 지출 금액 (현재까지 지출 ÷ 경과 일수)',
  })
  dailyAverageSpent: number;

  @ApiProperty({
    example: 16364,
    description: '권장 일일 지출 금액 (남은 예산 ÷ 남은 일수)',
  })
  recommendedDailySpending: number;

  @ApiProperty({
    example: false,
    description: '예산 초과 여부',
  })
  isOverBudget: boolean;

  @ApiProperty({
    example: 'safe',
    description: '예산 경고 레벨',
    enum: ['safe', 'warning', 'danger'],
  })
  warningLevel: 'safe' | 'warning' | 'danger';

  // ========== 추가 유용한 필드들 ==========

  @ApiProperty({
    example: 15,
    description: '이번 달 지출 건수',
  })
  expenseCount: number;

  @ApiProperty({
    example: 21333,
    description: '최대 지출 금액 (단일 지출 기준)',
  })
  maxSingleExpense: number;

  @ApiProperty({
    example: 5000,
    description: '최소 지출 금액 (단일 지출 기준)',
  })
  minSingleExpense: number;

  @ApiProperty({
    example: 'increasing',
    description: '지출 트렌드 (지난주 대비)',
    enum: ['increasing', 'decreasing', 'stable'],
  })
  spendingTrend: 'increasing' | 'decreasing' | 'stable';

  @ApiProperty({
    example: 12.5,
    description: '지출 트렌드 변화율 (%)',
  })
  trendPercentage: number;

  @ApiProperty({
    example: '식비',
    description: '가장 많이 지출한 카테고리',
  })
  topSpendingCategory: string | null;

  @ApiProperty({
    example: 150000,
    description: '가장 많이 지출한 카테고리의 금액',
  })
  topSpendingAmount: number;
}
