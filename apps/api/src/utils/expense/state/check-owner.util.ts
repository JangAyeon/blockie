import { ForbiddenException } from '@nestjs/common';
import { Expense } from '@prisma/client';

export const assertOwner = (expense: Expense | null, userId: string) => {
  if (!expense) {
    throw new ForbiddenException('지출 항목이 존재하지 않습니다.');
  }
  if (expense.userId !== userId) {
    throw new ForbiddenException('해당 지출 항목에 대한 권한이 없습니다.');
  }
};
