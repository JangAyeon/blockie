import { ExpenseCategoryItem } from "@type/expense";
import { RecentExpense } from "@type/user";
import { getCategoryColor } from "@utils/common/getCategoryConfig";
import { memo, useMemo, useState } from "react";
import Detail from "./monthly/detail";
import {
  getFullBlockByCategory,
  getResidualBlocksByCategory,
  generateEmptyBlocks,
  getUnifiedBlocks,
} from "@utils/cube/block.generate";
import { EMPTY_BLOCK_COLOR, UNIFIED_COLOR } from "@constant/cube.block";
import { useTranslations } from "next-intl";

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

// 토글 가능한 블록 컬렉션 컴포넌트
const BlockMonthlyExpense = memo<BlockMonthlyExpenseProps>(
  ({ totalBlocks, maxBlocks, categoryInfo, expensesInfo }) => {
    // 토글 상태 (true: 카테고리별, false: 통합)
    const [showByCategory, setShowByCategory] = useState(true);
    const t = useTranslations("cube.block");
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
          <div className="flex flex-col items-start mb-4 md:flex-row md:justify-between md:items-center">
            <h2 className="font-bold text-lg text-gray-800">{t("title")}</h2>
            <div className="flex flex-row gap-2">
              {/* 토글 스위치 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{t("unified")}</span>
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
                <span className="text-xs text-gray-600">{t("byCategory")}</span>
              </div>

              {/* 남은 공간 표시 */}
              <div className="max-md:hidden">
                <Detail
                  maxBlocks={maxBlocks}
                  totalBlocks={totalBlocks}
                  showByCategory={showByCategory}
                />
              </div>
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
                      ? t("availableSpace") // "사용 가능한 공간"
                      : showByCategory && block.categoryId
                        ? `${block.categoryId}`
                        : t("totalExpense") // "전체 지출"
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
                      {/* {category} ({count}건) */}
                      {t("categoryCount", { category, count })}
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
                    {/* 사용 가능 (대략 {Math.ceil(maxBlocks - totalBlocks)}칸) */}
                    {t("availableSlots", {
                      slots: Math.ceil(maxBlocks - totalBlocks),
                    })}
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
                    {/* 전체 지출: {totalExpense.toLocaleString()}원 */}
                    {t("totalExpenseAmount", {
                      amount: totalExpense.toLocaleString(),
                    })}
                  </span>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <div
                    className="w-3 h-3 rounded-sm mr-2 shadow-inner border border-gray-200 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: EMPTY_BLOCK_COLOR, opacity: 0.6 }}
                  />
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                    {/* 사용 가능 (대략 {Math.ceil(maxBlocks - totalBlocks)}칸) */}
                    {t("availableSlots", {
                      slots: Math.ceil(maxBlocks - totalBlocks),
                    })}
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
                    {/* 총 {categoryInfo.reduce((sum, cat) => sum + cat.count, 0)}건 */}
                    {t("totalItems", {
                      count: categoryInfo.reduce(
                        (sum, cat) => sum + cat.count,
                        0
                      ),
                    })}
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

export default BlockMonthlyExpense;
