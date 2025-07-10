import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Spacing System Foundation Component
const SpacingSystem = () => null;

const meta = {
  title: "Foundation/Spacing System",
  component: SpacingSystem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 스페이싱 체계입니다.

### 디자인 철학
- 📏 **일관된 리듬**: 예측 가능하고 조화로운 시각적 리듬 구축
- 🔄 **확장 가능**: 모든 화면 크기에서 적응 가능한 스케일
- 🎯 **의도적 공간**: 콘텐츠 그룹핑과 시각적 계층 구조 형성
- ♿ **접근성**: 터치 타겟과 가독성을 위한 적절한 간격
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpacingSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 스페이싱 데이터 정의
const spacingScale = {
  "0.5": {
    value: "2px",
    rem: "0.125rem",
    cssVar: "--spacing-0_5",
    tailwind: "space-0.5",
    use: "매우 작은 간격, 아이콘과 텍스트 사이",
  },
  "1": {
    value: "4px",
    rem: "0.25rem",
    cssVar: "--spacing-1",
    tailwind: "space-1",
    use: "작은 간격, 인라인 요소들 사이",
  },
  "1.5": {
    value: "6px",
    rem: "0.375rem",
    cssVar: "--spacing-1_5",
    tailwind: "space-1.5",
    use: "작은 간격, 라벨과 입력 필드 사이",
  },
  "2": {
    value: "8px",
    rem: "0.5rem",
    cssVar: "--spacing-2",
    tailwind: "space-2",
    use: "기본 간격, 버튼 내부 패딩",
  },
  "3": {
    value: "12px",
    rem: "0.75rem",
    cssVar: "--spacing-3",
    tailwind: "space-3",
    use: "중간 간격, 카드 내부 요소들 사이",
  },
  "4": {
    value: "16px",
    rem: "1rem",
    cssVar: "--spacing-4",
    tailwind: "space-4",
    use: "표준 간격, 섹션 내부 요소들 사이",
  },
  "5": {
    value: "20px",
    rem: "1.25rem",
    cssVar: "--spacing-5",
    tailwind: "space-5",
    use: "큰 간격, 관련 그룹들 사이",
  },
  "6": {
    value: "24px",
    rem: "1.5rem",
    cssVar: "--spacing-6",
    tailwind: "space-6",
    use: "큰 간격, 카드와 카드 사이",
  },
  "8": {
    value: "32px",
    rem: "2rem",
    cssVar: "--spacing-8",
    tailwind: "space-8",
    use: "매우 큰 간격, 주요 섹션들 사이",
  },
  "10": {
    value: "40px",
    rem: "2.5rem",
    cssVar: "--spacing-10",
    tailwind: "space-10",
    use: "큰 섹션 간격, 헤더와 컨텐츠 사이",
  },
  "12": {
    value: "48px",
    rem: "3rem",
    cssVar: "--spacing-12",
    tailwind: "space-12",
    use: "매우 큰 섹션 간격, 페이지 레벨 구분",
  },
  "16": {
    value: "64px",
    rem: "4rem",
    cssVar: "--spacing-16",
    tailwind: "space-16",
    use: "페이지 간격, 메인 레이아웃 구분",
  },
};

// 스페이싱 시각화 컴포넌트
const SpacingVisualizer = ({
  size,
  data,
  showPx = true,
}: {
  size: string;
  data: (typeof spacingScale)[keyof typeof spacingScale];
  showPx?: boolean;
}) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-[120px]">
          <span className="font-mono text-sm font-medium w-8 text-gray-700">
            {size}
          </span>
          <div
            className="bg-blockie-yellow border-2 border-blockie-yellow"
            style={{
              width: data.value,
              height: "20px",
              minWidth: data.value,
            }}
          />
          <span className="text-sm text-gray-600 min-w-[60px] font-mono">
            {showPx ? data.value : data.rem}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-800 mb-3">{data.use}</p>

        <div className="space-y-1">
          <button
            onClick={() => copyToClipboard(data.value, "px")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "px" ? "✓ 복사됨!" : `픽셀: ${data.value}`}
          </button>
          <button
            onClick={() => copyToClipboard(`var(${data.cssVar})`, "css")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "css" ? "✓ 복사됨!" : `CSS: var(${data.cssVar})`}
          </button>
          <button
            onClick={() => copyToClipboard(data.tailwind, "tailwind")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "tailwind" ? "✓ 복사됨!" : `Tailwind: ${data.tailwind}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// 마진/패딩 인터랙티브 데모 컴포넌트
const MarginPaddingDemo = () => {
  const [selectedSpacing, setSelectedSpacing] = useState("4");
  const [property, setProperty] = useState("padding");

  const spacing = spacingScale[selectedSpacing as keyof typeof spacingScale];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">인터랙티브 스페이싱 데모</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스페이싱 크기
          </label>
          <select
            value={selectedSpacing}
            onChange={(e) => setSelectedSpacing(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
          >
            {Object.entries(spacingScale).map(([size, data]) => (
              <option key={size} value={size}>
                {size} ({data.value})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            속성 타입
          </label>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
          >
            <option value="padding">Padding</option>
            <option value="margin">Margin</option>
            <option value="gap">Gap</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-4">
        <div className="text-sm text-gray-600 mb-4 font-mono">
          Preview: {property}-{selectedSpacing} ({spacing.value})
        </div>

        {property === "padding" && (
          <div
            className="bg-blockie-blue text-white rounded-lg inline-block"
            style={{ padding: spacing.value }}
          >
            <div className="bg-white text-gray-800 rounded p-2">
              {spacing.value} 패딩이 적용된 콘텐츠
            </div>
          </div>
        )}

        {property === "margin" && (
          <div className="bg-gray-200 p-4 rounded-lg">
            <div
              className="bg-blockie-green text-white p-4 rounded-lg"
              style={{ margin: spacing.value }}
            >
              {spacing.value} 마진이 적용된 요소
            </div>
          </div>
        )}

        {property === "gap" && (
          <div className="flex flex-wrap" style={{ gap: spacing.value }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-blockie-purple text-white p-3 rounded-lg"
              >
                아이템 {i}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">CSS 코드:</h4>
        <div className="space-y-1">
          <code className="text-sm text-blue-700 block">
            .element &#123; {property}: {spacing.rem}; /* {spacing.value} */
            &#125;
          </code>
          <code className="text-sm text-blue-700 block">
            .element &#123; {property}: var({spacing.cssVar}); &#125;
          </code>
          <code className="text-sm text-blue-700 block">
            &lt;div className="{property}-{selectedSpacing}"&gt;...&lt;/div&gt;
          </code>
        </div>
      </div>
    </div>
  );
};

// 컴포넌트별 스페이싱 가이드라인 컴포넌트
const ComponentSpacingExample = ({
  title,
  internal,
  external,
  children,
}: {
  title: string;
  internal: string;
  external: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-semibold text-lg mb-4">{title}</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-700">
              내부 스페이싱:
            </span>
            <p className="text-sm text-gray-600 mt-1 font-mono">{internal}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">
              외부 스페이싱:
            </span>
            <p className="text-sm text-gray-600 mt-1 font-mono">{external}</p>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-700 block mb-3">
            예시:
          </span>
          <div className="p-4 bg-gray-50 rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
};

// 그리드/레이아웃 인터랙티브 데모
const GridLayoutDemo = () => {
  const [gridGap, setGridGap] = useState("4");
  const [gridCols, setGridCols] = useState("3");

  const spacing = spacingScale[gridGap as keyof typeof spacingScale];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-semibold mb-4">인터랙티브 그리드 데모</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            그리드 간격
          </label>
          <select
            value={gridGap}
            onChange={(e) => setGridGap(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
          >
            {Object.entries(spacingScale).map(([size, data]) => (
              <option key={size} value={size}>
                gap-{size} ({data.value})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            그리드 컬럼
          </label>
          <select
            value={gridCols}
            onChange={(e) => setGridCols(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
          >
            <option value="2">2 columns</option>
            <option value="3">3 columns</option>
            <option value="4">4 columns</option>
          </select>
        </div>
      </div>

      <div
        className={`grid grid-cols-${gridCols} mb-4`}
        style={{ gap: spacing.value }}
      >
        {Array.from({ length: parseInt(gridCols) * 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-blockie-blue text-white p-4 rounded-lg text-center font-medium"
          >
            아이템 {i + 1}
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <code className="text-sm text-blue-700">
          &lt;div className="grid grid-cols-{gridCols} gap-{gridGap}
          "&gt;...&lt;/div&gt;
        </code>
      </div>
    </div>
  );
};

// 1. Spacing Scale Overview 스토리
export const SpacingScaleOverview: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">스페이싱 스케일</h2>
          <p className="text-gray-600 mb-6">
            Blockie 앱에서 사용되는 체계적인 스페이싱 스케일입니다. 일관된
            리듬과 시각적 계층구조를 만들어냅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(spacingScale).map(([size, data]) => (
            <SpacingVisualizer key={size} size={size} data={data} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">스페이싱 스케일 원리</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-green-700">
                Small Spaces (0.5 - 3)
              </h4>
              <p className="text-sm text-gray-600">
                컴포넌트 내부의 세밀한 간격 조정에 사용됩니다. 아이콘, 라벨,
                버튼 내부 등의 간격입니다.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-blue-700">
                Medium Spaces (4 - 8)
              </h4>
              <p className="text-sm text-gray-600">
                관련 요소들 간의 그룹핑과 컴포넌트 간 기본 간격에 사용됩니다.
                카드, 폼 필드 등의 간격입니다.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-700">
                Large Spaces (10 - 16)
              </h4>
              <p className="text-sm text-gray-600">
                주요 섹션 구분과 페이지 레벨의 레이아웃에 사용됩니다. 헤더,
                푸터, 메인 컨텐츠 간격입니다.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-orange-700">
                Consistent Ratios
              </h4>
              <p className="text-sm text-gray-600">
                각 스케일은 일정한 비율을 유지하여 조화로운 시각적 리듬을
                만들어냅니다.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 사용 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 관련된 요소들은 더 작은 간격(2-4)으로 그룹핑하세요</li>
            <li>• 서로 다른 섹션은 더 큰 간격(8-12)으로 구분하세요</li>
            <li>• 일관된 스케일을 사용하여 시각적 리듬을 만드세요</li>
            <li>
              • 모바일에서는 더 작은 간격을 사용하여 공간을 효율적으로
              활용하세요
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Blockie 디자인 시스템의 전체 스페이싱 스케일을 보여줍니다.",
      },
    },
  },
};

// 2. Margin & Padding Examples 스토리
export const MarginPaddingExamples: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">마진 & 패딩 예시</h2>
          <p className="text-gray-600 mb-6">
            마진과 패딩의 실제 적용 예시와 인터랙티브 데모를 제공합니다.
          </p>
        </div>

        <MarginPaddingDemo />

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">베스트 프랙티스</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✓ 권장사항</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>스페이싱 스케일을 준수하여 일관성 유지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>관련 요소들을 더 가깝게 배치</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>여백을 통해 콘텐츠 그룹핑</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>반응형 스페이싱 적용</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">✗ 피해야 할 것</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>임의의 픽셀 값 사용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>모든 요소에 동일한 간격 적용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>과도한 여백으로 관계 단절</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>모바일에서 과도한 패딩 사용</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "마진과 패딩의 효과적인 사용법과 인터랙티브 데모를 제공합니다.",
      },
    },
  },
};

// 3. Component Spacing Guidelines 스토리
export const ComponentSpacingGuidelines: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            컴포넌트 스페이싱 가이드라인
          </h2>
          <p className="text-gray-600 mb-6">
            각 컴포넌트에 적합한 스페이싱 가이드라인과 실제 적용 예시입니다.
          </p>
        </div>

        <div className="space-y-6">
          <ComponentSpacingExample
            title="Button"
            internal="px-4 py-2 (16px × 8px)"
            external="gap-2 between buttons (8px)"
          >
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blockie-yellow text-neutral-black rounded-lg font-medium">
                Primary
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium">
                Secondary
              </button>
            </div>
          </ComponentSpacingExample>

          <ComponentSpacingExample
            title="Card"
            internal="p-6 (24px all sides)"
            external="space-y-4 between cards (16px)"
          >
            <div className="space-y-4">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">카드 제목</h4>
                <p className="text-gray-600 text-sm">
                  적절한 내부 스페이싱이 적용된 카드 콘텐츠입니다.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">다른 카드</h4>
                <p className="text-gray-600 text-sm">
                  카드 간 일관된 간격이 유지됩니다.
                </p>
              </div>
            </div>
          </ComponentSpacingExample>

          <ComponentSpacingExample
            title="Form Field"
            internal="px-3 py-2 (12px × 8px)"
            external="space-y-4 between fields (16px)"
          >
            <div className="space-y-4 max-w-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blockie-yellow"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </ComponentSpacingExample>

          <ComponentSpacingExample
            title="Navigation"
            internal="px-3 py-2 for nav items"
            external="gap-1 between nav items (4px)"
          >
            <nav className="flex gap-1 bg-gray-100 p-2 rounded-lg">
              <a className="px-3 py-2 bg-blockie-yellow text-neutral-black rounded font-medium">
                홈
              </a>
              <a className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded">
                소개
              </a>
              <a className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded">
                연락처
              </a>
            </nav>
          </ComponentSpacingExample>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "각 UI 컴포넌트에 최적화된 스페이싱 가이드라인을 제공합니다.",
      },
    },
  },
};

// 4. Grid & Layout Spacing 스토리
export const GridLayoutSpacing: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            그리드 & 레이아웃 스페이싱
          </h2>
          <p className="text-gray-600 mb-6">
            그리드 시스템과 레이아웃에서의 스페이싱 활용법을 알아보세요.
          </p>
        </div>

        <GridLayoutDemo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">Flexbox 스페이싱</h4>
            <div className="space-y-4">
              <div className="flex gap-2 p-3 bg-gray-50 rounded">
                <div className="bg-blockie-green text-white p-2 rounded text-sm">
                  A
                </div>
                <div className="bg-blockie-green text-white p-2 rounded text-sm">
                  B
                </div>
                <div className="bg-blockie-green text-white p-2 rounded text-sm">
                  C
                </div>
              </div>
              <code className="text-xs text-gray-600">flex gap-2 (8px)</code>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex gap-4 p-3 bg-gray-50 rounded">
                <div className="bg-blockie-purple text-white p-2 rounded text-sm">
                  A
                </div>
                <div className="bg-blockie-purple text-white p-2 rounded text-sm">
                  B
                </div>
                <div className="bg-blockie-purple text-white p-2 rounded text-sm">
                  C
                </div>
              </div>
              <code className="text-xs text-gray-600">flex gap-4 (16px)</code>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex gap-6 p-3 bg-gray-50 rounded">
                <div className="bg-blockie-blue text-white p-2 rounded text-sm">
                  A
                </div>
                <div className="bg-blockie-blue text-white p-2 rounded text-sm">
                  B
                </div>
                <div className="bg-blockie-blue text-white p-2 rounded text-sm">
                  C
                </div>
              </div>
              <code className="text-xs text-gray-600">flex gap-6 (24px)</code>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">스택 스페이싱</h4>
            <div className="space-y-2">
              <div className="bg-blockie-yellow p-3 rounded text-sm">
                스택 아이템 1
              </div>
              <div className="bg-blockie-yellow p-3 rounded text-sm">
                스택 아이템 2
              </div>
              <div className="bg-blockie-yellow p-3 rounded text-sm">
                스택 아이템 3
              </div>
            </div>
            <code className="text-xs text-gray-600 mt-4 block">
              space-y-2 (8px vertical)
            </code>

            <div className="space-y-6 mt-6">
              <div className="bg-blockie-pink text-white p-3 rounded text-sm">
                스택 아이템 1
              </div>
              <div className="bg-blockie-pink text-white p-3 rounded text-sm">
                스택 아이템 2
              </div>
              <div className="bg-blockie-pink text-white p-3 rounded text-sm">
                스택 아이템 3
              </div>
            </div>
            <code className="text-xs text-gray-600 mt-4 block">
              space-y-6 (24px vertical)
            </code>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">레이아웃 스페이싱 패턴</h3>

          <div className="space-y-6">
            {/* 컨테이너 패턴 */}
            <div>
              <h4 className="font-medium mb-3">컨테이너 패턴</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="bg-white p-6 rounded border">
                  <h5 className="font-medium mb-4">페이지 컨테이너 (p-6)</h5>
                  <div className="space-y-4">
                    <div className="bg-blockie-blue bg-opacity-10 p-4 rounded">
                      <p className="text-sm">섹션 1 (space-y-4)</p>
                    </div>
                    <div className="bg-blockie-green bg-opacity-10 p-4 rounded">
                      <p className="text-sm">섹션 2</p>
                    </div>
                    <div className="bg-blockie-purple bg-opacity-10 p-4 rounded">
                      <p className="text-sm">섹션 3</p>
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-gray-600 mt-2 block">
                &lt;div className="p-6"&gt; &lt;div
                className="space-y-4"&gt;...&lt;/div&gt; &lt;/div&gt;
              </code>
            </div>

            {/* 카드 그리드 패턴 */}
            <div>
              <h4 className="font-medium mb-3">카드 그리드 패턴</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="w-full h-16 bg-blockie-yellow bg-opacity-20 rounded mb-3"></div>
                  <h5 className="font-medium text-sm mb-2">카드 제목</h5>
                  <p className="text-xs text-gray-600">카드 내용</p>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="w-full h-16 bg-blockie-green bg-opacity-20 rounded mb-3"></div>
                  <h5 className="font-medium text-sm mb-2">카드 제목</h5>
                  <p className="text-xs text-gray-600">카드 내용</p>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="w-full h-16 bg-blockie-blue bg-opacity-20 rounded mb-3"></div>
                  <h5 className="font-medium text-sm mb-2">카드 제목</h5>
                  <p className="text-xs text-gray-600">카드 내용</p>
                </div>
              </div>
              <code className="text-xs text-gray-600 mt-2 block">
                &lt;div className="grid grid-cols-1 sm:grid-cols-2
                lg:grid-cols-3 gap-4"&gt;...&lt;/div&gt;
              </code>
            </div>

            {/* 사이드바 레이아웃 패턴 */}
            <div>
              <h4 className="font-medium mb-3">사이드바 레이아웃 패턴</h4>
              <div className="flex gap-6 bg-gray-100 p-4 rounded-lg">
                <div className="w-48 bg-white p-4 rounded border">
                  <h5 className="font-medium text-sm mb-3">사이드바</h5>
                  <div className="space-y-2">
                    <div className="bg-blockie-yellow bg-opacity-20 p-2 rounded text-xs">
                      메뉴 1
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-xs">
                      메뉴 2
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-xs">
                      메뉴 3
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-4 rounded border">
                  <h5 className="font-medium text-sm mb-3">메인 콘텐츠</h5>
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-gray-600 mt-2 block">
                &lt;div className="flex gap-6"&gt; &lt;aside
                className="w-48"&gt;...&lt;/aside&gt; &lt;main
                className="flex-1"&gt;...&lt;/main&gt; &lt;/div&gt;
              </code>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">
            💡 그리드 & 레이아웃 팁
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>
              • 관련된 콘텐츠는 작은 gap(2-4)으로 묶고, 다른 섹션과는 큰
              gap(6-8)으로 구분하세요
            </li>
            <li>• 카드 그리드에서는 gap-4 또는 gap-6을 표준으로 사용하세요</li>
            <li>
              • 사이드바와 메인 콘텐츠 사이는 gap-6 또는 gap-8을 사용하세요
            </li>
            <li>
              • 반응형에서 모바일은 gap을 줄이고, 데스크톱에서는 늘려서 공간을
              효율적으로 활용하세요
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
          "그리드 시스템과 레이아웃에서의 효과적인 스페이싱 패턴을 제공합니다.",
      },
    },
  },
};
// 5. Responsive Spacing 스토리
export const ResponsiveSpacing: Story = {
  render: () => {
    const responsiveExamples = [
      {
        title: "Container Padding",
        mobile: "px-4 (16px)",
        tablet: "md:px-6 (24px)",
        desktop: "lg:px-8 (32px)",
        description: "컨테이너의 좌우 패딩이 화면 크기에 따라 증가",
      },
      {
        title: "Section Spacing",
        mobile: "space-y-8 (32px)",
        tablet: "md:space-y-12 (48px)",
        desktop: "lg:space-y-16 (64px)",
        description: "섹션 간 간격이 화면 크기에 따라 증가",
      },
      {
        title: "Grid Gap",
        mobile: "gap-4 (16px)",
        tablet: "md:gap-6 (24px)",
        desktop: "lg:gap-8 (32px)",
        description: "그리드 간격이 화면 크기에 따라 증가",
      },
      {
        title: "Card Padding",
        mobile: "p-4 (16px)",
        tablet: "md:p-6 (24px)",
        desktop: "lg:p-8 (32px)",
        description: "카드 내부 패딩이 화면 크기에 따라 증가",
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">반응형 스페이싱</h2>
          <p className="text-gray-600 mb-6">
            화면 크기에 따라 적응하는 스페이싱 시스템으로 모든 디바이스에서
            최적의 사용자 경험을 제공합니다.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            💡 반응형 디자인 원칙
          </h4>
          <p className="text-blue-700 text-sm">
            모바일에서는 콘텐츠를 위한 공간을 최대화하고, 데스크톱에서는 시각적
            여백을 늘려 가독성을 향상시킵니다.
          </p>
        </div>

        <div className="grid gap-4">
          {responsiveExamples.map((example, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h4 className="font-semibold mb-3">{example.title}</h4>
              <p className="text-gray-600 text-sm mb-4">
                {example.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-200 p-3 rounded">
                  <div className="text-xs font-medium text-red-700 mb-1">
                    📱 Mobile (0px+)
                  </div>
                  <code className="text-xs text-red-600">{example.mobile}</code>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <div className="text-xs font-medium text-yellow-700 mb-1">
                    📟 Tablet (768px+)
                  </div>
                  <code className="text-xs text-yellow-600">
                    {example.tablet}
                  </code>
                </div>
                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <div className="text-xs font-medium text-green-700 mb-1">
                    💻 Desktop (1024px+)
                  </div>
                  <code className="text-xs text-green-600">
                    {example.desktop}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold mb-4">실시간 반응형 예시</h4>
          <p className="text-gray-600 text-sm mb-4">
            아래 컨테이너들은 화면 크기에 따라 패딩과 간격이 변합니다. 브라우저
            창 크기를 조절해보세요.
          </p>

          {/* 반응형 컨테이너 예시 */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="bg-gradient-to-r from-blockie-blue to-blockie-purple text-white px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 rounded-lg">
              <h5 className="font-semibold mb-2">반응형 컨테이너</h5>
              <p className="text-sm opacity-90">
                이 컨테이너의 패딩은 px-4 md:px-6 lg:px-8, py-4 md:py-6
                lg:py-8로 설정되어 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <div className="bg-blockie-yellow p-4 md:p-6 lg:p-8 rounded-lg">
                <h6 className="font-medium text-neutral-black">카드 1</h6>
                <p className="text-sm text-neutral-dark-gray mt-2">
                  반응형 패딩 적용
                </p>
              </div>
              <div className="bg-blockie-green p-4 md:p-6 lg:p-8 rounded-lg">
                <h6 className="font-medium text-white">카드 2</h6>
                <p className="text-sm text-white opacity-90 mt-2">
                  반응형 패딩 적용
                </p>
              </div>
              <div className="bg-blockie-pink p-4 md:p-6 lg:p-8 rounded-lg">
                <h6 className="font-medium text-white">카드 3</h6>
                <p className="text-sm text-white opacity-90 mt-2">
                  반응형 패딩 적용
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h5 className="font-medium mb-2">CSS 코드:</h5>
            <div className="space-y-1 text-sm font-mono">
              <code className="text-gray-700 block">/* 컨테이너 */</code>
              <code className="text-gray-700 block">
                &lt;div className="px-4 md:px-6 lg:px-8 py-4 md:py-6
                lg:py-8"&gt;
              </code>
              <code className="text-gray-700 block">/* 그리드 */</code>
              <code className="text-gray-700 block">
                &lt;div className="grid grid-cols-1 md:grid-cols-2
                lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"&gt;
              </code>
              <code className="text-gray-700 block">/* 카드 */</code>
              <code className="text-gray-700 block">
                &lt;div className="p-4 md:p-6 lg:p-8"&gt;
              </code>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">모바일 우선 접근법</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>기본값은 모바일 크기로 설정</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>md: (768px+)에서 태블릿 크기로 확장</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>lg: (1024px+)에서 데스크톱 크기로 확장</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>점진적 향상(Progressive Enhancement) 원칙</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">브레이크포인트별 스페이싱</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium">Mobile (0-767px)</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  Small Spacing
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium">Tablet (768-1023px)</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Medium Spacing
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium">Desktop (1024px+)</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Large Spacing
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold mb-4">일반적인 반응형 패턴</h4>

          <div className="space-y-6">
            <div>
              <h5 className="font-medium mb-3">컨테이너 스페이싱 패턴</h5>
              <div className="bg-gray-50 p-4 rounded">
                <code className="text-sm text-gray-700">
                  px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                페이지 컨테이너에 자주 사용되는 패턴
              </p>
            </div>

            <div>
              <h5 className="font-medium mb-3">그리드 간격 패턴</h5>
              <div className="bg-gray-50 p-4 rounded">
                <code className="text-sm text-gray-700">
                  gap-4 md:gap-6 lg:gap-8
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                카드 그리드에 자주 사용되는 패턴
              </p>
            </div>

            <div>
              <h5 className="font-medium mb-3">섹션 구분 패턴</h5>
              <div className="bg-gray-50 p-4 rounded">
                <code className="text-sm text-gray-700">
                  space-y-8 md:space-y-12 lg:space-y-16
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                페이지 섹션 구분에 자주 사용되는 패턴
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">
            ⚠️ 반응형 스페이싱 주의사항
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>
              • 너무 많은 브레이크포인트를 사용하지 마세요 (모바일, 태블릿,
              데스크톱 정도면 충분)
            </li>
            <li>• 각 브레이크포인트에서 일관된 스페이싱 비율을 유지하세요</li>
            <li>
              • 모바일에서 터치 타겟(44px 이상)을 고려한 최소 간격을 확보하세요
            </li>
            <li>
              • 테스트를 통해 실제 디바이스에서 스페이싱이 적절한지 확인하세요
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
          "다양한 화면 크기에서 최적의 사용자 경험을 제공하는 반응형 스페이싱 시스템을 보여줍니다.",
      },
    },
  },
};

// 6. Mobile/Desktop Spacing Differences 스토리
export const MobileDesktopSpacingDifferences: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<
      "mobile" | "desktop" | "comparison"
    >("comparison");

    const spacingDifferences = [
      {
        category: "Container Spacing",
        mobile: { value: "16px", class: "p-4", usage: "px-4 py-6" },
        desktop: { value: "32px", class: "lg:p-8", usage: "lg:px-8 lg:py-12" },
        reason:
          "모바일에서는 화면 공간 최대 활용, 데스크톱에서는 여유로운 여백 제공",
        visual: (
          <div
            className={`border rounded-lg transition-all ${
              viewMode === "mobile"
                ? "p-4"
                : viewMode === "desktop"
                  ? "p-8"
                  : "p-4 lg:p-8"
            } bg-blockie-yellow bg-opacity-20`}
          >
            <div className="bg-white p-3 rounded border">
              <p className="text-sm">컨테이너 내용</p>
            </div>
          </div>
        ),
      },
      {
        category: "Grid Gap",
        mobile: { value: "16px", class: "gap-4", usage: "gap-4" },
        desktop: { value: "24px", class: "lg:gap-6", usage: "lg:gap-6" },
        reason: "작은 화면에서는 촘촘하게, 큰 화면에서는 여유롭게 배치",
        visual: (
          <div
            className={`grid grid-cols-2 transition-all ${
              viewMode === "mobile"
                ? "gap-4"
                : viewMode === "desktop"
                  ? "gap-6"
                  : "gap-4 lg:gap-6"
            }`}
          >
            <div className="bg-blockie-blue p-3 rounded text-white text-sm text-center">
              Item 1
            </div>
            <div className="bg-blockie-green p-3 rounded text-white text-sm text-center">
              Item 2
            </div>
          </div>
        ),
      },
      {
        category: "Section Spacing",
        mobile: { value: "32px", class: "space-y-8", usage: "space-y-8" },
        desktop: {
          value: "64px",
          class: "lg:space-y-16",
          usage: "lg:space-y-16",
        },
        reason: "섹션 구분을 명확히 하되, 모바일에서는 스크롤 길이 고려",
        visual: (
          <div
            className={`transition-all ${
              viewMode === "mobile"
                ? "space-y-8"
                : viewMode === "desktop"
                  ? "space-y-16"
                  : "space-y-8 lg:space-y-16"
            }`}
          >
            <div className="bg-blockie-purple bg-opacity-20 p-4 rounded">
              <h6 className="font-medium">섹션 1</h6>
            </div>
            <div className="bg-blockie-pink bg-opacity-20 p-4 rounded">
              <h6 className="font-medium">섹션 2</h6>
            </div>
          </div>
        ),
      },
      {
        category: "Button Touch Target",
        mobile: { value: "12px 16px", class: "px-4 py-3", usage: "px-4 py-3" },
        desktop: {
          value: "8px 16px",
          class: "lg:py-2",
          usage: "px-4 py-2 lg:py-2",
        },
        reason:
          "모바일 터치 타겟(44px)을 위해 더 큰 패딩, 데스크톱은 정밀한 클릭",
        visual: (
          <div className="flex gap-3">
            <button
              className={`bg-blockie-yellow text-neutral-black rounded-lg font-medium transition-all ${
                viewMode === "mobile"
                  ? "px-4 py-3"
                  : viewMode === "desktop"
                    ? "px-4 py-2"
                    : "px-4 py-3 lg:py-2"
              }`}
            >
              Primary Button
            </button>
            <button
              className={`border border-gray-300 text-gray-700 rounded-lg font-medium transition-all ${
                viewMode === "mobile"
                  ? "px-4 py-3"
                  : viewMode === "desktop"
                    ? "px-4 py-2"
                    : "px-4 py-3 lg:py-2"
              }`}
            >
              Secondary
            </button>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">모바일/데스크톱 간격 차이</h2>
          <p className="text-gray-600 mb-6">
            디바이스별 특성을 고려한 최적화된 스페이싱 전략을 비교해보세요.
          </p>
        </div>

        {/* 뷰 모드 선택 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setViewMode("mobile")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "mobile"
                  ? "bg-red-100 text-red-700 border-2 border-red-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📱 Mobile View
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "desktop"
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💻 Desktop View
            </button>
            <button
              onClick={() => setViewMode("comparison")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "comparison"
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🔄 Responsive View
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {viewMode === "mobile" &&
              "모바일 환경에 최적화된 스페이싱을 확인하세요."}
            {viewMode === "desktop" &&
              "데스크톱 환경에 최적화된 스페이싱을 확인하세요."}
            {viewMode === "comparison" &&
              "반응형 스페이싱이 어떻게 적응하는지 확인하세요."}
          </p>
        </div>

        {/* 스페이싱 차이 비교 */}
        <div className="space-y-6">
          {spacingDifferences.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h4 className="font-semibold">{item.category}</h4>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 스펙 비교 */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        className={`p-3 rounded border-2 transition-all ${
                          viewMode === "mobile"
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="text-xs font-medium text-red-700 mb-1">
                          📱 Mobile
                        </div>
                        <code className="text-sm text-red-600 block">
                          {item.mobile.usage}
                        </code>
                        <div className="text-xs text-red-600 mt-1">
                          {item.mobile.value}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded border-2 transition-all ${
                          viewMode === "desktop"
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="text-xs font-medium text-green-700 mb-1">
                          💻 Desktop
                        </div>
                        <code className="text-sm text-green-600 block">
                          {item.desktop.usage}
                        </code>
                        <div className="text-xs text-green-600 mt-1">
                          {item.desktop.value}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h6 className="font-medium text-blue-800 mb-1">
                        설계 이유
                      </h6>
                      <p className="text-sm text-blue-700">{item.reason}</p>
                    </div>
                  </div>

                  {/* 시각적 예시 */}
                  <div>
                    <h6 className="font-medium mb-3">시각적 비교</h6>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      {item.visual}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 디바이스별 특성 비교 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4 flex items-center">
              <span className="mr-2">📱</span>
              모바일 스페이싱 특성
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <div>
                  <strong>터치 타겟:</strong> 최소 44px 이상의 터치 영역 확보
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <div>
                  <strong>화면 활용:</strong> 제한된 공간을 최대한 효율적으로
                  사용
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <div>
                  <strong>스크롤 고려:</strong> 세로 스크롤을 고려한 적당한 간격
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <div>
                  <strong>엄지 조작:</strong> 한 손 조작을 고려한 UI 배치
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4 flex items-center">
              <span className="mr-2">💻</span>
              데스크톱 스페이싱 특성
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong>마우스 정밀도:</strong> 정확한 클릭을 위한 작은 타겟
                  허용
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong>여백 활용:</strong> 충분한 공간을 활용한 여유로운
                  레이아웃
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong>시각적 계층:</strong> 큰 간격으로 명확한 정보 구조
                  형성
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong>가독성 향상:</strong> 적절한 여백으로 콘텐츠 가독성
                  증대
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 실제 적용 예시 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold mb-4">실제 레이아웃 비교</h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 모바일 레이아웃 */}
            <div>
              <h5 className="font-medium mb-3 text-red-700">
                📱 Mobile Layout
              </h5>
              <div className="max-w-sm mx-auto border-2 border-red-200 rounded-lg overflow-hidden">
                <div className="bg-red-50 p-4 space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <h6 className="font-medium mb-2">Header</h6>
                    <p className="text-sm text-gray-600">Compact spacing</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blockie-yellow p-4 rounded">
                      <p className="text-sm font-medium">Card 1 (p-4)</p>
                    </div>
                    <div className="bg-blockie-green p-4 rounded">
                      <p className="text-sm font-medium">Card 2 (space-y-4)</p>
                    </div>
                  </div>
                  <button className="w-full bg-blockie-blue text-white px-4 py-3 rounded font-medium">
                    Mobile Button (py-3)
                  </button>
                </div>
              </div>
            </div>

            {/* 데스크톱 레이아웃 */}
            <div>
              <h5 className="font-medium mb-3 text-green-700">
                💻 Desktop Layout
              </h5>
              <div className="border-2 border-green-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 p-8 space-y-8">
                  <div className="bg-white p-8 rounded border">
                    <h6 className="font-medium mb-4">Header</h6>
                    <p className="text-gray-600">Generous spacing</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-blockie-yellow p-6 rounded">
                      <p className="font-medium">Card 1 (p-6)</p>
                    </div>
                    <div className="bg-blockie-green p-6 rounded">
                      <p className="font-medium">Card 2 (gap-6)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-blockie-blue text-white px-6 py-2 rounded font-medium">
                      Desktop Button (py-2)
                    </button>
                    <button className="border border-gray-300 px-6 py-2 rounded font-medium">
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">🎯 핵심 원칙</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>
              • <strong>모바일:</strong> 공간 효율성과 터치 접근성의 균형
            </li>
            <li>
              • <strong>데스크톱:</strong> 시각적 편안함과 정보 구조의 명확성
            </li>
            <li>
              • <strong>반응형:</strong> 점진적 향상으로 자연스러운 전환
            </li>
            <li>
              • <strong>일관성:</strong> 각 환경에서 브랜드 아이덴티티 유지
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
          "모바일과 데스크톱 환경에서의 스페이싱 차이점과 각각의 최적화 전략을 비교합니다.",
      },
    },
  },
};
