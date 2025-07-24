import type { Meta, StoryObj } from "@storybook/react";

import BlockieFace from "./face";
import BlockieBottom from "./bottom";

// BlockieFace 스토리
const meta = {
  title: "Blockie Design System/BlockieFace",
  component: BlockieFace,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Blockie 캐릭터의 얼굴을 나타내는 컴포넌트입니다.

### 특징
- 🎨 4분할 색상 시스템 (노랑, 초록, 파랑, 보라)
- 😊 3가지 감정 표현 (happy, sad, neutral)
- 📏 유연한 크기 조정 (size props로 제어)
- 👀 자동 비례 조정 (눈, 입 크기가 size에 맞춰 조정)
- 🎭 픽셀아트 스타일의 귀여운 디자인

### 사용법
\`\`\`jsx
import { BlockieFace } from '@repo/ui'

<BlockieFace size={120} emotion="happy" />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 60, max: 300, step: 10 },
      description:
        "블록키 얼굴의 크기를 결정합니다. 눈과 입 크기도 자동으로 조정됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "120" },
      },
    },
    emotion: {
      control: "select",
      options: ["happy", "sad", "neutral"],
      description: "블록키의 감정 상태를 결정합니다.",
      table: {
        type: { summary: '"happy" | "sad" | "neutral"' },
        defaultValue: { summary: '"happy"' },
      },
    },
  },
  args: {
    size: 120,
    emotion: "happy",
  },
} satisfies Meta<typeof BlockieFace>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    size: 120,
    emotion: "happy",
  },
};

// Playground - 모든 props를 자유롭게 조정할 수 있는 스토리
export const Playground: Story = {
  args: {
    size: 120,
    emotion: "happy",
  },
};

// 감정별 스토리들
export const Happy: Story = {
  args: {
    emotion: "happy",
    size: 120,
  },
  parameters: {
    docs: {
      description: {
        story: "기본적인 행복한 표정의 블록키입니다. 둥근 미소가 특징입니다.",
      },
    },
  },
};

export const Sad: Story = {
  args: {
    emotion: "sad",
    size: 120,
  },
  parameters: {
    docs: {
      description: {
        story: "슬픈 표정의 블록키입니다. 뒤집힌 입모양으로 슬픔을 표현합니다.",
      },
    },
  },
};

export const Neutral: Story = {
  args: {
    emotion: "neutral",
    size: 120,
  },
  parameters: {
    docs: {
      description: {
        story:
          "중립적인 표정의 블록키입니다. 일자 입모양으로 차분함을 표현합니다.",
      },
    },
  },
};

// 모든 감정 비교
export const AllEmotions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <div className="text-center">
        <BlockieFace size={100} emotion="happy" />
        <p className="mt-3 text-sm font-medium">😊 Happy</p>
        <p className="text-xs text-gray-500">기본 상태</p>
      </div>
      <div className="text-center">
        <BlockieFace size={100} emotion="sad" />
        <p className="mt-3 text-sm font-medium">😢 Sad</p>
        <p className="text-xs text-gray-500">오류 상태</p>
      </div>
      <div className="text-center">
        <BlockieFace size={100} emotion="neutral" />
        <p className="mt-3 text-sm font-medium">😐 Neutral</p>
        <p className="text-xs text-gray-500">대기 상태</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "모든 감정 상태를 한눈에 비교할 수 있습니다. 각각 다른 사용 시나리오에 적합합니다.",
      },
    },
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end justify-center">
      <div className="text-center">
        <BlockieFace size={60} emotion="happy" />
        <p className="mt-2 text-xs">60px (아이콘)</p>
      </div>
      <div className="text-center">
        <BlockieFace size={80} emotion="happy" />
        <p className="mt-2 text-xs">80px (작은)</p>
      </div>
      <div className="text-center">
        <BlockieFace size={120} emotion="happy" />
        <p className="mt-2 text-xs">120px (기본)</p>
      </div>
      <div className="text-center">
        <BlockieFace size={160} emotion="happy" />
        <p className="mt-2 text-xs">160px (큰)</p>
      </div>
      <div className="text-center">
        <BlockieFace size={200} emotion="happy" />
        <p className="mt-2 text-xs">200px (특대)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 크기의 블록키 얼굴들입니다. 모든 요소가 비례적으로 조정됩니다.",
      },
    },
  },
};

// 색상 시스템 설명
export const ColorSystem: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <BlockieFace size={150} emotion="happy" />
        <h3 className="mt-4 text-lg font-semibold">4분할 색상 시스템</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blockie-yellow rounded"></div>
          <span className="text-sm">왼쪽 위: 노랑</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blockie-green rounded"></div>
          <span className="text-sm">오른쪽 위: 초록</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blockie-blue rounded"></div>
          <span className="text-sm">왼쪽 아래: 파랑</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blockie-purple rounded"></div>
          <span className="text-sm">오른쪽 아래: 보라</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "블록키 얼굴의 4분할 색상 시스템을 보여줍니다. 각 영역은 브랜드 색상을 사용합니다.",
      },
    },
  },
};

// BlockieBottom 스토리
const bottomMeta = {
  title: "Blockie Design System/BlockieBottom",
  component: BlockieBottom,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Blockie 캐릭터의 하반신을 나타내는 컴포넌트입니다.

### 특징
- 🎨 2색상 그라데이션 (밝은 빨강, 어두운 빨강)
- 📏 얼굴 크기에 맞춰 자동 비례 조정
- 🔄 둥근 모서리로 부드러운 느낌
- 📐 얼굴의 40% 높이, 20% 둥근 모서리

### 사용법
\`\`\`jsx
import { BlockieBottom } from '@repo/ui'

<BlockieBottom size={120} />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 60, max: 300, step: 10 },
      description:
        "블록키 하반신의 크기를 결정합니다. 얼굴 크기와 동일하게 설정해야 합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "120" },
      },
    },
  },
  args: {
    size: 120,
  },
} satisfies Meta<typeof BlockieBottom>;

export const BottomDefault: StoryObj<typeof bottomMeta> = {
  args: {
    size: 120,
  },
};

export const BottomSizes: StoryObj<typeof bottomMeta> = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end justify-center">
      <div className="text-center">
        <BlockieBottom size={60} />
        <p className="mt-2 text-xs">60px</p>
      </div>
      <div className="text-center">
        <BlockieBottom size={80} />
        <p className="mt-2 text-xs">80px</p>
      </div>
      <div className="text-center">
        <BlockieBottom size={120} />
        <p className="mt-2 text-xs">120px</p>
      </div>
      <div className="text-center">
        <BlockieBottom size={160} />
        <p className="mt-2 text-xs">160px</p>
      </div>
      <div className="text-center">
        <BlockieBottom size={200} />
        <p className="mt-2 text-xs">200px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 블록키 하반신들입니다.",
      },
    },
  },
};

// 조합된 블록키 스토리
export const CombinedBlockie: Story = {
  render: (args) => (
    <div className="flex flex-col items-center">
      <BlockieFace size={args.size} emotion={args.emotion} />
      <BlockieBottom size={args.size} />
    </div>
  ),
  args: {
    size: 140,
    emotion: "happy",
  },
  parameters: {
    docs: {
      description: {
        story: "얼굴과 하반신이 조합된 완전한 블록키 캐릭터입니다.",
      },
    },
  },
};

export const CombinedVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={120} emotion="happy" />
          <BlockieBottom size={120} />
        </div>
        <p className="mt-3 text-sm font-medium">😊 행복한 블록키</p>
        <p className="text-xs text-gray-500">성공 상태에 사용</p>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={120} emotion="sad" />
          <BlockieBottom size={120} />
        </div>
        <p className="mt-3 text-sm font-medium">😢 슬픈 블록키</p>
        <p className="text-xs text-gray-500">오류 상태에 사용</p>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={120} emotion="neutral" />
          <BlockieBottom size={120} />
        </div>
        <p className="mt-3 text-sm font-medium">😐 중립 블록키</p>
        <p className="text-xs text-gray-500">로딩 상태에 사용</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 감정 상태의 완전한 블록키 캐릭터들입니다. 각각 다른 UI 상태를 나타낼 때 사용됩니다.",
      },
    },
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end justify-center">
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={80} emotion="happy" />
          <BlockieBottom size={80} />
        </div>
        <p className="mt-2 text-xs font-medium">Small (80px)</p>
        <p className="text-xs text-gray-500">아이콘용</p>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={120} emotion="happy" />
          <BlockieBottom size={120} />
        </div>
        <p className="mt-2 text-xs font-medium">Medium (120px)</p>
        <p className="text-xs text-gray-500">기본 크기</p>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={160} emotion="happy" />
          <BlockieBottom size={160} />
        </div>
        <p className="mt-2 text-xs font-medium">Large (160px)</p>
        <p className="text-xs text-gray-500">메인 화면용</p>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <BlockieFace size={200} emotion="happy" />
          <BlockieBottom size={200} />
        </div>
        <p className="mt-2 text-xs font-medium">XLarge (200px)</p>
        <p className="text-xs text-gray-500">히어로 섹션용</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 크기의 완전한 블록키들을 비교할 수 있습니다. 사용 목적에 따라 적절한 크기를 선택하세요.",
      },
    },
  },
};

// 실제 사용 시나리오들
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      {/* 상태 피드백 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">📱 상태 피드백</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex flex-col items-center">
              <BlockieFace size={80} emotion="happy" />
              <BlockieBottom size={80} />
            </div>
            <p className="mt-3 text-sm font-medium text-green-700">
              작업 완료!
            </p>
            <p className="text-xs text-green-600">성공적으로 저장되었습니다</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="flex flex-col items-center">
              <BlockieFace size={80} emotion="sad" />
              <BlockieBottom size={80} />
            </div>
            <p className="mt-3 text-sm font-medium text-red-700">오류 발생</p>
            <p className="text-xs text-red-600">다시 시도해주세요</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center">
              <BlockieFace size={80} emotion="neutral" />
              <BlockieBottom size={80} />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">처리 중...</p>
            <p className="text-xs text-gray-600">잠시만 기다려주세요</p>
          </div>
        </div>
      </div>

      {/* 빈 상태 */}
      <div className="bg-white p-8 rounded-lg border text-center">
        <h3 className="text-lg font-semibold text-dark mb-6">
          📭 빈 상태 화면
        </h3>
        <div className="flex flex-col items-center">
          <BlockieFace size={120} emotion="neutral" />
          <BlockieBottom size={120} />
        </div>
        <h4 className="mt-6 text-lg font-medium text-gray-700">
          아직 블록이 없어요
        </h4>
        <p className="mt-2 text-sm text-gray-500">
          첫 번째 블록을 만들어보세요!
        </p>
      </div>

      {/* 온보딩 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-6">🎉 온보딩 화면</h3>
        <div className="text-center">
          <div className="flex flex-col items-center">
            <BlockieFace size={160} emotion="happy" />
            <BlockieBottom size={160} />
          </div>
          <h4 className="mt-6 text-2xl font-bold text-gray-800">
            블록키에 오신 걸 환영해요!
          </h4>
          <p className="mt-3 text-gray-600">
            창의적인 블록 만들기를 시작해보세요
          </p>
        </div>
      </div>

      {/* 프로필/아바타 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">
          👤 프로필 아바타
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <BlockieFace size={60} emotion="happy" />
            <BlockieBottom size={60} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">블록키 유저</h4>
            <p className="text-sm text-gray-500">마지막 접속: 5분 전</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                크리에이터
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                프로
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 로딩 화면 */}
      <div className="bg-white p-8 rounded-lg border text-center">
        <h3 className="text-lg font-semibold text-dark mb-6">⏳ 로딩 화면</h3>
        <div className="flex flex-col items-center">
          <div className="animate-pulse">
            <BlockieFace size={100} emotion="neutral" />
            <BlockieBottom size={100} />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-gray-600">
              블록을 생성하고 있어요...
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Blockie 앱에서 실제로 사용될 수 있는 다양한 시나리오들입니다. 상태 피드백부터 온보딩까지 다양한 용도로 활용할 수 있습니다.",
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveTest: Story = {
  render: () => (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold text-center">
        📱 반응형 크기 테스트
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <BlockieFace size={80} emotion="happy" />
            <BlockieBottom size={80} />
          </div>
          <p className="mt-2 text-xs">모바일 (80px)</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <BlockieFace size={100} emotion="happy" />
            <BlockieBottom size={100} />
          </div>
          <p className="mt-2 text-xs">태블릿 (100px)</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <BlockieFace size={120} emotion="happy" />
            <BlockieBottom size={120} />
          </div>
          <p className="mt-2 text-xs">데스크톱 (120px)</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <BlockieFace size={140} emotion="happy" />
            <BlockieBottom size={140} />
          </div>
          <p className="mt-2 text-xs">대형 화면 (140px)</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 화면 크기에 적합한 블록키 크기들을 보여줍니다. 반응형 웹에서 활용할 수 있습니다.",
      },
    },
  },
};

// 애니메이션 테스트 (미래 확장용)
export const AnimationTest: Story = {
  render: () => (
    <div className="text-center space-y-6">
      <h3 className="text-lg font-semibold">🎭 애니메이션 테스트</h3>
      <p className="text-sm text-gray-600 mb-6">
        현재는 기본 상태이며, 향후 호버/클릭 애니메이션을 추가할 수 있습니다.
      </p>
      <div className="flex gap-6 justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center transition-transform hover:scale-110">
            <BlockieFace size={100} emotion="happy" />
            <BlockieBottom size={100} />
          </div>
          <p className="mt-2 text-xs">호버 확대</p>
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center hover:animate-pulse">
            <BlockieFace size={100} emotion="neutral" />
            <BlockieBottom size={100} />
          </div>
          <p className="mt-2 text-xs">호버 펄스</p>
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center transition-all hover:rotate-12">
            <BlockieFace size={100} emotion="happy" />
            <BlockieBottom size={100} />
          </div>
          <p className="mt-2 text-xs">호버 회전</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "CSS 애니메이션을 적용한 블록키들입니다. 인터랙티브한 경험을 제공할 수 있습니다.",
      },
    },
  },
};

// Export bottom meta and stories separately
export { bottomMeta };
export const BlockieBottomStories = {
  Default: BottomDefault,
  Sizes: BottomSizes,
};
