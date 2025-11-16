export const calculateExpenseRecord = (expenses: { amount: number }[]) => {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const count = expenses.length;
  const average = count > 0 ? Math.round(total / count) : 0;

  return { total, count, average };
};
