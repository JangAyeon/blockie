import { Injectable } from '@nestjs/common';
import { subDays, format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

export enum StreakLevel {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
}

const DATE_FORMAT = 'yyyy-MM-dd';
const REWARD_TARGETS = [7, 14, 30, 60, 100, 200, 365];

@Injectable()
export class ExpenseStreakService {
  constructor(private prisma: PrismaService) {}

  private getEmptyStreak() {
    return {
      currentStreak: 0,
      maxStreak: 0,
      daysToNextReward: 7,
      nextRewardTarget: 7,
      lastRecordDate: null,
      streakStartDate: null,
      totalRecordDays: 0,
      hasRecordToday: false,
      streakLevel: StreakLevel.Bronze,
    };
  }

  private getRecordDates(expenses: { expenseDate: Date }[]): Set<string> {
    return new Set(
      expenses.map((e) => format(new Date(e.expenseDate), DATE_FORMAT)),
    );
  }

  private calculateCurrentStreak(recordDates: Set<string>): {
    currentStreak: number;
    streakStartDate: string;
  } {
    // 현재 연속 기록 계산
    let currentStreak = 0;
    let streakStartDate = '';

    // 오늘부터 거슬러 올라가면서 연속 기록 확인
    let checkDate = new Date();

    while (true) {
      const dateStr = format(checkDate, DATE_FORMAT);

      if (recordDates.has(dateStr)) {
        currentStreak++;
        streakStartDate = dateStr;
        // 하루 전으로 이동
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }
    return { currentStreak, streakStartDate };
  }

  private calculateMaxStreak(sortedDates: string[]): number {
    let maxStreak = 0;
    let tempStreak = 0;
    let previousDate: Date | null = null;

    for (const dateStr of sortedDates.reverse()) {
      // 오래된 날짜부터
      const currentDate = new Date(dateStr);

      if (previousDate === null) {
        tempStreak = 1;
      } else {
        const diffDays = Math.floor(
          (currentDate.getTime() - previousDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );

        if (diffDays === 1) {
          tempStreak++;
        } else {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 1;
        }
      }

      previousDate = currentDate;
    }
    maxStreak = Math.max(maxStreak, tempStreak);
    return maxStreak;
  }

  private getNextReward(currentStreak: number): {
    nextRewardTarget: number;
    daysToNextReward: number;
  } {
    const nextRewardTarget =
      REWARD_TARGETS.find((target) => target > currentStreak) ||
      REWARD_TARGETS[REWARD_TARGETS.length - 1];
    const daysToNextReward = nextRewardTarget - currentStreak;
    return { nextRewardTarget, daysToNextReward };
  }
  private calculateStreakLevel(streakDays: number): StreakLevel {
    if (streakDays >= 100) return StreakLevel.Diamond;
    if (streakDays >= 60) return StreakLevel.Platinum;
    if (streakDays >= 30) return StreakLevel.Gold;
    if (streakDays >= 14) return StreakLevel.Silver;
    return StreakLevel.Bronze;
  }
  async getStreakStats(userId: string) {
    // 사용자의 모든 지출을 날짜별로 그룹화하여 조회
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      select: { expenseDate: true },
      orderBy: { expenseDate: 'desc' },
    });

    if (!expenses.length) {
      return this.getEmptyStreak();
    }

    // 날짜별로 기록이 있는 날들을 Set으로 만들기 (중복 제거)
    const recordDates = this.getRecordDates(expenses);

    const sortedDates = Array.from(recordDates).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    // 오늘 기록 여부 확인
    const hasRecordToday = recordDates.has(format(new Date(), DATE_FORMAT));
    const { currentStreak, streakStartDate } =
      this.calculateCurrentStreak(recordDates);
    const maxStreak = this.calculateMaxStreak(sortedDates);

    // 보상 시스템 (7일, 14일, 30일, 60일, 100일 단위)
    const { nextRewardTarget, daysToNextReward } =
      this.getNextReward(currentStreak);

    // 연속 기록 레벨 계산
    const streakLevel = this.calculateStreakLevel(currentStreak);

    return {
      currentStreak,
      maxStreak,
      daysToNextReward: Math.max(0, daysToNextReward),
      nextRewardTarget,
      lastRecordDate: sortedDates[0] || null,
      streakStartDate: currentStreak > 0 ? streakStartDate : null,
      totalRecordDays: recordDates.size,
      hasRecordToday,
      streakLevel,
    };
  }
}
