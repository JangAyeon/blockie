import { MIN_BUDGET_BLOCK } from "@constant/budget";
import { ExpenseCategoryItem } from "@type/expense";
import { RecentExpense } from "@type/user";
import { getCategoryColor } from "@utils/common/getCategoryConfig";
import { memo, useMemo, useState } from "react";

export interface ExpenseBlock {
  id: string;
  color: string;
  categoryId?: string;
  fill: number; // 0 < fill <= 1
  isEmpty?: boolean; // 빈 블록 여부
}

interface BlockMonthlyExpenseProps {
  expensesInfo: RecentExpense[];
  categoryInfo: ExpenseCategoryItem[];
  totalBlocks: number;
  maxBlocks: number;
}

// 단일 색상 (예: 파란색 계열)
const UNIFIED_COLOR = "#7DC0F4"; // blue-500
const EMPTY_BLOCK_COLOR = "#F3F4F6"; // gray-100 빈 블록 색상

// 빈 블록 생성 함수
const generateEmptyBlocks = (
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
const getUnifiedBlocks = (
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
const getResidualBlocksByCategory = (
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
const getFullBlockByCategory = (
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

// 토글 가능한 블록 컬렉션 컴포넌트
const BlockMonthlyExpense = memo<BlockMonthlyExpenseProps>(
  ({ totalBlocks, maxBlocks, categoryInfo, expensesInfo }) => {
    // 토글 상태 (true: 카테고리별, false: 통합)
    const [showByCategory, setShowByCategory] = useState(true);

    // 카테고리별 블록들
    const fullBlocks = useMemo(() => {
      return getFullBlockByCategory(expensesInfo);
    }, [expensesInfo]);

    const residualBlocks = useMemo(() => {
      return getResidualBlocksByCategory(expensesInfo);
    }, [expensesInfo]);

    // 카테고리별 블록들 + 빈 블록들
    const categoryBlocks = useMemo(() => {
      const filledBlocks = [...fullBlocks, ...residualBlocks];
      const emptyBlockCount = maxBlocks - filledBlocks.length;
      if (emptyBlockCount > 0) {
        filledBlocks.push(
          ...generateEmptyBlocks(filledBlocks.length, emptyBlockCount)
        );
      }
      return filledBlocks;
    }, [fullBlocks, residualBlocks, maxBlocks]);

    // 통합 블록들 (빈 블록 포함)
    const unifiedBlocks = useMemo(() => {
      return getUnifiedBlocks(expensesInfo, maxBlocks);
    }, [expensesInfo, maxBlocks]);

    // 총 지출 금액 계산
    const totalExpense = useMemo(() => {
      return expensesInfo.reduce((sum, expense) => sum + expense.amount, 0);
    }, [expensesInfo]);

    // 현재 표시할 블록들
    const displayBlocks = showByCategory ? categoryBlocks : unifiedBlocks;

    console.log(displayBlocks);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
        <div className="z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">
              이번 달 블록 컬렉션
            </h2>
            <div className="flex flex-row gap-2">
              {/* 토글 스위치 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">통합</span>
                <button
                  onClick={() => setShowByCategory(!showByCategory)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
                    showByCategory ? "bg-blue-300" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showByCategory ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-600">카테고리별</span>
              </div>

              {/* 남은 공간 표시 */}
              <div className="max-md:hidden">
                <Detail
                  maxBlocks={maxBlocks}
                  totalBlocks={totalBlocks}
                  showByCategory={showByCategory}
                />
              </div>

              {/* <div className="max-sm:hidden text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
                남은 공간: 대략 {Math.ceil(maxBlocks - totalBlocks)}칸
              </div>
              <div
                className={`max-sm:hidden text-sm px-3 py-1.5 rounded-full font-medium ${
                  showByCategory
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {totalBlocks}/{maxBlocks} 블록
              </div> */}
            </div>
          </div>

          <div className="mb-4 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
            {/* 그리드 배경 */}
            <div
              className="opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* 블록들 */}
            <div className="flex flex-wrap content-start gap-1 overflow-visible p-4">
              {displayBlocks.map((block, index) => (
                <div
                  key={`${showByCategory ? "category" : "unified"}-${block.id}`}
                  className={`text-black w-8 h-8 rounded-sm relative overflow-hidden transform transition-all duration-200 cursor-pointer hover:z-10 ${
                    block.isEmpty
                      ? "shadow-inner border border-gray-200 hover:border-gray-300"
                      : "shadow-sm hover:scale-110 hover:shadow-md"
                  }`}
                  data-id={index + 1}
                  title={
                    block.isEmpty
                      ? "사용 가능한 공간"
                      : showByCategory && block.categoryId
                        ? `${block.categoryId}`
                        : "전체 지출"
                  }
                >
                  <div
                    className={`h-full ${block.isEmpty ? "opacity-60" : ""}`}
                    style={{
                      width: `${block.fill * 100}%`,
                      backgroundColor: block.color,
                      transition: "width 0.3s ease",
                    }}
                  />
                  {/* 빈 블록에 점선 패턴 추가 (선택사항) */}
                  {block.isEmpty && (
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 2px, #D1D5DB 2px, #D1D5DB 4px)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 범례 - 조건부 렌더링 */}
          <div className="flex flex-col gap-4 items-center">
            {showByCategory ? (
              // 카테고리별 범례
              <div className="flex justify-center flex-wrap gap-4">
                {categoryInfo.map(({ category, count }) => (
                  <div
                    key={category}
                    className="flex items-center group cursor-pointer"
                  >
                    <div
                      className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: getCategoryColor(category),
                      }}
                    />
                    <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                      {category} ({count}건)
                    </span>
                  </div>
                ))}
                {/* 빈 블록 범례 */}
                <div className="flex items-center group cursor-pointer">
                  <div
                    className="w-3 h-3 rounded-sm mr-2 shadow-inner border border-gray-200 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: EMPTY_BLOCK_COLOR, opacity: 0.6 }}
                  />
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                    사용 가능 (대략 {Math.ceil(maxBlocks - totalBlocks)}칸)
                  </span>
                </div>
              </div>
            ) : (
              // 통합 범례
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex items-center group cursor-pointer">
                  <div
                    className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: UNIFIED_COLOR,
                    }}
                  />
                  <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                    전체 지출: {totalExpense.toLocaleString()}원
                  </span>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <div
                    className="w-3 h-3 rounded-sm mr-2 shadow-inner border border-gray-200 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: EMPTY_BLOCK_COLOR, opacity: 0.6 }}
                  />
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                    사용 가능 (대략 {Math.ceil(maxBlocks - totalBlocks)}칸)
                  </span>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <div
                    className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: UNIFIED_COLOR,
                      opacity: 0.6,
                    }}
                  />
                  <span className="text-xs text-gray-500">
                    총 {categoryInfo.reduce((sum, cat) => sum + cat.count, 0)}건
                  </span>
                </div>
              </div>
            )}
            <div className="md:hidden">
              <Detail
                maxBlocks={maxBlocks}
                totalBlocks={totalBlocks}
                showByCategory={showByCategory}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlockMonthlyExpense.displayName = "BlockMonthlyExpense";

const Detail = ({
  maxBlocks,
  totalBlocks,
  showByCategory,
}: {
  maxBlocks: number;
  totalBlocks: number;
  showByCategory: boolean;
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
        남은 공간: 대략 {Math.ceil(maxBlocks - totalBlocks)}칸
      </div>
      <div
        className={`text-sm px-3 py-1.5 rounded-full font-medium ${
          showByCategory
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {totalBlocks}/{maxBlocks} 블록
      </div>
    </div>
  );
};

export default BlockMonthlyExpense;
