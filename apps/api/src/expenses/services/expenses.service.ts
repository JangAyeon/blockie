import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';
import { UpdateExpensesDto } from '../dto/update-expenses.dto';
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
}
