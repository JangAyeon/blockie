import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Animation & Motion Foundation Component
const AnimationMotion = () => null;

const meta = {
  title: "Foundation/Animation & Motion",
  component: AnimationMotion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 애니메이션과 모션 체계입니다.

### 디자인 철학
- ⚡ **빠른 반응성**: 즉각적인 피드백으로 반응형 인터페이스
- 🎭 **자연스러운 움직임**: 현실적인 물리법칙을 반영한 애니메이션
- 🎯 **목적이 있는 모션**: 사용자의 이해를 돕는 의미 있는 움직임
- ♿ **접근성 고려**: 움직임에 민감한 사용자를 위한 대안 제공
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnimationMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

// 트랜지션 타이밍 데이터
const transitionTimings = {
  fast: {
    value: "0.2s",
    cssVar: "--transition-fast",
    use: "버튼 클릭, 호버 등 즉각적 반응",
  },
  medium: {
    value: "0.3s",
    cssVar: "--transition-medium",
    use: "카드 전환, 페이지 요소 등 일반적 전환",
  },
  slow: {
    value: "0.5s",
    cssVar: "--transition-slow",
    use: "모달, 사이드바 등 큰 변화",
  },
};

// 애니메이션 데이터
const animations = {
  "slide-up": {
    cssVar: "--animate-slide-up",
    value: "slide-up 0.3s ease-out forwards",
    use: "요소 등장, 모달 등장",
    description: "아래에서 위로 슬라이드하며 나타남",
  },
  "button-press": {
    cssVar: "--animate-button-press",
    value: "button-press var(--transition-fast) ease-out",
    use: "버튼 클릭 피드백",
    description: "클릭 시 살짝 축소되는 효과",
  },
  "pulse-slow": {
    cssVar: "--animate-pulse-slow",
    value: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    use: "로딩, 대기 상태",
    description: "부드럽게 깜빡이는 효과",
  },
  "bounce-slow": {
    cssVar: "--animate-bounce-slow",
    value: "bounce 3s infinite",
    use: "재미있는 강조, 성공 알림",
    description: "천천히 통통 튀는 효과",
  },
};

// 타이밍 시각화 컴포넌트
const TimingVisualizer = ({
  name,
  data,
}: {
  name: string;
  data: (typeof transitionTimings)[keyof typeof transitionTimings];
}) => {
  const [copied, setCopied] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), parseFloat(data.value) * 1000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center mb-4">
        <button
          onClick={triggerAnimation}
          className={`w-20 h-20 bg-blockie-yellow rounded-lg mb-3 cursor-pointer transition-transform`}
          style={{
            transitionDuration: data.value,
            transform: isAnimating
              ? "scale(1.2) rotate(10deg)"
              : "scale(1) rotate(0deg)",
          }}
        />
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600">{data.value}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center mb-3">{data.use}</p>

        <button
          onClick={() =>
            copyToClipboard(`transition-duration: ${data.value}`, "css")
          }
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "css"
            ? "✓ 복사됨!"
            : `transition-duration: ${data.value}`}
        </button>
        <button
          onClick={() => copyToClipboard(`var(${data.cssVar})`, "var")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "var" ? "✓ 복사됨!" : `var(${data.cssVar})`}
        </button>
      </div>
    </div>
  );
};

// 애니메이션 시각화 컴포넌트
const AnimationVisualizer = ({
  name,
  data,
}: {
  name: string;
  data: (typeof animations)[keyof typeof animations];
}) => {
  const [copied, setCopied] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  const getAnimationClass = () => {
    if (!isAnimating) return "";

    switch (name) {
      case "slide-up":
        return "animate-slide-up";
      case "button-press":
        return "animate-button-press";
      case "pulse-slow":
        return "animate-pulse-slow";
      case "bounce-slow":
        return "animate-bounce-slow";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 mb-3 flex items-center justify-center">
          <div
            className={`w-16 h-16 bg-blockie-blue rounded-lg cursor-pointer ${getAnimationClass()}`}
            onClick={triggerAnimation}
          />
        </div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center mb-2">
          {data.description}
        </p>
        <p className="text-xs text-gray-500 text-center mb-3">{data.use}</p>

        <button
          onClick={() => copyToClipboard(`animation: ${data.value}`, "css")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "css" ? "✓ 복사됨!" : "CSS 값 복사"}
        </button>
        <button
          onClick={() => copyToClipboard(`var(${data.cssVar})`, "var")}
          className="block w-full text-left text-xs font-mono bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          {copied === "var" ? "✓ 복사됨!" : `var(${data.cssVar})`}
        </button>
      </div>
    </div>
  );
};

// 1. Transition Timings 스토리
export const TransitionTimings: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">트랜지션 타이밍</h2>
          <p className="text-gray-600 mb-6">
            일관된 사용자 경험을 위한 체계적인 트랜지션 타이밍 시스템입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(transitionTimings).map(([name, data]) => (
            <TimingVisualizer key={name} name={name} data={data} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">타이밍 사용 원칙</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-red-700">Fast (0.2s)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 버튼 hover/active</li>
                <li>• 링크 색상 변화</li>
                <li>• 작은 아이콘 변화</li>
                <li>• 즉각적 피드백</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-yellow-700">
                Medium (0.3s)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 카드 hover 효과</li>
                <li>• 드롭다운 메뉴</li>
                <li>• 탭 전환</li>
                <li>• 일반적인 상태 변화</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-700">Slow (0.5s)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 모달 등장/퇴장</li>
                <li>• 사이드바 슬라이드</li>
                <li>• 페이지 전환</li>
                <li>• 큰 레이아웃 변화</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 타이밍 선택 팁
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 사용자 액션에 대한 즉각적 반응은 fast 사용</li>
            <li>• UI 상태 변화는 medium이 가장 자연스러움</li>
            <li>• 큰 변화나 주의를 끌어야 할 때는 slow 사용</li>
            <li>• 모바일에서는 조금 더 빠른 타이밍 선호</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "사용자 경험을 위한 일관된 트랜지션 타이밍 시스템을 보여줍니다.",
      },
    },
  },
};

// 2. Keyframe Animations 스토리
export const KeyframeAnimations: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">키프레임 애니메이션</h2>
          <p className="text-gray-600 mb-6">
            브랜드 경험을 향상시키는 사전 정의된 애니메이션들입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(animations).map(([name, data]) => (
            <AnimationVisualizer key={name} name={name} data={data} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">애니메이션 상세 정보</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">slide-up</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`}
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                요소가 아래에서 위로 슬라이드하며 나타나는 애니메이션
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">button-press</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}`}
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                버튼 클릭 시 살짝 축소되어 눌린 느낌을 주는 애니메이션
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">
            🎯 애니메이션 사용 가이드
          </h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>
              • <strong>slide-up:</strong> 모달, 토스트, 새로운 콘텐츠 등장 시
            </li>
            <li>
              • <strong>button-press:</strong> 중요한 버튼의 클릭 피드백
            </li>
            <li>
              • <strong>pulse-slow:</strong> 로딩 상태, 대기 중인 요소
            </li>
            <li>
              • <strong>bounce-slow:</strong> 성공 알림, 재미있는 강조
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "브랜드 경험을 향상시키는 사전 정의된 키프레임 애니메이션들을 보여줍니다.",
      },
    },
  },
};

// 3. Interaction Feedback 스토리
export const InteractionFeedback: Story = {
  render: () => {
    const [buttonPressed, setButtonPressed] = useState<string | null>(null);

    const handleButtonPress = (buttonId: string) => {
      setButtonPressed(buttonId);
      setTimeout(() => setButtonPressed(null), 200);
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">인터랙션 피드백</h2>
          <p className="text-gray-600 mb-6">
            사용자 행동에 대한 즉각적이고 자연스러운 피드백 시스템입니다.
          </p>
        </div>

        {/* 버튼 인터랙션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">버튼 피드백</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">기본 버튼 효과</h4>
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  onClick={() => handleButtonPress("primary")}
                >
                  Primary Button
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow hover:-translate-y-0.5 active:scale-95">
                  Secondary Button
                </button>
                <button className="bg-blockie-blue text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95">
                  Action Button
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                hover: 그림자 + 상승, active: 축소 효과
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">버튼 프레스 애니메이션</h4>
              <div className="flex flex-wrap gap-4">
                <button
                  className={`bg-blockie-green text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md ${
                    buttonPressed === "animated" ? "animate-button-press" : ""
                  }`}
                  onClick={() => handleButtonPress("animated")}
                >
                  클릭해보세요
                </button>
                <button
                  className={`bg-blockie-purple text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md ${
                    buttonPressed === "animated2" ? "animate-button-press" : ""
                  }`}
                  onClick={() => handleButtonPress("animated2")}
                >
                  애니메이션 버튼
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                button-press 키프레임 애니메이션 적용
              </p>
            </div>
          </div>
        </div>

        {/* 카드 인터랙션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">카드 호버 효과</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <h6 className="font-semibold mb-2">기본 카드</h6>
              <p className="text-gray-600 text-sm">
                호버 시 그림자와 상승 효과
              </p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
              <h6 className="font-semibold mb-2">강화된 카드</h6>
              <p className="text-gray-600 text-sm">더 큰 변화 + 스케일 효과</p>
            </div>
            <div className="bg-gradient-to-r from-blockie-blue to-blockie-purple text-white p-6 rounded-lg shadow transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
              <h6 className="font-semibold mb-2">특별한 카드</h6>
              <p className="text-sm opacity-90">그라디언트 + 그림자 효과</p>
            </div>
          </div>
        </div>

        {/* hover-lift 효과 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">커스텀 호버 효과</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">hover-lift 클래스</h5>
              <div className="space-y-3">
                <div className="bg-blockie-yellow p-4 rounded-lg hover-lift transition-all duration-200 cursor-pointer">
                  <p className="text-neutral-black font-medium">
                    Hover Lift 효과
                  </p>
                  <p className="text-neutral-dark-gray text-sm">
                    마우스를 올려보세요
                  </p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-lg hover-lift transition-all duration-200 cursor-pointer">
                  <p className="font-medium">카드형 요소</p>
                  <p className="text-gray-600 text-sm">부드러운 상승 효과</p>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">hover-scale 클래스</h5>
              <div className="space-y-3">
                <div className="bg-blockie-pink text-white p-4 rounded-lg hover-scale cursor-pointer">
                  <p className="font-medium">Scale 효과</p>
                  <p className="text-sm opacity-90">살짝 커지는 효과</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-lg hover-scale cursor-pointer">
                  <p className="font-medium">확대 효과</p>
                  <p className="text-gray-600 text-sm">1.05배 확대</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 예시 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">CSS 구현 예시</h3>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">기본 버튼 피드백</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.button {
  @apply transition-all duration-200;
}
.button:hover {
  @apply shadow-md -translate-y-0.5;
}
.button:active {
  @apply scale-95;
}`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">카드 호버 효과</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.card {
  @apply transition-all duration-300;
}
.card:hover {
  @apply shadow-lg -translate-y-1;
}`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">버튼 프레스 애니메이션</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.button-animated:active {
  @apply animate-button-press;
}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">
            ⚡ 피드백 디자인 원칙
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• 모든 클릭 가능한 요소는 시각적 피드백 제공</li>
            <li>• hover 효과는 요소의 중요도에 비례</li>
            <li>• 애니메이션은 과하지 않게, 자연스럽게</li>
            <li>• 접근성을 위해 prefers-reduced-motion 고려</li>
            <li>• 일관된 타이밍으로 브랜드 통일성 유지</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자 행동에 대한 즉각적이고 자연스러운 피드백 시스템을 보여줍니다.",
      },
    },
  },
};
// 4. Real World Examples 스토리
export const RealWorldExamples: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
      {}
    );

    const toggleLoading = (key: string) => {
      setLoadingStates((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const showToastMessage = () => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">실제 적용 예시</h2>
          <p className="text-gray-600 mb-6">
            실제 UI에서 애니메이션과 모션이 어떻게 활용되는지 확인해보세요.
          </p>
        </div>

        {/* 로딩 상태 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">로딩 상태 애니메이션</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">버튼 로딩 상태</h4>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => toggleLoading("button1")}
                  className="bg-blockie-blue text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:opacity-70"
                  disabled={loadingStates.button1}
                >
                  {loadingStates.button1 ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse-slow"></div>
                      로딩 중...
                    </span>
                  ) : (
                    "데이터 불러오기"
                  )}
                </button>

                <button
                  onClick={() => toggleLoading("button2")}
                  className="bg-blockie-green text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:opacity-70"
                  disabled={loadingStates.button2}
                >
                  {loadingStates.button2 ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      처리 중...
                    </span>
                  ) : (
                    "파일 업로드"
                  )}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">스켈레톤 로딩</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  {loadingStates.skeleton ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse-slow w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse-slow w-1/2"></div>
                    </div>
                  ) : (
                    <div>
                      <h5 className="font-medium mb-2">실제 콘텐츠</h5>
                      <p className="text-gray-600 text-sm">
                        이것은 로딩이 완료된 후 보여지는 실제 콘텐츠입니다.
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleLoading("skeleton")}
                  className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  {loadingStates.skeleton ? "콘텐츠 보기" : "로딩 상태 보기"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 모달과 토스트 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            모달 & 토스트 애니메이션
          </h3>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blockie-purple text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              모달 열기
            </button>
            <button
              onClick={showToastMessage}
              className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              토스트 알림
            </button>
          </div>

          {/* 모달 */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                onClick={() => setShowModal(false)}
              />
              <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full animate-slide-up">
                <h5 className="text-lg font-semibold mb-3">예시 모달</h5>
                <p className="text-gray-600 mb-4">
                  slide-up 애니메이션과 함께 나타나는 모달입니다.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    닫기
                  </button>
                  <button className="px-4 py-2 bg-blockie-blue text-white rounded text-sm hover:bg-opacity-90 transition-colors">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 토스트 */}
          {showToast && (
            <div className="fixed top-4 right-4 z-50">
              <div className="bg-blockie-green text-white px-4 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-2">
                <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>성공적으로 완료되었습니다!</span>
              </div>
            </div>
          )}
        </div>

        {/* 폼 피드백 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">폼 인터랙션 피드백</h3>

          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-blockie-yellow text-neutral-black py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95">
              로그인
            </button>
          </div>
        </div>

        {/* 성공 애니메이션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">성공 피드백 애니메이션</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blockie-green rounded-full flex items-center justify-center animate-bounce-slow">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h5 className="font-medium text-green-800">업로드 완료!</h5>
                <p className="text-sm text-green-600">
                  파일이 성공적으로 업로드되었습니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blockie-blue rounded-full flex items-center justify-center hover-scale cursor-pointer">
                <span className="text-white text-xl">🎉</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">축하합니다!</h5>
                <p className="text-sm text-blue-600">
                  모든 작업이 완료되었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 그리드 애니메이션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">카드 그리드 애니메이션</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${item * 100}ms` }}
              >
                <div className="w-full h-24 bg-gradient-to-r from-blockie-blue to-blockie-purple rounded mb-3"></div>
                <h6 className="font-medium mb-1">카드 {item}</h6>
                <p className="text-gray-600 text-sm">
                  호버 시 부드러운 상승 효과
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 네비게이션 애니메이션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">네비게이션 인터랙션</h3>

          <nav className="flex gap-1 bg-gray-100 p-2 rounded-lg">
            {["홈", "제품", "가격", "회사소개"].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`px-3 py-2 rounded font-medium transition-all duration-200 ${
                  index === 0
                    ? "bg-blockie-yellow text-neutral-black shadow-sm"
                    : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* CSS 구현 가이드 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">주요 CSS 패턴</h3>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">모달 등장 애니메이션</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.modal {
    @apply animate-slide-up;
   }
   
   .modal-backdrop {
    @apply transition-opacity duration-300;
   }`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">로딩 상태 처리</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.loading-pulse {
    @apply animate-pulse-slow;
   }
   
   .loading-spinner {
    @apply animate-spin;
   }`}
                </code>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">카드 그리드 지연 애니메이션</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700 whitespace-pre-line">
                  {`.card:nth-child(1) { animation-delay: 100ms; }
   .card:nth-child(2) { animation-delay: 200ms; }
   .card:nth-child(3) { animation-delay: 300ms; }`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">
            🎬 실무 애니메이션 팁
          </h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• 로딩 상태는 사용자의 기다림을 줄이는 심리적 효과</li>
            <li>• 모달/토스트는 slide-up으로 자연스러운 등장</li>
            <li>• 폼 피드백은 즉각적으로, 성공 애니메이션은 기쁨을 표현</li>
            <li>• 카드 그리드는 지연 애니메이션으로 순차적 등장</li>
            <li>• 과도한 애니메이션보다는 의미 있는 피드백에 집중</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제 UI에서 애니메이션과 모션이 어떻게 활용되는지 보여주는 실용적인 예시들입니다.",
      },
    },
  },
};
