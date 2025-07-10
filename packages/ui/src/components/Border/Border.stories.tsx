import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Elevation & Borders Foundation Component
const ElevationBorders = () => null;

const meta = {
  title: "Foundation/Elevation & Borders",
  component: ElevationBorders,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 깊이감과 경계 체계입니다.

### 디자인 철학
- 🏔️ **계층적 깊이**: 그림자를 통한 명확한 시각적 계층 구조
- 🎨 **부드러운 경계**: 친근한 느낌의 둥근 모서리
- ✨ **미묘한 상호작용**: 자연스러운 hover/focus 피드백
- 🎯 **의도적 강조**: 중요도에 따른 적절한 elevation 적용
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ElevationBorders>;

export default meta;
type Story = StoryObj<typeof meta>;

// 그림자 데이터 정의
const shadowScale = {
  sm: {
    value: "0 1px 2px rgba(0, 0, 0, 0.05)",
    cssVar: "--shadow-sm",
    tailwind: "shadow-sm",
    use: "미묘한 구분, 입력 필드",
  },
  default: {
    value: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    cssVar: "--shadow-default",
    tailwind: "shadow",
    use: "기본 카드, 버튼",
  },
  md: {
    value: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cssVar: "--shadow-md",
    tailwind: "shadow-md",
    use: "중요한 카드, 드롭다운",
  },
  lg: {
    value: "0 10px 15px rgba(0, 0, 0, 0.1)",
    cssVar: "--shadow-lg",
    tailwind: "shadow-lg",
    use: "모달, 팝오버",
  },
  "3xl": {
    value: "0 35px 35px rgba(0, 0, 0, 0.25)",
    cssVar: "--shadow-3xl",
    tailwind: "shadow-3xl",
    use: "최고 우선순위 요소",
  },
};

// 보더 반경 데이터 정의
const radiusScale = {
  sm: {
    value: "4px",
    rem: "0.25rem",
    cssVar: "--radius-sm",
    tailwind: "rounded-sm",
    use: "작은 버튼, 태그",
  },
  default: {
    value: "8px",
    rem: "0.5rem",
    cssVar: "--radius",
    tailwind: "rounded",
    use: "기본 버튼, 입력 필드",
  },
  md: {
    value: "12px",
    rem: "0.75rem",
    cssVar: "--radius-md",
    tailwind: "rounded-md",
    use: "카드, 패널",
  },
  lg: {
    value: "16px",
    rem: "1rem",
    cssVar: "--radius-lg",
    tailwind: "rounded-lg",
    use: "큰 카드, 컨테이너",
  },
  xl: {
    value: "20px",
    rem: "1.25rem",
    cssVar: "--radius-xl",
    tailwind: "rounded-xl",
    use: "특별한 카드",
  },
  "2xl": {
    value: "24px",
    rem: "1.5rem",
    cssVar: "--radius-2xl",
    tailwind: "rounded-2xl",
    use: "프리미엄 컨테이너",
  },
  "3xl": {
    value: "32px",
    rem: "2rem",
    cssVar: "--radius-3xl",
    tailwind: "rounded-3xl",
    use: "영웅 섹션, 큰 이미지",
  },
};

// 그림자 시각화 컴포넌트
const ShadowVisualizer = ({
  size,
  data,
}: {
  size: string;
  data: (typeof shadowScale)[keyof typeof shadowScale];
}) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center mb-4">
        <div
          className="w-24 h-24 bg-white rounded-lg mb-3"
          style={{ boxShadow: data.value }}
        />
        <h4 className="font-semibold text-gray-900">shadow-{size}</h4>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center mb-3">{data.use}</p>

        <button
          onClick={() => copyToClipboard(data.tailwind, "tailwind")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "tailwind" ? "✓ 복사됨!" : data.tailwind}
        </button>
        <button
          onClick={() => copyToClipboard(`var(${data.cssVar})`, "css")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "css" ? "✓ 복사됨!" : `var(${data.cssVar})`}
        </button>
        <button
          onClick={() => copyToClipboard(data.value, "value")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "value" ? "✓ 복사됨!" : "CSS 값 복사"}
        </button>
      </div>
    </div>
  );
};

// 보더 반경 시각화 컴포넌트
const RadiusVisualizer = ({
  size,
  data,
}: {
  size: string;
  data: (typeof radiusScale)[keyof typeof radiusScale];
}) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center mb-4">
        <div
          className="w-24 h-24 bg-blockie-yellow mb-3"
          style={{ borderRadius: data.value }}
        />
        <h4 className="font-semibold text-gray-900">
          rounded-{size === "default" ? "" : size}
        </h4>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center mb-3">{data.use}</p>

        <button
          onClick={() => copyToClipboard(data.tailwind, "tailwind")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "tailwind" ? "✓ 복사됨!" : data.tailwind}
        </button>
        <button
          onClick={() => copyToClipboard(`var(${data.cssVar})`, "css")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "css" ? "✓ 복사됨!" : `var(${data.cssVar})`}
        </button>
        <button
          onClick={() =>
            copyToClipboard(`${data.value} (${data.rem})`, "value")
          }
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "value" ? "✓ 복사됨!" : `${data.value} (${data.rem})`}
        </button>
      </div>
    </div>
  );
};

// 인터랙티브 카드 컴포넌트
const InteractiveCard = ({
  title,
  shadow,
  radius,
  children,
}: {
  title: string;
  shadow: string;
  radius: string;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white p-6 transition-all duration-200 cursor-pointer ${shadow} ${radius} ${
        isHovered ? "shadow-lg transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className="font-semibold mb-2">{title}</h4>
      {children}
      <div className="mt-4 text-xs text-gray-500 font-mono">
        {shadow} {radius}
      </div>
    </div>
  );
};

// 1. Shadow System Overview 스토리
export const ShadowSystemOverview: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">그림자 시스템</h2>
          <p className="text-gray-600 mb-6">
            Blockie 앱에서 사용되는 체계적인 그림자 스케일입니다. 시각적
            계층구조와 깊이감을 표현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Object.entries(shadowScale).map(([size, data]) => (
            <ShadowVisualizer key={size} size={size} data={data} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">그림자 사용 원칙</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-700">계층적 깊이</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• shadow-sm: 기본 구분 (입력 필드, 작은 카드)</li>
                <li>• shadow: 표준 요소 (버튼, 일반 카드)</li>
                <li>• shadow-md: 중요 요소 (강조 카드, 드롭다운)</li>
                <li>• shadow-lg: 최상위 요소 (모달, 팝오버)</li>
                <li>• shadow-3xl: 특별한 요소 (영웅 섹션)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-700">상호작용 원칙</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• hover 시 한 단계 위 그림자로 변경</li>
                <li>• active 시 한 단계 아래 그림자로 변경</li>
                <li>• focus 시 그림자 + 컬러 아웃라인 조합</li>
                <li>• 부드러운 전환 애니메이션 적용</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 그림자 사용 팁
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 너무 많은 그림자를 한 화면에 사용하지 마세요</li>
            <li>• 관련된 요소들은 비슷한 깊이의 그림자를 사용하세요</li>
            <li>• 중요도에 따라 그림자 강도를 조절하세요</li>
            <li>
              • 다크 모드에서는 그림자 대신 border나 배경색으로 구분하세요
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Blockie 디자인 시스템의 전체 그림자 스케일을 보여줍니다.",
      },
    },
  },
};

// 2. Border Radius System 스토리
export const BorderRadiusSystem: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">보더 반경 시스템</h2>
          <p className="text-gray-600 mb-6">
            친근하고 부드러운 느낌을 주는 체계적인 보더 반경 스케일입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(radiusScale).map(([size, data]) => (
            <RadiusVisualizer key={size} size={size} data={data} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">보더 반경 적용 예시</h3>

          <div className="space-y-6">
            {/* 버튼 예시 */}
            <div>
              <h4 className="font-medium mb-3">버튼 스타일</h4>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-sm font-medium">
                  Small (rounded-sm)
                </button>
                <button className="bg-blockie-green text-white px-4 py-2 rounded font-medium">
                  Default (rounded)
                </button>
                <button className="bg-blockie-blue text-white px-4 py-2 rounded-md font-medium">
                  Medium (rounded-md)
                </button>
                <button className="bg-blockie-purple text-white px-4 py-2 rounded-lg font-medium">
                  Large (rounded-lg)
                </button>
              </div>
            </div>

            {/* 카드 예시 */}
            <div>
              <h4 className="font-medium mb-3">카드 스타일</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
                  <h5 className="font-medium mb-2">기본 카드</h5>
                  <p className="text-sm text-gray-600">rounded-md 적용</p>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
                  <h5 className="font-medium mb-2">강조 카드</h5>
                  <p className="text-sm text-gray-600">rounded-lg 적용</p>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-md">
                  <h5 className="font-medium mb-2">프리미엄 카드</h5>
                  <p className="text-sm text-gray-600">rounded-xl 적용</p>
                </div>
              </div>
            </div>

            {/* 입력 필드 예시 */}
            <div>
              <h4 className="font-medium mb-3">입력 필드</h4>
              <div className="space-y-3 max-w-md">
                <input
                  type="text"
                  placeholder="Small radius (rounded-sm)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
                />
                <input
                  type="text"
                  placeholder="Default radius (rounded)"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
                />
                <input
                  type="text"
                  placeholder="Medium radius (rounded-md)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">사용 가이드라인</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>작은 요소(버튼, 태그)는 작은 반경 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>카드, 패널은 md~lg 반경 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>큰 이미지나 영웅 섹션은 xl~3xl 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>일관된 반경을 유지하여 통일감 조성</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">조합 원칙</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>부모-자식 요소는 비슷한 반경 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>내부 요소는 외부보다 작은 반경</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>브랜드 특성에 맞는 일관된 선택</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>접근성을 고려한 적절한 크기</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "친근하고 부드러운 느낌을 주는 보더 반경 시스템을 보여줍니다.",
      },
    },
  },
};

// 3. Card Container Elevation Guide 스토리
export const CardContainerElevationGuide: Story = {
  render: () => {
    const [selectedElevation, setSelectedElevation] = useState("default");

    const elevationGuide = [
      {
        level: "sm",
        title: "Surface Level",
        description: "기본 구분이 필요한 요소",
        examples: ["입력 필드", "작은 카드", "구분선 역할"],
        color: "bg-gray-50",
      },
      {
        level: "default",
        title: "Base Level",
        description: "일반적인 UI 요소",
        examples: ["기본 카드", "버튼", "탭"],
        color: "bg-white",
      },
      {
        level: "md",
        title: "Raised Level",
        description: "중요한 콘텐츠나 상호작용 요소",
        examples: ["강조 카드", "드롭다운", "툴팁"],
        color: "bg-white",
      },
      {
        level: "lg",
        title: "Floating Level",
        description: "최상위 오버레이 요소",
        examples: ["모달", "팝오버", "메뉴"],
        color: "bg-white",
      },
      {
        level: "3xl",
        title: "Prominence Level",
        description: "특별한 강조가 필요한 요소",
        examples: ["영웅 섹션", "중요 공지", "프리미엄 카드"],
        color: "bg-white",
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            카드/컨테이너 Elevation 가이드
          </h2>
          <p className="text-gray-600 mb-6">
            콘텐츠의 중요도와 상호작용 수준에 따른 적절한 elevation 선택
            가이드입니다.
          </p>
        </div>

        {/* Elevation 레벨 선택 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Elevation 레벨 비교</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {elevationGuide.map((guide) => (
              <button
                key={guide.level}
                onClick={() => setSelectedElevation(guide.level)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedElevation === guide.level
                    ? "bg-blockie-yellow text-neutral-black shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          {/* 선택된 레벨 상세 정보 */}
          {elevationGuide
            .filter((guide) => guide.level === selectedElevation)
            .map((guide) => (
              <div
                key={guide.level}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div>
                  <h4 className="font-semibold mb-3">{guide.title} 상세</h4>
                  <p className="text-gray-600 mb-4">{guide.description}</p>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">사용 예시:</h5>
                    <ul className="text-sm text-gray-600">
                      {guide.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-blockie-blue">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <code className="text-sm text-blue-700">
                      shadow-{guide.level === "default" ? "" : guide.level}
                    </code>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">시각적 예시</h5>
                  <div
                    className={`${guide.color} p-6 rounded-lg transition-all shadow-${guide.level === "default" ? "" : guide.level}`}
                  >
                    <h6 className="font-semibold mb-2">{guide.title} 카드</h6>
                    <p className="text-gray-600 text-sm mb-4">
                      이 카드는 {guide.level} elevation을 사용합니다.
                    </p>
                    <div className="flex gap-2">
                      <button className="bg-blockie-blue text-white px-3 py-1 rounded text-sm">
                        액션
                      </button>
                      <button className="border border-gray-300 px-3 py-1 rounded text-sm">
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* 실제 사용 예시 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">실제 적용 예시</h3>

          <div className="space-y-8">
            {/* 대시보드 레이아웃 */}
            <div>
              <h4 className="font-medium mb-4">대시보드 레이아웃</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium mb-2">통계 카드</h5>
                    <p className="text-2xl font-bold text-blockie-blue">
                      2,543
                    </p>
                    <p className="text-sm text-gray-600">shadow-sm 사용</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-medium mb-2">메인 카드</h5>
                    <p className="text-gray-600 text-sm">중요한 콘텐츠</p>
                    <p className="text-sm text-gray-600 mt-2">
                      shadow-default 사용
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h5 className="font-medium mb-2">강조 카드</h5>
                    <p className="text-gray-600 text-sm">특별한 알림</p>
                    <p className="text-sm text-gray-600 mt-2">shadow-md 사용</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 폼 레이아웃 */}
            <div>
              <h4 className="font-medium mb-4">폼 레이아웃</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                  <h5 className="font-semibold mb-4">사용자 정보</h5>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="이름"
                      className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:shadow"
                    />
                    <input
                      type="email"
                      placeholder="이메일"
                      className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:shadow"
                    />
                    <button className="w-full bg-blockie-yellow text-neutral-black py-2 rounded font-medium shadow hover:shadow-md transition-shadow">
                      제출하기
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    입력 필드: shadow-sm, 버튼: hover시 shadow-md
                  </p>
                </div>
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <div>
              <h4 className="font-medium mb-4">네비게이션 메뉴</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative">
                  <button className="bg-white px-4 py-2 rounded shadow border border-gray-200 hover:shadow-md transition-shadow">
                    메뉴 열기 ▼
                  </button>

                  {/* 드롭다운 메뉴 */}
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px]">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      프로필
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      설정
                    </a>
                    <hr className="my-1 border-gray-200" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      로그아웃
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-8">
                    버튼: shadow, 드롭다운: shadow-lg
                  </p>
                </div>
              </div>
            </div>

            {/* 모달/팝오버 */}
            <div>
              <h4 className="font-medium mb-4">모달/팝오버</h4>
              <div className="bg-gray-50 p-6 rounded-lg relative">
                {/* 백드롭 */}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>

                {/* 모달 */}
                <div className="relative z-10 max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6">
                  <h5 className="font-semibold mb-3">확인 필요</h5>
                  <p className="text-gray-600 text-sm mb-4">
                    정말로 이 작업을 수행하시겠습니까?
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                      취소
                    </button>
                    <button className="px-4 py-2 bg-blockie-red text-white rounded text-sm hover:bg-opacity-90 transition-colors">
                      확인
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    shadow-lg 사용
                  </p>
                </div>
              </div>
            </div>

            {/* 영웅 섹션 */}
            <div>
              <h4 className="font-medium mb-4">영웅 섹션</h4>
              <div className="bg-gradient-to-r from-blockie-blue to-blockie-purple text-white p-8 rounded-3xl shadow-3xl">
                <h5 className="text-2xl font-bold mb-4">
                  Blockie와 함께하세요
                </h5>
                <p className="text-lg opacity-90 mb-6">
                  혁신적인 블록 기반 솔루션으로 더 나은 경험을 만들어보세요.
                </p>
                <button className="bg-white text-blockie-blue px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  시작하기
                </button>
                <p className="text-sm opacity-75 mt-4">
                  메인 컨테이너: shadow-3xl, 버튼: shadow-lg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 계층 구조 시각화 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Elevation 계층 구조</h3>

          <div className="relative bg-gray-100 p-8 rounded-lg">
            {/* 레이어 1: 백그라운드 */}
            <div className="absolute inset-4 bg-gray-50 rounded-lg">
              <span className="absolute top-2 left-2 text-xs text-gray-500">
                Background
              </span>
            </div>

            {/* 레이어 2: 기본 카드들 */}
            <div className="relative grid grid-cols-2 gap-4 p-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="text-xs text-gray-600">shadow-sm</span>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <span className="text-xs text-gray-600">shadow-default</span>
              </div>
            </div>

            {/* 레이어 3: 강조 요소 */}
            <div className="relative z-10 bg-white p-4 rounded-lg shadow-md mx-8 -mt-4">
              <span className="text-xs text-gray-600">
                shadow-md (강조 카드)
              </span>
            </div>

            {/* 레이어 4: 플로팅 요소 */}
            <div className="relative z-20 bg-white p-3 rounded-lg shadow-lg mx-12 -mt-2">
              <span className="text-xs text-gray-600">
                shadow-lg (드롭다운)
              </span>
            </div>

            {/* 레이어 5: 최상위 요소 */}
            <div className="relative z-30 bg-blockie-yellow p-3 rounded-xl shadow-3xl mx-16 -mt-2">
              <span className="text-xs text-neutral-black font-medium">
                shadow-3xl (모달)
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            각 레이어는 명확한 시각적 계층을 형성합니다
          </p>
        </div>
      </div>
    );
  },
};
// 4. Interaction Shadow Changes 스토리
export const InteractionShadowChanges: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    const interactionExamples = [
      {
        id: "button",
        title: "버튼 인터랙션",
        description: "클릭 가능한 요소의 상태별 그림자 변화",
        component: (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium shadow transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:shadow-sm active:translate-y-0">
                Primary Button
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow hover:-translate-y-0.5 active:shadow-sm active:translate-y-0">
                Secondary Button
              </button>
              <button className="bg-blockie-blue text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:shadow active:translate-y-0">
                Info Button
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>기본:</strong> shadow 또는 shadow-sm
              </p>
              <p>
                • <strong>Hover:</strong> 한 단계 위 + transform
              </p>
              <p>
                • <strong>Active:</strong> 한 단계 아래 + transform 제거
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "card",
        title: "카드 인터랙션",
        description: "카드 요소의 호버/포커스 상태 변화",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <h6 className="font-semibold mb-2">인터랙티브 카드</h6>
                <p className="text-gray-600 text-sm mb-3">호버해보세요</p>
                <span className="text-xs bg-blockie-blue text-white px-2 py-1 rounded">
                  클릭 가능
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                <h6 className="font-semibold mb-2">강조 카드</h6>
                <p className="text-gray-600 text-sm mb-3">더 큰 변화</p>
                <span className="text-xs bg-blockie-purple text-white px-2 py-1 rounded">
                  중요
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>기본:</strong> shadow-sm 또는 shadow
              </p>
              <p>
                • <strong>Hover:</strong> shadow-lg~xl + 부드러운 상승
              </p>
              <p>
                • <strong>지속시간:</strong> 300ms로 자연스러운 전환
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "input",
        title: "입력 필드 인터랙션",
        description: "폼 요소의 포커스 상태와 그림자 조합",
        component: (
          <div className="space-y-4">
            <div className="space-y-3 max-w-md">
              <input
                type="text"
                placeholder="기본 입력 필드"
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow focus:shadow"
              />
              <input
                type="email"
                placeholder="강조 입력 필드"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue focus:shadow-md"
              />
              <textarea
                placeholder="텍스트 영역"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blockie-green focus:border-blockie-green focus:shadow-md resize-none"
              />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>기본:</strong> shadow-sm
              </p>
              <p>
                • <strong>Focus:</strong> ring + 강화된 shadow + 컬러 변화
              </p>
              <p>
                • <strong>조합:</strong> 그림자 + 테두리 + 링 효과
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "dropdown",
        title: "드롭다운/팝오버 인터랙션",
        description: "오버레이 요소의 나타남/사라짐 애니메이션",
        component: (
          <div className="space-y-4">
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDemo(activeDemo === "dropdown" ? null : "dropdown")
                }
                className="bg-white border border-gray-300 px-4 py-2 rounded shadow-sm transition-all duration-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
              >
                드롭다운 열기 ▼
              </button>

              {activeDemo === "dropdown" && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    메뉴 항목 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    메뉴 항목 2
                  </a>
                  <hr className="my-1 border-gray-200" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    삭제
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setActiveDemo(activeDemo === "tooltip" ? null : "tooltip")
                }
                className="bg-blockie-blue text-white px-4 py-2 rounded shadow transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                툴팁 표시
              </button>

              {activeDemo === "tooltip" && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
                  유용한 정보가 여기에
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>등장:</strong> fade-in + slide 애니메이션
              </p>
              <p>
                • <strong>그림자:</strong> shadow-lg로 플로팅 효과
              </p>
              <p>
                • <strong>지속시간:</strong> 200ms로 빠른 반응
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "modal",
        title: "모달 인터랙션",
        description: "최상위 오버레이의 등장/퇴장 효과",
        component: (
          <div className="space-y-4">
            <button
              onClick={() =>
                setActiveDemo(activeDemo === "modal" ? null : "modal")
              }
              className="bg-blockie-purple text-white px-4 py-2 rounded-lg shadow transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              모달 열기
            </button>

            {activeDemo === "modal" && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* 백드롭 */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 animate-in fade-in duration-300"
                  onClick={() => setActiveDemo(null)}
                />

                {/* 모달 콘텐츠 */}
                <div className="relative bg-white rounded-xl shadow-3xl p-6 max-w-md w-full animate-in zoom-in-95 fade-in duration-300">
                  <h5 className="text-lg font-semibold mb-3">모달 제목</h5>
                  <p className="text-gray-600 mb-4">
                    이것은 shadow-3xl을 사용하는 모달입니다.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setActiveDemo(null)}
                      className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button className="px-4 py-2 bg-blockie-yellow text-neutral-black rounded text-sm hover:bg-opacity-90 transition-colors">
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>백드롭:</strong> fade-in 애니메이션
              </p>
              <p>
                • <strong>모달:</strong> zoom-in + fade-in 조합
              </p>
              <p>
                • <strong>그림자:</strong> shadow-3xl로 최대 강조
              </p>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">인터랙션별 그림자 변화</h2>
          <p className="text-gray-600 mb-6">
            사용자 상호작용에 따른 자연스럽고 일관된 그림자 변화 패턴을
            학습하세요.
          </p>
        </div>

        {/* 인터랙션 원칙 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">인터랙션 원칙</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-blue-700">
                상태별 그림자 규칙
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Rest:</strong> 기본 그림자 (요소 타입에 맞게)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Hover:</strong> 한 단계 위 그림자 + 상승 효과
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Active:</strong> 한 단계 아래 그림자 + 눌림 효과
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Focus:</strong> 기본 그림자 + 컬러 링
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-green-700">
                애니메이션 가이드
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>빠른 반응:</strong> 100-200ms (버튼, 링크)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>부드러운 전환:</strong> 200-300ms (카드, 패널)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>극적 효과:</strong> 300-500ms (모달, 페이지 전환)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Easing:</strong> ease-out 또는 cubic-bezier
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 인터랙션 예시들 */}
        <div className="space-y-6">
          {interactionExamples.map((example) => (
            <div
              key={example.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h4 className="font-semibold text-lg mb-2">{example.title}</h4>
              <p className="text-gray-600 mb-4">{example.description}</p>
              {example.component}
            </div>
          ))}
        </div>

        {/* 상태 전환 매트릭스 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">그림자 전환 매트릭스</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium">요소 타입</th>
                  <th className="text-left p-3 font-medium">Rest</th>
                  <th className="text-left p-3 font-medium">Hover</th>
                  <th className="text-left p-3 font-medium">Active</th>
                  <th className="text-left p-3 font-medium">Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 font-medium">Primary Button</td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-md
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow + ring
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Card</td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-lg
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm + ring
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Input Field</td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-sm
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow + ring
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Dropdown</td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      none
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-lg
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-lg
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-lg
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Modal</td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      none
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-3xl
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-3xl
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      shadow-3xl
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CSS 애니메이션 예시 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            CSS 애니메이션 코드 예시
          </h3>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">기본 버튼 인터랙션</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.button {
    @apply shadow transition-all duration-200;
   }
   
   .button:hover {
    @apply shadow-md -translate-y-0.5;
   }
   
   .button:active {
    @apply shadow-sm translate-y-0;
   }
   
   .button:focus {
    @apply ring-2 ring-blockie-yellow outline-none;
   }`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">카드 호버 효과</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.card {
    @apply shadow-sm transition-all duration-300 ease-out;
   }
   
   .card:hover {
    @apply shadow-lg -translate-y-1;
   }
   
   /* 또는 더 극적인 효과 */
   .card-dramatic:hover {
    @apply shadow-xl -translate-y-2 scale-105;
   }`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">모달 등장 애니메이션</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.modal-backdrop {
    @apply animate-in fade-in duration-300;
   }
   
   .modal-content {
    @apply shadow-3xl animate-in zoom-in-95 fade-in duration-300;
   }
   
   .modal-exit {
    @apply animate-out zoom-out-95 fade-out duration-200;
   }`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">
            🎯 인터랙션 디자인 팁
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• 일관된 전환 시간을 사용하여 브랜드 느낌 통일</li>
            <li>• 과도한 애니메이션은 피하고 의미 있는 피드백에 집중</li>
            <li>• 접근성을 위해 prefers-reduced-motion 고려</li>
            <li>• 모바일에서는 더 빠른 전환(150-200ms) 사용</li>
            <li>• transform과 shadow를 조합하여 자연스러운 깊이감 연출</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자 상호작용에 따른 자연스럽고 일관된 그림자 변화 패턴을 보여줍니다.",
      },
    },
  },
};
