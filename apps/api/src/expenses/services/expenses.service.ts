import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';
import { UpdateExpensesDto } from '../dto/update-expenses.dto';
import { subDays, format } from 'date-fns';
import { assertOwner } from 'src/utils/expense/state/check-owner.util';

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

    assertOwner(expense, userId);
    // if (!expense) {
    //   throw new ForbiddenException('해당 지출 항목이 존재하지 않습니다.');
    // } else if (expense.userId !== userId) {
    //   throw new ForbiddenException(
    //     '해당 지출 항목에 대한 삭제 권한이  존재하지 않습니다.',
    //   );
    // }

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

    assertOwner(expense, userId);
    // if (!expense || expense.userId !== userId) {
    //   throw new ForbiddenException('이 지출 항목에 대한 권한이 없습니다.');
    // }

    return this.prisma.expense.delete({
      where: { id: expenseId },
    });
  }

  async getStreakStats(userId: string) {
    // 사용자의 모든 지출을 날짜별로 그룹화하여 조회
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      select: { expenseDate: true },
      orderBy: { expenseDate: 'desc' },
    });

    if (expenses.length === 0) {
      return {
        currentStreak: 0,
        maxStreak: 0,
        daysToNextReward: 7,
        nextRewardTarget: 7,
        lastRecordDate: null,
        streakStartDate: null,
        totalRecordDays: 0,
        hasRecordToday: false,
        streakLevel: 'bronze' as const,
      };
    }

    // 날짜별로 기록이 있는 날들을 Set으로 만들기 (중복 제거)
    const recordDates = new Set(
      expenses.map((expense) =>
        format(new Date(expense.expenseDate), 'yyyy-MM-dd'),
      ),
    );

    const sortedDates = Array.from(recordDates).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    // 오늘 기록 여부 확인
    const today = format(new Date(), 'yyyy-MM-dd');
    const hasRecordToday = recordDates.has(today);

    // 현재 연속 기록 계산
    let currentStreak = 0;
    let streakStartDate = '';

    // 오늘부터 거슬러 올라가면서 연속 기록 확인
    let checkDate = new Date();

    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');

      if (recordDates.has(dateStr)) {
        currentStreak++;
        streakStartDate = dateStr;
        // 하루 전으로 이동
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }

    // 최대 연속 기록 계산
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

    // 보상 시스템 (7일, 14일, 30일, 60일, 100일 단위)
    const rewardTargets = [7, 14, 30, 60, 100, 200, 365];
    const nextRewardTarget =
      rewardTargets.find((target) => target > currentStreak) ||
      rewardTargets[rewardTargets.length - 1];
    const daysToNextReward = nextRewardTarget - currentStreak;

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

  private calculateStreakLevel(
    streakDays: number,
  ): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' {
    if (streakDays >= 100) return 'diamond';
    if (streakDays >= 60) return 'platinum';
    if (streakDays >= 30) return 'gold';
    if (streakDays >= 14) return 'silver';
    return 'bronze';
  }
}
