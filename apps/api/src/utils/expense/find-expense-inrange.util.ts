import { PrismaClient } from '@prisma/client';

export const findExpensesInRange = async (
  prisma: PrismaClient,
  userId: string,
  start: Date,
  end: Date,
) => {
  return prisma.expense.findMany({
    where: {
      userId,
      expenseDate: { gte: start, lte: end },
    },
    orderBy: { expenseDate: 'asc' },
  });
};
