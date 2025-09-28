import { ExpenseBlock } from "@component/features/cube/block/monthly.block";
import { MIN_BUDGET_BLOCK } from "@constant/budget";
import { EMPTY_BLOCK_COLOR, UNIFIED_COLOR } from "@constant/cube.block";
import { RecentExpense } from "@type/user";
import { getCategoryColor } from "@utils/common/getCategoryConfig";

// 빈 블록 생성 함수
export const generateEmptyBlocks = (
  startIndex: number,
  count: number
): ExpenseBlock[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `empty-${startIndex + i}`,
    color: EMPTY_BLOCK_COLOR,
    fill: 1,
    isEmpty: true,
  }));
};

// 통합 블록 생성 함수 (빈 블록 포함)
export const getUnifiedBlocks = (
  expensesInfo: RecentExpense[],
  maxBlocks: number
): ExpenseBlock[] => {
  const totalAmount = expensesInfo.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const fullBlockCount = Math.floor(totalAmount / MIN_BUDGET_BLOCK);
  const remainder = totalAmount % MIN_BUDGET_BLOCK;

  const blocks: ExpenseBlock[] = [];

  for (let i = 0; i < fullBlockCount; i++) {
    blocks.push({
      id: `unified-full-${i}`,
      color: UNIFIED_COLOR,
      fill: 1,
    });
  }

  if (remainder > 0) {
    blocks.push({
      id: `unified-partial`,
      color: UNIFIED_COLOR,
      fill: remainder / MIN_BUDGET_BLOCK,
    });
  }

  // 빈 블록 추가
  const emptyBlockCount = maxBlocks - blocks.length;
  if (emptyBlockCount > 0) {
    blocks.push(...generateEmptyBlocks(blocks.length, emptyBlockCount));
  }

  return blocks;
};

// 카테고리별 잔여 블록 생성 함수
export const getResidualBlocksByCategory = (
  expensesInfo: RecentExpense[]
): ExpenseBlock[] => {
  const categoryResiduals = new Map<string, number>();
  const partialBlocks: ExpenseBlock[] = [];

  for (const expense of expensesInfo) {
    const remaining = expense.amount % MIN_BUDGET_BLOCK;

    if (remaining > 0) {
      const category = expense.category;
      const currentSum = categoryResiduals.get(category) || 0;
      const newSum = currentSum + remaining;

      const newBlocks = Math.floor(newSum / MIN_BUDGET_BLOCK);
      for (let i = 0; i < newBlocks; i++) {
        const categoryBlockCount = partialBlocks.filter(
          (block) => block.categoryId === category && block.fill === 1
        ).length;

        partialBlocks.push({
          id: `residual-${category}-${categoryBlockCount}`,
          color: getCategoryColor(category),
          categoryId: category,
          fill: 1,
        });
      }

      const remainingAfterBlocks = newSum % MIN_BUDGET_BLOCK;
      categoryResiduals.set(category, remainingAfterBlocks);
    }
  }

  categoryResiduals.forEach((finalResidual: number, category: string) => {
    if (finalResidual > 0) {
      partialBlocks.push({
        id: `residual-${category}-final`,
        color: getCategoryColor(category),
        categoryId: category,
        fill: finalResidual / MIN_BUDGET_BLOCK,
      });
    }
  });

  return partialBlocks;
};

// 카테고리별 풀 블록 생성 함수
export const getFullBlockByCategory = (
  expensesInfo: RecentExpense[]
): ExpenseBlock[] => {
  return expensesInfo.flatMap((expense) => {
    const fullCount = Math.floor(expense.amount / MIN_BUDGET_BLOCK);
    return Array.from({ length: fullCount }, (_, i) => ({
      id: `${expense.id}-${i}`,
      color: getCategoryColor(expense.category),
      categoryId: expense.category,
      fill: 1,
    }));
  });
};
