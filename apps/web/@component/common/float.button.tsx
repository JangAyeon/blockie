"use client";
import { pageUrl } from "@constant/page.route";
import { BlockieFace } from "@repo/ui";
import Image from "next/image";
import { useRouter } from "@i18n/navigation";
import { useState } from "react";

const FloatButton = () => {
  const router = useRouter();
  const [showFinanceOptions, setShowFinanceOptions] = useState(false);

  const handleFinanceButtonClick = () => {
    setShowFinanceOptions(!showFinanceOptions);
  };

  const handleBudgetClick = () => {
    // 예산 설정 페이지로 이동
    router.push(`${pageUrl.budget}`); // 실제 페이지 URL로 변경 필요
    setShowFinanceOptions(false);
  };

  const handleExpenseClick = () => {
    // 지출 기록 페이지로 이동
    router.push(`${pageUrl.expense}`); // 실제 페이지 URL로 변경 필요
    setShowFinanceOptions(false);
  };

  return (
    <div className="fixed bottom-6 right-0 z-50 safe-area-bottom">
      <div className="flex flex-col justify-center gap-4 px-6">
        {/* 재무 관리 옵션들 */}
        {showFinanceOptions && (
          <div className="flex flex-col gap-3 animate-slide-up">
            {/* 예산 설정 버튼 */}
            <button
              className="btn-base w-14 h-14 bg-blue-500 hover:bg-blue-400 text-white rounded-full shadow-lg hover-lift animate-button-press flex items-center justify-center"
              aria-label="예산 설정"
              onClick={handleBudgetClick}
            >
              <Image
                src="/common/budget.svg"
                alt="budget icon"
                width={32}
                height={32}
              />
            </button>

            {/* 지출 기록 버튼 */}
            <button
              className="btn-base w-14 h-14 bg-red-500 hover:bg-red-400 text-white rounded-full shadow-lg hover-lift animate-button-press flex items-center justify-center"
              aria-label="지출 기록"
              onClick={handleExpenseClick}
            >
              <Image
                src="/common/expense.svg"
                alt="budget icon"
                width={32}
                height={32}
              />
            </button>
          </div>
        )}

        {/* 재무 관리 메인 버튼 */}
        <button
          className={`btn-base w-14 h-14 bg-[var(--color-blockie-green)] hover:bg-green-400 text-white rounded-full shadow-lg hover-lift animate-button-press transition-transform duration-200 ${
            showFinanceOptions ? "rotate-45" : ""
          }`}
          aria-label="재무 관리"
          onClick={handleFinanceButtonClick}
        >
          <Image
            src="/common/piggybank.svg"
            alt="expense icon"
            width={32}
            height={32}
          />
        </button>
        {/* 프로필 버튼 */}
        <button
          className="btn-base w-14 h-14 bg-neutral-light-gray hover:bg-medium-gray text-white rounded-full shadow-lg hover-lift animate-button-press"
          aria-label="프로필 페이지"
          onClick={() => router.push(`${pageUrl.mypage}`)}
        >
          <Image
            src="/common/profile.svg"
            alt="profile icon"
            width={32}
            height={32}
          />
        </button>
        <button
          className="btn-base w-14 h-14 bg-blockie-blue hover:bg-blue-400 text-white rounded-full shadow-lg hover-lift animate-button-press "
          aria-label="큐브 페이지"
          onClick={() => router.push(`${pageUrl.cube}`)}
        >
          <BlockieFace size={30} emotion="happy" />
        </button>
      </div>
    </div>
  );
};

export default FloatButton;
