import { ApiProperty } from '@nestjs/swagger';

export class BudgetHistoryItemEntity {
  @ApiProperty({
    example: 2025,
    description: '연도',
  })
  year: number;

  @ApiProperty({
    example: 6,
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
    description: '설정된 예산 금액 (예산이 없으면 0)',
  })
  budget: number;

  @ApiProperty({
    example: 480000,
    description: '실제 지출 금액',
  })
  spent: number;

  @ApiProperty({
    example: 20000,
    description: '남은 금액 (예산 - 지출)',
  })
  remaining: number;

  @ApiProperty({
    example: 96.0,
    description: '예산 사용률 (%) - 예산이 없으면 null',
  })
  usagePercentage: number | null;

  @ApiProperty({
    example: 'success',
    description:
      '예산 상태 (success: 예산 내, warning: 80% 이상, danger: 초과, none: 예산 없음)',
  })
  status: 'success' | 'warning' | 'danger' | 'none';
}

export class BudgetHistoryResponseEntity {
  @ApiProperty({
    type: [BudgetHistoryItemEntity],
    description: '월별 예산 내역 목록 (최신 월부터)',
  })
  history: BudgetHistoryItemEntity[];

  @ApiProperty({
    example: 6,
    description: '조회된 월 수',
  })
  totalMonths: number;

  @ApiProperty({
    example: 4,
    description: '예산이 설정된 월 수',
  })
  monthsWithBudget: number;

  @ApiProperty({
    example: 437500,
    description: '평균 월 지출 금액',
  })
  averageMonthlySpending: number;

  @ApiProperty({
    example: 450000,
    description: '평균 월 예산 금액 (예산이 설정된 월 기준)',
  })
  averageMonthlyBudget: number;

  @ApiProperty({
    example: 75.0,
    description: '예산 준수율 (%) - 예산 내에서 지출한 월의 비율',
  })
  budgetComplianceRate: number;
}
