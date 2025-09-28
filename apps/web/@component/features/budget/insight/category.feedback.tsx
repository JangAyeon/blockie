import { useState } from "react";

type CategoryKey = "fixed" | "variable" | "irregular" | "leisure";

const categories: Record<CategoryKey, { title: string; tips: string[] }> = {
  fixed: {
    title: "고정 지출",
    tips: [
      "통신비: 알뜰폰 요금제로 바꾸면 최대 40% 절약할 수 있습니다.",
      "구독 서비스: 사용하지 않는 구독을 해지해 매달 고정비를 줄이세요.",
      "보험: 보장 범위가 겹치는 보험을 조정하면 연 수십만 원 절약됩니다.",
    ],
  },
  variable: {
    title: "월별 변동 지출",
    tips: [
      "식비: 집밥을 늘리면 외식비의 절반 이상을 아낄 수 있습니다.",
      "교통: 대중교통 정기권으로 최대 30% 절약이 가능합니다.",
      "공과금: 전기·가스 절약 습관으로 월 평균 10~15% 비용 감소 효과가 있습니다.",
    ],
  },
  irregular: {
    title: "비정기 지출",
    tips: [
      "여행: 미리 예약하면 교통·숙박비를 20~30% 절약할 수 있습니다.",
      "가전제품: 필요 시기 전에 세일 기간을 노리면 큰 지출을 줄일 수 있습니다.",
      "경조사: 경조사비 예산을 미리 따로 잡아두면 갑작스러운 부담을 줄일 수 있습니다.",
    ],
  },
  leisure: {
    title: "기타 (취미/여가 등)",
    tips: [
      "취미: 무료 체험이나 공공 프로그램을 활용해 비용을 절약할 수 있습니다.",
      "여가: OTT는 가족·친구와 함께 공유하면 절반 이하로 줄일 수 있습니다.",
      "자기계발: 온라인 무료 강의를 활용하면 교육비를 크게 아낄 수 있습니다.",
    ],
  },
};

const CategoryFeedback = () => {
  const [activeTab, setActiveTab] = useState<CategoryKey>("fixed");

  return (
    <div className="bg-gray-50 rounded-lg p-4 max-w-2xl">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">절약 팁</h4>

      {/* 탭 버튼들 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as CategoryKey)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === key
                ? "bg-blockie-purple text-white"
                : "bg-white text-gray-600 hover:bg-green-50 hover:text-blockie-green"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* 선택된 카테고리의 팁들 */}
      <div className="bg-white rounded-lg p-2 space-y-2">
        <ul className="space-y-1">
          {categories[activeTab].tips.map((tip, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="text-blockie-purple text-lg">•</span>
              <span className="text-sm text-gray-700 ">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFeedback;
