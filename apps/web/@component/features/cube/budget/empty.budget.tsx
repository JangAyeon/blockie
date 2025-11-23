import { pageUrl } from "@constant/page.route";
import { BlockieFace } from "@repo/ui";
import { useRouter } from "@i18n/navigation";
import { useTranslations } from "next-intl";

// 예산 미설정 Empty State 컴포넌트
const EmptyMonthlyBudget = () => {
  const router = useRouter();
  const t = useTranslations("cube.budget.empty");
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/40 to-yellow-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-full translate-y-12 -translate-x-12 blur-xl" />

      <div className="relative z-10">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <BlockieFace size={48} emotion="happy" />
            <div>
              <div className="text-sm text-gray-600 mb-1">
                {/* 이번 달 컬렉션 공간 */}
                {t("title")}
              </div>
              <div className="text-3xl font-bold text-gray-400">
                {" "}
                {t("notSet")}
              </div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
            {/* 설정 필요 */}
            {t("setupRequired")}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="text-center p-6 mb-6  bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
          {/* 그리드 배경 */}
          <div
            className="opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="py-8">
            <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {/* 월간 예산을 설정해보세요 */}
              {t("mainMessage")}
            </h3>
            <p className="text-sm text-gray-500 mb-4  mx-auto leading-relaxed">
              {/* 예산을 설정하면 지출을 체계적으로 관리하고 블록으로 시각화할 수
              있어요 */}
              {t("description")}
            </p>

            {/* 액션 버튼 */}
            <button
              onClick={() => router.push(`${pageUrl.budget}`)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {/* 예산 설정하기 */}
              {t("setupButton")}
            </button>
          </div>
        </div>

        {/* 간단한 예산 설정 가이드 */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-1 bg-orange-100 rounded-full mt-0.5">
              <svg
                className="w-4 h-4 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                {/* 💡 예산 설정 팁 */}
                {t("tipTitle")}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t("tipDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyMonthlyBudget;
