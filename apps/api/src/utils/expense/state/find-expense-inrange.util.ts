import { PrismaClient, Expense } from '@prisma/client';

export const findExpensesInRange = async (
  prisma: PrismaClient,
  userId: string,
  start: Date,
  end: Date,
): Promise<Expense[]> => {
  return prisma.expense.findMany({
    where: {
      userId,
      expenseDate: { gte: start, lte: end },
    },
    orderBy: { expenseDate: 'asc' },
  });
};
