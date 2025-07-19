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
}
