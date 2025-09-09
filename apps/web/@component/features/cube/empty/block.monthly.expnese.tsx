import { MIN_BUDGET_BLOCK } from "@constant/budget";
import { pageUrl } from "@constant/page.route";
import { useRouter } from "@i18n/navigation";
import Image from "next/image";
// Empty State 컴포넌트
const EmptyBlockMonthlyExpense = ({
  maxBlocks,
  hasBudget,
}: {
  maxBlocks: number;
  hasBudget: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-8 translate-x-8 blur-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full translate-y-6 -translate-x-6 blur-lg" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg text-gray-800">
            이번 달 블록 컬렉션
          </h2>
          {hasBudget ? (
            <div className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium">
              {maxBlocks}칸 준비됨
            </div>
          ) : (
            <button
              onClick={() => router.push(`${pageUrl.budget}`)}
              className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium"
            >
              예산 설정하기
            </button>
          )}
        </div>

        {/* 빈 그리드 영역 */}
        <div className="mb-6 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200 p-6 min-h-[120px] relative">
          {/* 그리드 배경 */}
          <div
            className="opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 중앙 메시지 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-8">
            {/* 아이콘 */}
            <div className="mb-4 p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>

            {/* 메인 메시지 */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              첫 번째 지출을 기록해보세요!
            </h3>
            <p className="text-sm text-gray-500 mb-4  leading-relaxed">
              지출을 추가하면 예쁜 블록으로 시각화되어 한 눈에 볼 수 있어요
            </p>

            {/* 액션 버튼 */}
            <button
              onClick={() => router.push(`${pageUrl.expense}`)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              지출 추가하기
            </button>
          </div>
        </div>

        {/* 도움말 섹션 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-row gap-2 justify-center items-center">
              <div className="w-fit p-1 bg-blue-100 rounded-full mt-0.5">
                <Image
                  src="/cube/info.svg"
                  alt="info icon"
                  width={20}
                  height={20}
                />
              </div>
              <h4 className="text-sm font-medium text-gray-800">
                블록 컬렉션이란?
              </h4>
            </div>
            <div>
              <p className="text-xs text-gray-600 leading-relaxed">
                지출 금액을 {(MIN_BUDGET_BLOCK || 10000).toLocaleString()}원
                단위의 블록으로 나타내어, 카테고리별 지출 패턴을 직관적으로
                확인할 수 있는 기능입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmptyBlockMonthlyExpense.displayName = "EmptyBlockMonthlyExpense";

export default EmptyBlockMonthlyExpense;
