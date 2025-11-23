import { ApiProperty } from '@nestjs/swagger';

export class CategoryStatsEntity {
  @ApiProperty({
    example: '식비',
    description: '지출 카테고리명',
  })
  category: string;

  @ApiProperty({
    example: 150000,
    description: '해당 카테고리 총 지출 금액',
  })
  amount: number;

  @ApiProperty({
    example: 46.9,
    description: '전체 지출 대비 비율 (%)',
  })
  percentage: number;

  @ApiProperty({
    example: 5,
    description: '해당 카테고리 지출 건수',
  })
  count: number;
}

export class CategoryStatsResponseEntity {
  @ApiProperty({
    example: 320000,
    description: '해당 월 총 지출 금액',
  })
  totalAmount: number;

  @ApiProperty({
    example: 15,
    description: '총 지출 건수',
  })
  totalCount: number;

  @ApiProperty({
    type: [CategoryStatsEntity],
    description: '카테고리별 지출 통계 목록',
  })
  categories: CategoryStatsEntity[];
}
