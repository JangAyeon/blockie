import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Color System Foundation Component
const ColorSystem = () => null;

const meta = {
  title: "Foundation/Color System",
  component: ColorSystem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 색상 체계입니다.

### 디자인 철학
- 🎨 **브랜드 정체성**: 친근하고 창의적인 블록 기반 색상
- 🌈 **감정 표현**: 각 색상이 특정 감정과 상태를 나타냄
- ♿ **접근성**: WCAG 2.1 AA 기준 준수
- 🔄 **일관성**: 모든 컴포넌트에서 통일된 색상 사용
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 색상 스와치 컴포넌트
const ColorSwatch = ({
  color,
  name,
  hex,
  cssVar,
  tailwindClass,
  description,
}: {
  color: string;
  name: string;
  hex: string;
  cssVar: string;
  tailwindClass: string;
  description: string;
}) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div
        className="h-24 w-full cursor-pointer relative group"
        style={{ backgroundColor: color }}
        onClick={() => copyToClipboard(hex, "hex")}
      >
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
            클릭하여 복사
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="space-y-1">
          <button
            onClick={() => copyToClipboard(hex, "hex")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "hex" ? "✓ 복사됨!" : hex}
          </button>
          <button
            onClick={() => copyToClipboard(cssVar, "css")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "css" ? "✓ 복사됨!" : cssVar}
          </button>
          <button
            onClick={() => copyToClipboard(tailwindClass, "tailwind")}
            className="block w-full text-left text-xs font-mono bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {copied === "tailwind" ? "✓ 복사됨!" : tailwindClass}
          </button>
        </div>
      </div>
    </div>
  );
};

// 대비율 체커 컴포넌트
const ContrastChecker = ({
  backgroundColor,
  textColor,
  label,
}: {
  backgroundColor: string;
  textColor: string;
  label: string;
}) => {
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  };

  const contrast =
    (getLuminance(backgroundColor) + 0.05) / (getLuminance(textColor) + 0.05);
  const ratio = Math.max(contrast, 1 / contrast).toFixed(2);
  const isAAA = parseFloat(ratio) >= 7;
  const isAA = parseFloat(ratio) >= 4.5;

  return (
    <div
      className="p-4 rounded-lg flex items-center justify-between"
      style={{ backgroundColor, color: textColor }}
    >
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm">{ratio}:1</span>
        <div className="flex gap-1">
          <span
            className={`text-xs px-2 py-1 rounded ${isAA ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            AA {isAA ? "✓" : "✗"}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${isAAA ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            AAA {isAAA ? "✓" : "✗"}
          </span>
        </div>
      </div>
    </div>
  );
};

// 1. Color Palette Overview 스토리
export const ColorPalette: Story = {
  render: () => {
    const brandColors = [
      {
        color: "#F4DF7D",
        name: "Blockie Yellow",
        hex: "#F4DF7D",
        cssVar: "var(--color-blockie-yellow)",
        tailwindClass: "bg-blockie-yellow",
        description: "메인 브랜드, 액센트",
      },
      {
        color: "#8DDBA4",
        name: "Blockie Green",
        hex: "#8DDBA4",
        cssVar: "var(--color-blockie-green)",
        tailwindClass: "bg-blockie-green",
        description: "성공, 긍정적 액션",
      },
      {
        color: "#7DC0F4",
        name: "Blockie Blue",
        hex: "#7DC0F4",
        cssVar: "var(--color-blockie-blue)",
        tailwindClass: "bg-blockie-blue",
        description: "정보, 링크, 차분함",
      },
      {
        color: "#C89DF4",
        name: "Blockie Purple",
        hex: "#C89DF4",
        cssVar: "var(--color-blockie-purple)",
        tailwindClass: "bg-blockie-purple",
        description: "프리미엄, 특별함",
      },
      {
        color: "#F48DAE",
        name: "Blockie Pink",
        hex: "#F48DAE",
        cssVar: "var(--color-blockie-pink)",
        tailwindClass: "bg-blockie-pink",
        description: "창의성, 재미",
      },
      {
        color: "#F47D7D",
        name: "Blockie Red",
        hex: "#F47D7D",
        cssVar: "var(--color-blockie-red)",
        tailwindClass: "bg-blockie-red",
        description: "경고, 삭제",
      },
      {
        color: "#F49B9B",
        name: "Blockie Red Light",
        hex: "#F49B9B",
        cssVar: "var(--color-blockie-red-light)",
        tailwindClass: "bg-blockie-red-light",
        description: "부드러운 경고",
      },
    ];

    const neutralColors = [
      {
        color: "#1F2937",
        name: "Neutral Black",
        hex: "#1F2937",
        cssVar: "var(--color-neutral-black)",
        tailwindClass: "text-neutral-black",
        description: "메인 텍스트",
      },
      {
        color: "#4B5563",
        name: "Neutral Dark Gray",
        hex: "#4B5563",
        cssVar: "var(--color-neutral-dark-gray)",
        tailwindClass: "text-neutral-dark-gray",
        description: "서브 텍스트",
      },
      {
        color: "#9CA3AF",
        name: "Neutral Medium Gray",
        hex: "#9CA3AF",
        cssVar: "var(--color-neutral-medium-gray)",
        tailwindClass: "text-neutral-medium-gray",
        description: "플레이스홀더",
      },
      {
        color: "#E5E7EB",
        name: "Neutral Light Gray",
        hex: "#E5E7EB",
        cssVar: "var(--color-neutral-light-gray)",
        tailwindClass: "border-neutral-light-gray",
        description: "테두리, 구분선",
      },
      {
        color: "#F9FAFB",
        name: "Neutral Off White",
        hex: "#F9FAFB",
        cssVar: "var(--color-neutral-off-white)",
        tailwindClass: "bg-neutral-off-white",
        description: "배경",
      },
    ];

    const semanticColors = [
      {
        color: "#34D399",
        name: "Success",
        hex: "#34D399",
        cssVar: "var(--color-success)",
        tailwindClass: "text-success",
        description: "성공 상태",
      },
      {
        color: "#FBBF24",
        name: "Warning",
        hex: "#FBBF24",
        cssVar: "var(--color-warning)",
        tailwindClass: "text-warning",
        description: "주의 상태",
      },
      {
        color: "#EF4444",
        name: "Error",
        hex: "#EF4444",
        cssVar: "var(--color-error)",
        tailwindClass: "text-error",
        description: "오류 상태",
      },
      {
        color: "#60A5FA",
        name: "Info",
        hex: "#60A5FA",
        cssVar: "var(--color-info)",
        tailwindClass: "text-info",
        description: "정보 상태",
      },
    ];

    return (
      <div className="space-y-12">
        {/* Brand Colors */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">브랜드 컬러</h2>
            <p className="text-gray-600 mb-6">
              블록키의 핵심 아이덴티티를 나타내는 색상들입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </div>

        {/* Neutral Colors */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">중립 컬러</h2>
            <p className="text-gray-600 mb-6">
              텍스트, 배경, 테두리 등 UI의 기본 구조를 이루는 색상들입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {neutralColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">텍스트 계층 구조</h3>
            <div className="space-y-2 bg-white p-6 rounded-lg border">
              <h1 className="text-neutral-black text-2xl font-bold">
                Primary Heading (Neutral Black)
              </h1>
              <h2 className="text-neutral-black text-lg font-semibold">
                Secondary Heading (Neutral Black)
              </h2>
              <p className="text-neutral-dark-gray">
                Body text uses dark gray for good readability
              </p>
              <p className="text-neutral-medium-gray text-sm">
                Caption or helper text
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">의미론적 컬러</h2>
            <p className="text-gray-600 mb-6">
              사용자에게 특정 상태나 피드백을 전달하는 색상들입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semanticColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "블록키 디자인 시스템의 전체 색상 팔레트를 보여줍니다.",
      },
    },
  },
};

// 2. Usage Guidelines 스토리
export const UsageGuidelines: Story = {
  render: () => {
    return (
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">색상 사용 가이드라인</h2>
          <p className="text-gray-600 mb-6">
            디자인 시스템의 색상을 효과적으로 활용하기 위한 가이드라인입니다.
          </p>
        </div>

        {/* 색상 사용 시점 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">각 색상의 사용 시점</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <div className="w-4 h-4 bg-blockie-yellow mr-2 rounded"></div>
                Primary Actions
              </h4>
              <p className="text-gray-600 mb-2">
                주요 액션 버튼, 강조 요소, 메인 CTA에 사용합니다.
              </p>
              <div className="mt-4">
                <button className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium">
                  Primary Button
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <div className="w-4 h-4 bg-blockie-green mr-2 rounded"></div>
                Success States
              </h4>
              <p className="text-gray-600 mb-2">
                성공 메시지, 완료된 작업, 긍정적 상태에 사용합니다.
              </p>
              <div className="mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blockie-green rounded-full"></div>
                  <span className="text-green-800">완료됨</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 색상 조합 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">색상 조합 예시</h3>

          {/* 텍스트 + 배경 */}
          <div>
            <h4 className="font-medium mb-3">텍스트 + 배경 조합</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-neutral-black">Dark text on white</p>
              </div>
              <div className="bg-blockie-blue bg-opacity-10 p-4 rounded-lg">
                <p className="text-neutral-black">Dark text on light blue</p>
              </div>
              <div className="bg-neutral-black p-4 rounded-lg">
                <p className="text-white">White text on dark</p>
              </div>
            </div>
          </div>

          {/* 버튼 조합 */}
          <div>
            <h4 className="font-medium mb-3">버튼 스타일 조합</h4>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium">
                Primary
              </button>
              <button className="bg-blockie-green text-neutral-black px-4 py-2 rounded-lg font-medium">
                Success
              </button>
              <button className="bg-blockie-red text-white px-4 py-2 rounded-lg font-medium">
                Danger
              </button>
              <button className="border-2 border-neutral-light-gray text-neutral-dark-gray px-4 py-2 rounded-lg font-medium">
                Secondary
              </button>
            </div>
          </div>
        </div>

        {/* 색상 사용 팁 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 사용 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • 메인 액션에는 <code>blockie-yellow</code>를 사용하세요
            </li>
            <li>
              • 성공/완료 상태는 <code>blockie-green</code>을 활용하세요
            </li>
            <li>
              • 정보성 콘텐츠에는 <code>blockie-blue</code>가 적합합니다
            </li>
            <li>
              • 위험한 액션(삭제 등)에는 <code>blockie-red</code>를 사용하세요
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
          "색상 시스템을 효과적으로 활용하기 위한 가이드라인과 예시를 제공합니다.",
      },
    },
  },
};

// 3. Accessibility 스토리
export const Accessibility: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">접근성 & 대비율 테스트</h2>
          <p className="text-gray-600 mb-6">
            WCAG 2.1 가이드라인에 따른 색상 대비율 테스트입니다. AA는 4.5:1,
            AAA는 7:1 이상이어야 합니다.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">브랜드 색상 + 텍스트</h3>
          <div className="space-y-2">
            <ContrastChecker
              backgroundColor="#F4DF7D"
              textColor="#1F2937"
              label="Yellow Background + Black Text"
            />
            <ContrastChecker
              backgroundColor="#8DDBA4"
              textColor="#1F2937"
              label="Green Background + Black Text"
            />
            <ContrastChecker
              backgroundColor="#7DC0F4"
              textColor="#1F2937"
              label="Blue Background + Black Text"
            />
            <ContrastChecker
              backgroundColor="#FFFFFF"
              textColor="#4B5563"
              label="Dark Gray Text on White"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">
            ♿ 접근성 고려사항
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• 색상에만 의존하지 말고 아이콘, 패턴 등을 함께 사용하세요</li>
            <li>
              • 색맹 사용자를 위해 적-녹 조합을 피하고 대체 표시를 제공하세요
            </li>
            <li>• 중요한 정보는 충분한 대비율을 가진 색상으로 표시하세요</li>
            <li>• 링크는 색상 외에 밑줄 등 추가 시각적 단서를 제공하세요</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "웹 접근성 가이드라인(WCAG)에 따른 색상 대비율을 확인할 수 있습니다.",
      },
    },
  },
};

// 4. Color Swatch Library 스토리
export const ColorSwatchLibrary: Story = {
  render: () => {
    const allColors = [
      // 브랜드 컬러
      {
        color: "#F4DF7D",
        name: "Blockie Yellow",
        hex: "#F4DF7D",
        cssVar: "var(--color-blockie-yellow)",
        tailwindClass: "bg-blockie-yellow",
        description: "메인 브랜드 색상",
      },
      {
        color: "#8DDBA4",
        name: "Blockie Green",
        hex: "#8DDBA4",
        cssVar: "var(--color-blockie-green)",
        tailwindClass: "bg-blockie-green",
        description: "성공 상태",
      },
      {
        color: "#7DC0F4",
        name: "Blockie Blue",
        hex: "#7DC0F4",
        cssVar: "var(--color-blockie-blue)",
        tailwindClass: "bg-blockie-blue",
        description: "정보 전달",
      },
      {
        color: "#C89DF4",
        name: "Blockie Purple",
        hex: "#C89DF4",
        cssVar: "var(--color-blockie-purple)",
        tailwindClass: "bg-blockie-purple",
        description: "프리미엄 기능",
      },
      {
        color: "#F48DAE",
        name: "Blockie Pink",
        hex: "#F48DAE",
        cssVar: "var(--color-blockie-pink)",
        tailwindClass: "bg-blockie-pink",
        description: "창의성",
      },
      {
        color: "#F47D7D",
        name: "Blockie Red",
        hex: "#F47D7D",
        cssVar: "var(--color-blockie-red)",
        tailwindClass: "bg-blockie-red",
        description: "경고, 삭제",
      },
      // 의미론적 컬러
      {
        color: "#34D399",
        name: "Success",
        hex: "#34D399",
        cssVar: "var(--color-success)",
        tailwindClass: "text-success",
        description: "성공 상태",
      },
      {
        color: "#FBBF24",
        name: "Warning",
        hex: "#FBBF24",
        cssVar: "var(--color-warning)",
        tailwindClass: "text-warning",
        description: "주의 상태",
      },
      {
        color: "#EF4444",
        name: "Error",
        hex: "#EF4444",
        cssVar: "var(--color-error)",
        tailwindClass: "text-error",
        description: "오류 상태",
      },
      {
        color: "#60A5FA",
        name: "Info",
        hex: "#60A5FA",
        cssVar: "var(--color-info)",
        tailwindClass: "text-info",
        description: "정보 상태",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">색상 스와치 라이브러리</h2>
          <p className="text-gray-600 mb-6">
            디자인 시스템의 모든 색상을 한눈에 확인하고 사용할 수 있는
            라이브러리입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {allColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "디자인 시스템의 모든 색상을 한눈에 확인하고 코드를 복사할 수 있습니다.",
      },
    },
  },
};

// 5. Real World Examples 스토리
export const RealWorldExamples: Story = {
  render: () => {
    return (
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">실제 적용 예시</h2>
          <p className="text-gray-600 mb-6">
            디자인 시스템 색상이 적용된 실제 UI 컴포넌트 예시입니다.
          </p>
        </div>

        {/* 버튼 variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">버튼 variants</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blockie-yellow text-neutral-black px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Primary Button
            </button>
            <button className="bg-blockie-green text-neutral-black px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Success Button
            </button>
            <button className="bg-blockie-red text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Danger Button
            </button>
            <button className="border-2 border-neutral-light-gray text-neutral-dark-gray px-4 py-2 rounded-lg font-medium hover:bg-neutral-off-white">
              Secondary Button
            </button>
            <button className="bg-blockie-blue text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Info Button
            </button>
            <button className="bg-blockie-purple text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Premium Button
            </button>
          </div>
        </div>

        {/* 카드/알림 상태 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">카드/알림 상태</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Success */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="font-medium text-green-800">성공</span>
              </div>
              <p className="text-sm text-green-700">
                파일이 성공적으로 업로드되었습니다.
              </p>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-warning rounded-full"></div>
                <span className="font-medium text-yellow-800">주의</span>
              </div>
              <p className="text-sm text-yellow-700">
                저장하지 않은 변경사항이 있습니다.
              </p>
            </div>

            {/* Error */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-error rounded-full"></div>
                <span className="font-medium text-red-800">오류</span>
              </div>
              <p className="text-sm text-red-700">
                네트워크 연결을 확인해주세요.
              </p>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-info rounded-full"></div>
                <span className="font-medium text-blue-800">정보</span>
              </div>
              <p className="text-sm text-blue-700">
                새로운 기능이 추가되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 폼 요소 상태 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">폼 요소 상태</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 기본 상태 */}
            <div className="space-y-2">
              <label className="block text-neutral-black font-medium">
                이름
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-blue"
                placeholder="이름을 입력하세요"
              />
            </div>

            {/* 오류 상태 */}
            <div className="space-y-2">
              <label className="block text-neutral-black font-medium">
                이메일
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-blockie-red rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-red"
                placeholder="이메일을 입력하세요"
              />
              <p className="text-blockie-red text-sm">
                유효한 이메일을 입력해주세요.
              </p>
            </div>

            {/* 성공 상태 */}
            <div className="space-y-2">
              <label className="block text-neutral-black font-medium">
                비밀번호
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-blockie-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-green"
                value="*********"
              />
              <p className="text-blockie-green text-sm">
                안전한 비밀번호입니다.
              </p>
            </div>

            {/* 비활성화 상태 */}
            <div className="space-y-2">
              <label className="block text-neutral-medium-gray font-medium">
                프로필 URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-neutral-off-white border border-neutral-light-gray rounded-lg cursor-not-allowed"
                placeholder="자동으로 생성됩니다"
                disabled
              />
            </div>
          </div>
        </div>

        {/* 내비게이션 색상 시스템 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">내비게이션 색상 시스템</h3>
          <div className="border border-neutral-light-gray rounded-lg overflow-hidden">
            {/* 헤더 */}
            <div className="bg-white border-b border-neutral-light-gray p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                <span className="font-bold text-neutral-black">Blockie</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-dark-gray">홈</span>
                <span className="text-blockie-blue">제품</span>
                <span className="text-neutral-dark-gray">가격</span>
                <button className="bg-blockie-yellow text-neutral-black px-3 py-1 rounded-lg text-sm font-medium">
                  시작하기
                </button>
              </div>
            </div>

            {/* 사이드바 */}
            <div className="flex">
              <div className="w-48 bg-neutral-off-white p-4 space-y-3">
                <div className="px-3 py-2 bg-white rounded-lg text-blockie-blue font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blockie-blue"></div>
                  대시보드
                </div>
                <div className="px-3 py-2 text-neutral-dark-gray flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-medium-gray"></div>
                  프로젝트
                </div>
                <div className="px-3 py-2 text-neutral-dark-gray flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-medium-gray"></div>
                  팀 관리
                </div>
                <div className="px-3 py-2 text-neutral-dark-gray flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-medium-gray"></div>
                  설정
                </div>
                <div className="mt-6">
                  <div className="px-3 py-2 text-blockie-purple flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blockie-purple"></div>
                    프리미엄으로 업그레이드
                  </div>
                </div>
              </div>

              {/* 콘텐츠 영역 */}
              <div className="p-6 flex-1 bg-white min-h-[200px] flex items-center justify-center">
                <p className="text-neutral-medium-gray">콘텐츠 영역</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "디자인 시스템의 색상이 실제 UI 컴포넌트에 어떻게 적용되는지 보여주는 예시입니다.",
      },
    },
  },
};

// 6. Brand Guidelines 스토리
export const BrandGuidelines: Story = {
  render: () => {
    return (
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">브랜드 가이드라인</h2>
          <p className="text-gray-600 mb-6">
            블록키 브랜드의 일관된 색상 사용을 위한 가이드라인입니다.
          </p>
        </div>

        {/* 로고 색상 사용법 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">로고 색상 사용법</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 기본 로고 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blockie-yellow"></div>
                <span className="font-bold text-2xl text-neutral-black">
                  Blockie
                </span>
              </div>
              <p className="text-center text-sm text-gray-600">
                기본 로고 (밝은 배경)
              </p>
            </div>

            {/* 어두운 배경 로고 */}
            <div className="bg-neutral-black border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blockie-yellow"></div>
                <span className="font-bold text-2xl text-white">Blockie</span>
              </div>
              <p className="text-center text-sm text-gray-400">
                어두운 배경 로고
              </p>
            </div>

            {/* 모노톤 로고 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-dark-gray"></div>
                <span className="font-bold text-2xl text-neutral-black">
                  Blockie
                </span>
              </div>
              <p className="text-center text-sm text-gray-600">
                모노톤 로고 (흑백 인쇄용)
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-2">⚠️ 금지 사항</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• 로고 색상을 임의로 변경하지 마세요</li>
              <li>• 로고와 배경 간의 충분한 대비를 유지하세요</li>
              <li>• 복잡한 패턴이나 이미지 위에 로고를 배치하지 마세요</li>
              <li>• 로고 주변에 최소 여백(Clear Space)을 유지하세요</li>
            </ul>
          </div>
        </div>

        {/* 배경 조합 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">배경 조합</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 권장 배경 */}
            <div>
              <h4 className="font-medium mb-3 text-green-700 flex items-center">
                <span className="mr-2 text-lg">✓</span> 권장 배경
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-neutral-black">
                      Blockie
                    </span>
                  </div>
                </div>
                <div className="bg-neutral-off-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-neutral-black">
                      Blockie
                    </span>
                  </div>
                </div>
                <div className="bg-neutral-black p-4 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-white">Blockie</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 금지 배경 */}
            <div>
              <h4 className="font-medium mb-3 text-red-700 flex items-center">
                <span className="mr-2 text-lg">✗</span> 금지 배경
              </h4>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-white">Blockie</span>
                  </div>
                </div>
                <div className="bg-yellow-300 p-4 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-neutral-black">
                      Blockie
                    </span>
                  </div>
                </div>
                <div className="bg-red-500 p-4 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blockie-yellow"></div>
                    <span className="font-bold text-white">Blockie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 마케팅 자료 색상 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">마케팅 자료 색상</h3>
          <div className="space-y-6">
            {/* 프레젠테이션 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium mb-4">프레젠테이션</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blockie-yellow h-32 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-neutral-black">
                    커버 슬라이드
                  </span>
                </div>
                <div className="bg-white border border-neutral-light-gray h-32 rounded-lg flex items-center justify-center p-4">
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-1/2 bg-neutral-black rounded"></div>
                    <div className="h-3 w-full bg-neutral-light-gray rounded"></div>
                    <div className="h-3 w-full bg-neutral-light-gray rounded"></div>
                    <div className="h-3 w-3/4 bg-neutral-light-gray rounded"></div>
                  </div>
                </div>
                <div className="bg-neutral-off-white h-32 rounded-lg flex items-center justify-center p-4">
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-1/2 bg-neutral-black rounded"></div>
                    <div className="h-3 w-full bg-blockie-blue bg-opacity-20 rounded"></div>
                    <div className="h-3 w-full bg-blockie-blue bg-opacity-20 rounded"></div>
                    <div className="h-3 w-3/4 bg-blockie-blue bg-opacity-20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 소셜 미디어 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium mb-4">소셜 미디어</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blockie-yellow to-blockie-green h-48 rounded-lg flex items-center justify-center p-6">
                  <div className="bg-white bg-opacity-90 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-blockie-yellow"></div>
                      <span className="font-bold text-neutral-black">
                        Blockie
                      </span>
                    </div>
                    <p className="text-sm text-neutral-dark-gray">
                      브랜드 캠페인 배너
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blockie-blue to-blockie-purple h-48 rounded-lg flex items-center justify-center p-6">
                  <div className="bg-white bg-opacity-90 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-blockie-yellow"></div>
                      <span className="font-bold text-neutral-black">
                        Blockie
                      </span>
                    </div>
                    <p className="text-sm text-neutral-dark-gray">
                      프로모션 배너
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 인쇄물 vs 디지털 고려사항 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">인쇄물 vs 디지털 고려사항</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium mb-3 flex items-center">
                <span className="mr-2 w-6 h-6 bg-neutral-light-gray rounded-full flex items-center justify-center text-neutral-dark-gray">
                  🖨️
                </span>
                인쇄물 색상
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    CMYK 색상 모드 사용 (C:0 M:10 Y:50 K:0 → Blockie Yellow)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>코팅/비코팅 용지에 따라 색상 보정 필요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Pantone 색상 가이드: PMS 101C (Blockie Yellow)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>명함, 브로셔 등 인쇄물에는 모노톤 로고 허용</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium mb-3 flex items-center">
                <span className="mr-2 w-6 h-6 bg-neutral-light-gray rounded-full flex items-center justify-center text-neutral-dark-gray">
                  💻
                </span>
                디지털 색상
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    RGB 색상 모드 사용 (R:244 G:223 B:125 → Blockie Yellow)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>HEX 코드 우선 사용 (#F4DF7D → Blockie Yellow)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>웹 접근성 AA 기준(4.5:1) 대비율 준수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>다크 모드 대응: 밝은 색상 10-15% 채도 감소</span>
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
        story:
          "블록키 브랜드의 일관된 색상 사용을 위한 로고 가이드라인, 배경 조합, 마케팅 자료 색상, 인쇄물과 디지털 색상 고려사항을 제공합니다.",
      },
    },
  },
};
