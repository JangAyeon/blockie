import { BlockieFace, BlockieBottom } from "@repo/ui";
import { BudgetHistoryResponse } from "@type/budget";
import { RecentExpense, User } from "@type/user";
import { useTranslations } from "next-intl";

// 히어로 섹션 컴포넌트
const HeroSection = ({
  user,
  budgetHistory,
  recentExpenses,
  emotion,
}: {
  user: User;
  budgetHistory: BudgetHistoryResponse;
  recentExpenses: RecentExpense[];
  emotion: "happy" | "neutral" | "sad";
}) => {
  const t = useTranslations();
  console.log("#@##", user, budgetHistory, recentExpenses);

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-xl border border-white/60 backdrop-blur-sm overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-30 blur-lg"></div>

      <div className="relative flex flex-col items-center gap-4">
        {/* 캐릭터 섹션 */}
        <div className="relative transform transition-all duration-500 hover:scale-110 hover:-rotate-3">
          <div className="animate-bounce">
            <BlockieFace size={140} emotion={emotion} />
            <BlockieBottom size={140} />
          </div>

          {/* 말풍선 */}
          {budgetHistory?.budgetComplianceRate && (
            <div className="absolute -right-8 -top-4 bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
              <div className="text-lg">
                {budgetHistory.budgetComplianceRate >= 80
                  ? "😊"
                  : budgetHistory.budgetComplianceRate >= 60
                    ? "😌"
                    : "💪"}
              </div>
            </div>
          )}
        </div>

        {/* 텍스트 섹션 */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
              {t("user.greeting", {
                name: user?.name || t("user.defaultName"),
              })}
            </span>
            {/* <span className="text-gray-800">
              {user?.name || t("user.defaultName")}
              {t("user.greeting", {
                name: user?.name || t("user.defaultName"),
              }).includes("님")
                ? t("user.honorific")
                : ""}
              !
            </span> */}
          </h2>

          {budgetHistory?.budgetComplianceRate && (
            <p className="text-xl text-gray-600 mb-6 text-center leading-relaxed">
              {budgetHistory.budgetComplianceRate >= 80
                ? t("user.message.perfect")
                : budgetHistory.budgetComplianceRate >= 60
                  ? t("user.message.good")
                  : t("user.message.encourage")}
            </p>
          )}

          {/* 통계 배지들 */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {budgetHistory?.budgetComplianceRate && (
              <div className="group relative">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                  🎯 {t("user.budgetCompliance")}{" "}
                  {budgetHistory.budgetComplianceRate.toFixed(1)}%
                </div>
              </div>
            )}

            <div className="group relative">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                📅 {user?.createdAt && new Date(user.createdAt).getFullYear()}
                {t("user.since")}
              </div>
            </div>

            <div className="group relative">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                ⭐ {recentExpenses.length}
                {t("user.recentRecords")}
              </div>
            </div>
          </div>

          {/* 성취 배지 */}
          {budgetHistory?.budgetComplianceRate >= 80 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300 rounded-2xl px-4 py-2 animate-pulse">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-bold text-yellow-700">
                {t("user.master")}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
