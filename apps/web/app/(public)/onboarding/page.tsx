"use client";

import { useState } from "react";
import { BlockieFace, BlockieBottom } from "@repo/ui";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "매일 쌓아가는 블록 타워",
    description: "1만원 = 1블록, 당신의 소비를 직관적으로 확인하세요",
    color: "bg-blockie-yellow",
    actionColor: "hover:bg-warning",
  },
  {
    title: "소비 패턴을 한눈에",
    description: "카테고리별 색상으로 소비 패턴을 시각적으로 분석해요",
    color: "bg-blockie-blue",
    actionColor: "hover:bg-info",
  },
  {
    title: "재미있게 예산 관리",
    description: "목표를 달성하며 성취감을 느끼세요",
    color: "bg-blockie-green",
    actionColor: "hover:bg-success",
  },
];

// 온보딩 화면
function OnboardingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];
  const router = useRouter();
  const isEndSlide = activeSlide == slides.length - 1;
  const handleSkipBtn = () => {
    router.push("/signin");
  };

  const handleNextSlideBtn = () => {
    if (!isEndSlide) {
      setActiveSlide((activeSlide + 1) % slides.length);
    } else {
      router.push("/signin");
    }
  };

  // TODO: 예러 및 예외처리
  if (!currentSlide) return <div>잘못됨</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      {/* 상단 */}
      <header className="w-full max-w-md flex justify-end mb-6 ">
        <button
          onClick={handleSkipBtn}
          className="text-sm text-neutral-dark-gray font-medium hover:text-neutral-black"
        >
          건너뛰기
        </button>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="w-full max-w-md flex flex-col items-center text-center gap-6">
        {/* 아이콘 영역 */}
        <div
          className={`w-40 h-40 rounded-full flex items-center justify-center ${currentSlide.color}/20`}
        >
          <BlockieFace size={120} emotion="happy" />
        </div>

        {/* 텍스트 */}
        <div className="px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-black mb-2">
            {currentSlide.title}
          </h1>
          <p className="text-neutral-dark-gray text-base sm:text-lg">
            {currentSlide.description}
          </p>
        </div>

        {/* 인디케이터 */}
        <div className="flex space-x-2">
          {slides.map((_, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? `${currentSlide.color} w-6` : "bg-gray-200 w-2"
                }`}
              />
            );
          })}
        </div>
      </main>

      {/* 버튼 */}
      <div className="w-full max-w-md px-4 mt-6">
        <button
          onClick={handleNextSlideBtn}
          className={`w-full h-14 ${currentSlide.color} ${currentSlide.actionColor} text-neutral-black rounded-xl font-medium text-lg transition`}
        >
          {!isEndSlide ? "다음" : "시작하기"}
        </button>

        <div className="mt-4 text-center text-blockie-green">
          <p className="text-sm text-neutral-dark-gray">
            이미 계정이 있으신가요?{" "}
            <a href="/signin" className="text-neutral-black font-medium">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
