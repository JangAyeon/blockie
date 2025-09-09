import { pageUrl } from "@constant/page.route";
import { useRouter } from "@i18n/navigation";
import Image from "next/image";
// Empty State 컴포넌트
const EmptyMonthlyExpense = () => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">최근 지출</h2>
      </div>

      {/* Empty State 메인 카드 */}
      <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-lg bg-gradient-to-br from-green-100/50 to-blue-100/50 -translate-y-4 translate-x-4" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full blur-md bg-gradient-to-tr from-purple-100/40 to-pink-100/40 translate-y-3 -translate-x-3" />

        {/* 콘텐츠 */}
        <div className="relative py-8 px-2  bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200 z-10 text-center">
          <div
            className="opacity-10 "
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* 아이콘 */}
          <div className="inline-flex p-4 mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* 메시지 */}
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            아직 지출 내역이 없어요
          </h3>
          <p className="mb-6 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            첫 번째 지출을 기록하고 스마트한 가계부 관리를 시작해보세요
          </p>

          {/* 버튼 */}
          <button
            onClick={() => router.push(`${pageUrl.expense}`)}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-md hover:from-blue-600 hover:to-purple-600"
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
            첫 지출 기록하기
          </button>
        </div>

        {/* 도움말 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {/* 팁 1 */}
          <div className="p-2 rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-row gap-2 justify-center items-center">
                <div className="w-fit p-1.5 rounded-full bg-green-100">
                  {/* <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg> */}
                  <Image
                    src="/cube/lightning.svg"
                    alt="lightning icon"
                    width={16}
                    height={16}
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-medium text-gray-800">
                  빠른 입력
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                카테고리별로 간편하게 지출을 기록할 수 있어요
              </p>
            </div>
          </div>

          {/* 팁 2 */}
          <div className="p-2 rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-row gap-2 justify-center items-center">
                <div className="w-fit p-1.5 rounded-full bg-purple-100">
                  {/* <svg
                    className="w-3 h-3 text-purple-600"
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
                  </svg> */}
                  <Image
                    src="/cube/lightBulb.svg"
                    alt="lightBulb icon"
                    width={16}
                    height={16}
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-medium text-gray-800">
                  시각적 분석
                </h4>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                블록으로 지출 패턴을 한눈에 확인해보세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyMonthlyExpense;
