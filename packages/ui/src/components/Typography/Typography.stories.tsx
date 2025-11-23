import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Typography Foundation Component
const Typography = () => null;

const meta = {
  title: "Foundation/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 타이포그래피 체계입니다.

### 디자인 철학
- 📖 **가독성 우선**: 모든 환경에서 명확하게 읽힐 수 있는 폰트 설정
- 📏 **계층적 구조**: 정보의 중요도에 따른 명확한 시각적 계층
- 🎯 **일관성**: 모든 인터페이스에서 통일된 타이포그래피 사용
- 📱 **반응형**: 디바이스에 따른 최적화된 크기 조정

### 폰트 스택
- **본문용**: Pretendard (한글 최적화)
- **제목용**: Montserrat + Pretendard (국제적 느낌)
- **시스템 폰트**: system-ui, sans-serif (폴백)
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// 폰트 스택 데모
export const FontStack: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">폰트 패밀리</h2>
        <p className="text-gray-600 mb-6">
          Blockie는 한글과 영문의 조화를 위해 최적화된 폰트 조합을 사용합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pretendard */}
        <div className="bg-white border rounded-lg p-6">
          <h3
            className="font-semibold mb-3"
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            Pretendard (본문용)
          </h3>
          <div
            style={{ fontFamily: "Pretendard, sans-serif" }}
            className="space-y-3"
          >
            <p className="text-lg">한글과 영문이 조화로운 Pretendard</p>
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>가나다라마바사아자차카타파하</p>
            <p>1234567890 !@#$%^&*()</p>
          </div>
        </div>

        {/* Montserrat */}
        <div className="bg-white border rounded-lg p-6">
          <h3
            className="font-semibold mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Montserrat (제목용)
          </h3>
          <div
            style={{ fontFamily: "Montserrat, sans-serif" }}
            className="space-y-3"
          >
            <p className="text-lg">Modern & Clean Typography</p>
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p className="font-thin">Thin 100</p>
            <p className="font-bold">Bold 700</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Blockie에서 사용하는 주요 폰트들의 특성과 적용 방법을 확인할 수 있습니다.",
      },
    },
  },
};

// 타이포그래피 스케일
export const TypographyScale: Story = {
  render: () => {
    const typeScale = [
      {
        name: "Display",
        class: "text-display",
        size: "32px",
        weight: "700",
        usage: "페이지 메인 타이틀",
      },
      {
        name: "Title 1",
        class: "text-title-1",
        size: "24px",
        weight: "700",
        usage: "섹션 제목",
      },
      {
        name: "Title 2",
        class: "text-title-2",
        size: "20px",
        weight: "600",
        usage: "서브 섹션 제목",
      },
      {
        name: "Title 3",
        class: "text-title-3",
        size: "18px",
        weight: "600",
        usage: "카드/컴포넌트 제목",
      },
      {
        name: "Body 1",
        class: "text-body-1",
        size: "16px",
        weight: "400",
        usage: "기본 본문 텍스트",
      },
      {
        name: "Body 2",
        class: "text-body-2",
        size: "14px",
        weight: "400",
        usage: "서브 텍스트, 설명",
      },
      {
        name: "Caption",
        class: "text-caption",
        size: "12px",
        weight: "400",
        usage: "라벨, 메타 정보",
      },
      {
        name: "Button",
        class: "text-button",
        size: "16px",
        weight: "500",
        usage: "버튼 텍스트",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">타이포그래피 스케일</h2>
          <p className="text-gray-600 mb-6">
            정보 계층에 따른 텍스트 크기와 굵기 체계입니다.
          </p>
        </div>

        <div className="space-y-4">
          {typeScale.map((item) => (
            <div key={item.name} className="bg-white border rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <p className={item.class}>
                    {item.name} - 좋은 타이포그래피는 읽기 편한 디자인의
                    시작입니다
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500 space-y-1">
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                  <div>크기: {item.size}</div>
                  <div>굵기: {item.weight}</div>
                  <div className="text-xs">{item.usage}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 사용 가이드</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <code>Display</code>: 한 페이지에 하나만 사용
            </li>
            <li>
              • <code>Title 1-3</code>: 콘텐츠 구조에 따라 계층적 사용
            </li>
            <li>
              • <code>Body 1</code>: 기본 텍스트, 16px으로 가독성 확보
            </li>
            <li>
              • <code>Caption</code>: 부가 정보, 과도한 사용 지양
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
          "계층적 정보 구조를 위한 텍스트 크기 시스템입니다. 각 레벨의 용도와 특성을 확인하세요.",
      },
    },
  },
};

// 숫자 타이포그래피
export const NumberTypography: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">숫자 전용 타이포그래피</h2>
        <p className="text-gray-600 mb-6">
          데이터 시각화와 수치 강조를 위한 특별한 숫자 스타일입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-6 text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Number Large
          </h3>
          <div className="text-number-l text-blockie-blue">142</div>
          <p className="text-caption text-gray-500 mt-2">대시보드 메인 수치</p>
        </div>

        <div className="bg-white border rounded-lg p-6 text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Number Medium
          </h3>
          <div className="text-number-m text-blockie-green">89%</div>
          <p className="text-caption text-gray-500 mt-2">차트 라벨, 통계</p>
        </div>

        <div className="bg-white border rounded-lg p-6 text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Number Small
          </h3>
          <div className="text-number-s text-neutral-dark-gray">+24</div>
          <p className="text-caption text-gray-500 mt-2">카운터, 배지</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blockie-yellow to-blockie-green rounded-lg p-6 text-center">
        <h3 className="text-title-2 text-neutral-black mb-4">실제 적용 예시</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div>
            <div className="text-number-l">1,234</div>
            <div className="text-sm">총 사용자</div>
          </div>
          <div>
            <div className="text-number-l">98.5%</div>
            <div className="text-sm">만족도</div>
          </div>
          <div>
            <div className="text-number-l">+15%</div>
            <div className="text-sm">성장률</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "수치 데이터를 효과적으로 강조하기 위한 전용 타이포그래피입니다.",
      },
    },
  },
};

// 실제 사용 예시
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">실제 적용 예시</h2>
        <p className="text-gray-600 mb-6">
          다양한 UI 컴포넌트에서 타이포그래피가 어떻게 적용되는지 확인하세요.
        </p>
      </div>

      {/* 블로그 포스트 예시 */}
      <div className="bg-white border rounded-lg p-8">
        <div className="text-display mb-4">블록키로 만드는 창의적인 디자인</div>
        <div className="text-body-2 text-neutral-medium-gray mb-6">
          2024년 3월 15일 • 디자인팀 • 5분 읽기
        </div>

        <div className="text-title-1 mb-4">서론: 블록 기반 디자인의 힘</div>
        <div className="text-body-1 mb-6 leading-relaxed">
          현대 웹 디자인에서 블록 기반 접근법은 단순히 트렌드를 넘어 필수 요소가
          되었습니다. 블록키는 이러한 철학을 바탕으로 사용자가 직관적으로 이해할
          수 있는 인터페이스를 제공합니다.
        </div>

        <div className="text-title-2 mb-3">1. 사용자 경험의 향상</div>
        <div className="text-body-1 mb-4">
          블록 단위의 구성은 사용자의 인지 부담을 줄이고 정보를 체계적으로
          전달합니다.
        </div>

        <div className="text-title-3 mb-2">핵심 원칙</div>
        <div className="text-body-2 mb-6">
          • 명확한 정보 계층 구조
          <br />
          • 일관된 시각적 패턴
          <br />• 직관적인 상호작용 디자인
        </div>

        <div className="text-caption text-neutral-medium-gray">
          이 글이 도움이 되었다면 공유해주세요 ✨
        </div>
      </div>

      {/* 카드 컴포넌트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-title-3 mb-2">프로젝트 A</div>
          <div className="text-body-2 text-neutral-dark-gray mb-4">
            사용자 인터페이스 개선을 위한 종합적인 디자인 시스템 구축 프로젝트
          </div>
          <div className="flex justify-between items-center">
            <div className="text-caption text-neutral-medium-gray">진행률</div>
            <div className="text-number-s text-blockie-green">85%</div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <div className="text-title-3 mb-2">프로젝트 B</div>
          <div className="text-body-2 text-neutral-dark-gray mb-4">
            모바일 애플리케이션의 성능 최적화 및 사용성 개선
          </div>
          <div className="flex justify-between items-center">
            <div className="text-caption text-neutral-medium-gray">진행률</div>
            <div className="text-number-s text-blockie-blue">42%</div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <div className="text-title-3 mb-2">프로젝트 C</div>
          <div className="text-body-2 text-neutral-dark-gray mb-4">
            브랜드 아이덴티티 리뉴얼과 통합 가이드라인 수립
          </div>
          <div className="flex justify-between items-center">
            <div className="text-caption text-neutral-medium-gray">진행률</div>
            <div className="text-number-s text-warning">12%</div>
          </div>
        </div>
      </div>

      {/* 폼 예시 */}
      <div className="bg-white border rounded-lg p-6">
        <div className="text-title-2 mb-6">계정 설정</div>
        <div className="space-y-4">
          <div>
            <label className="text-body-2 font-medium mb-2 block">
              이메일 주소
            </label>
            <input
              type="email"
              className="w-full p-3 border border-neutral-light-gray rounded-lg text-body-1"
              placeholder="your@email.com"
            />
            <div className="text-caption text-neutral-medium-gray mt-1">
              알림과 업데이트를 받을 이메일 주소입니다
            </div>
          </div>

          <div>
            <label className="text-body-2 font-medium mb-2 block">
              표시 이름
            </label>
            <input
              type="text"
              className="w-full p-3 border border-neutral-light-gray rounded-lg text-body-1"
              placeholder="홍길동"
            />
          </div>

          <button className="bg-blockie-yellow text-neutral-black px-6 py-3 rounded-lg text-button font-medium">
            설정 저장
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "실제 웹 애플리케이션에서 타이포그래피가 어떻게 적용되는지 보여주는 종합 예시입니다.",
      },
    },
  },
};

// 반응형 타이포그래피
export const ResponsiveTypography: Story = {
  render: () => {
    const [screenSize, setScreenSize] = useState("desktop");

    const screens: Record<string, { name: string; width: string }> = {
      mobile: { name: "모바일 (360px)", width: "360px" },
      tablet: { name: "태블릿 (768px)", width: "768px" },
      desktop: { name: "데스크톱 (1024px+)", width: "100%" },
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">반응형 타이포그래피</h2>
          <p className="text-gray-600 mb-6">
            디바이스 크기에 따른 최적화된 텍스트 크기를 확인하세요.
          </p>
        </div>

        {/* 화면 크기 선택 */}
        <div className="flex gap-2 mb-6">
          {Object.entries(screens).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setScreenSize(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                screenSize === key
                  ? "bg-blockie-blue text-white"
                  : "bg-neutral-light-gray text-neutral-dark-gray"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 시뮬레이션 영역 */}
        <div className="border-2 border-dashed border-neutral-light-gray p-4">
          <div
            className="mx-auto bg-white border rounded-lg overflow-hidden"
            style={{
              // TODO: can be undefined
              // !! 사용해 에러 발생 방지 처리
              width: screens[screenSize]!.width,
              maxWidth: "100%",
            }}
          >
            <div className="p-6 space-y-4">
              <div
                className={`${screenSize === "mobile" ? "text-xl" : screenSize === "tablet" ? "text-2xl" : "text-display"} font-bold`}
              >
                Responsive Headline
              </div>

              <div
                className={`${screenSize === "mobile" ? "text-lg" : "text-title-1"} font-semibold`}
              >
                Section Title
              </div>

              <div
                className={`${screenSize === "mobile" ? "text-sm" : "text-body-1"}`}
              >
                본문 텍스트는 화면 크기에 따라 적절한 크기로 조정되어 모든
                디바이스에서 최적의 가독성을 제공합니다.
              </div>

              <div
                className={`${screenSize === "mobile" ? "text-xs" : "text-caption"} text-neutral-medium-gray`}
              >
                메타 정보나 부가 설명
              </div>
            </div>
          </div>
        </div>

        {/* 가이드라인 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📱 모바일</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Display → 20-24px</li>
              <li>• Title 1 → 18-20px</li>
              <li>• Body 1 → 14-16px</li>
              <li>• 줄간격 1.5배 권장</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">📱 태블릿</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Display → 28px</li>
              <li>• Title 1 → 22px</li>
              <li>• Body 1 → 16px</li>
              <li>• 줄간격 1.4배 권장</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">🖥️ 데스크톱</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Display → 32px+</li>
              <li>• Title 1 → 24px</li>
              <li>• Body 1 → 16px</li>
              <li>• 줄간격 1.6배 권장</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "다양한 화면 크기에서 최적의 가독성을 위한 반응형 타이포그래피 가이드라인입니다.",
      },
    },
  },
};
