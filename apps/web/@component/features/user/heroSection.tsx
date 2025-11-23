import { BlockieFace, BlockieBottom, cn } from "@repo/ui";
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

  return (
    <section className="relative bg-white rounded-3xl p-8 mb-8 shadow-lg border border-neutral-light-gray overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blockie-yellow rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blockie-blue rounded-full opacity-30 blur-lg"></div>

      <div className="relative flex flex-col items-center gap-4">
        {/* 캐릭터 섹션 */}
        <div className="relative transform transition-all duration-500 hover:scale-110 hover:-rotate-3">
          <div className="animate-bounce">
            <BlockieFace size={140} emotion={emotion} />
            <BlockieBottom size={140} />
          </div>

          {/* 말풍선 */}
        </div>

        {/* 텍스트 섹션 */}
        <div className="text-center">
          <h2 className="text-display lg:text-5xl font-black mb-3">
            <span className="text-neutral-black">
              {t("user.greeting", {
                name: user?.name || t("user.defaultName"),
              })}
            </span>
          </h2>

          {budgetHistory?.budgetComplianceRate && (
            <p className="text-title-2 text-neutral-dark-gray mb-6 text-center leading-relaxed">
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
                <div
                  className={cn(
                    "bg-blockie-green text-white px-5 py-3 rounded-2xl",
                    "font-semibold text-body-2 shadow-lg",
                    "transform transition-all duration-200",
                    "group-hover:scale-105 group-hover:shadow-xl hover-lift"
                  )}
                >
                  🎯 {t("user.budgetCompliance")}{" "}
                  {budgetHistory.budgetComplianceRate.toFixed(1)}%
                </div>
              </div>
            )}

            <div className="group relative">
              <div
                className={cn(
                  "bg-blockie-blue text-white px-5 py-3 rounded-2xl",
                  "font-semibold text-body-2 shadow-lg",
                  "transform transition-all duration-200",
                  "group-hover:scale-105 group-hover:shadow-xl hover-lift"
                )}
              >
                📅 {user?.createdAt && new Date(user.createdAt).getFullYear()}
                {t("user.since")}
              </div>
            </div>

            <div className="group relative">
              <div
                className={cn(
                  "bg-blockie-purple text-white px-5 py-3 rounded-2xl",
                  "font-semibold text-body-2 shadow-lg",
                  "transform transition-all duration-200",
                  "group-hover:scale-105 group-hover:shadow-xl hover-lift"
                )}
              >
                ⭐ {recentExpenses.length}
                {t("user.recentRecords")}
              </div>
            </div>
          </div>

          {/* 성취 배지 */}
          {budgetHistory?.budgetComplianceRate >= 80 && (
            <div className="inline-flex items-center gap-2 bg-blockie-yellow border-2 border-blockie-yellow rounded-2xl px-4 py-2 animate-pulse-slow">
              <span className="text-title-1">🏆</span>
              <span className="text-body-2 font-bold text-neutral-black">
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
