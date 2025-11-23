import { ApiProperty } from '@nestjs/swagger';

export class StreakStatsEntity {
  @ApiProperty({
    example: 7,
    description: '현재 연속 기록 일수',
  })
  currentStreak: number;

  @ApiProperty({
    example: 15,
    description: '최대 연속 기록 일수',
  })
  maxStreak: number;

  @ApiProperty({
    example: 3,
    description: '다음 보상까지 남은 일수',
  })
  daysToNextReward: number;

  @ApiProperty({
    example: 10,
    description: '다음 보상 목표 일수',
  })
  nextRewardTarget: number;

  @ApiProperty({
    example: '2025-07-27',
    description: '마지막 기록 날짜',
  })
  lastRecordDate: string | null;

  @ApiProperty({
    example: '2025-07-21',
    description: '현재 연속 기록 시작 날짜',
  })
  streakStartDate: string | null;

  @ApiProperty({
    example: 25,
    description: '총 기록 일수',
  })
  totalRecordDays: number;

  @ApiProperty({
    example: false,
    description: '오늘 기록 여부',
  })
  hasRecordToday: boolean;

  @ApiProperty({
    example: 'gold',
    description: '현재 연속 기록 레벨',
    enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
  })
  streakLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}
