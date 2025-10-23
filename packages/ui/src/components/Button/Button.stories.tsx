import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  Button,
  PlusIcon,
  DownloadIcon,
  SettingsIcon,
  HeartIcon,
  TrashIcon,
} from "./Button";

const meta = {
  title: "Blockie Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Blockie 앱의 디자인 시스템을 기반으로 한 재사용 가능한 Button 컴포넌트입니다. 

### 특징
- 🎨 Blockie 브랜드 색상 시스템 적용
- 📱 5가지 크기 지원 (xs, sm, md, lg, xl)
- 🎭 7가지 variant 스타일
- ⚡ 내장 SVG 아이콘 (lucide-react 불필요)
- 🔄 로딩 상태 및 애니메이션 지원
- ♿ 접근성 고려 (포커스, 키보드 네비게이션)

### 사용법
\`\`\`jsx
import { Button, PlusIcon } from '@repo/ui'

<Button variant="primary" leftIcon={<PlusIcon />}>
  버튼 텍스트
</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "success",
        "warning",
        "error",
      ],
      description: "버튼의 시각적 스타일을 결정합니다.",
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "버튼의 크기를 결정합니다.",
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "md" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "로딩 상태를 표시하고 클릭을 비활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "버튼을 비활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "버튼을 부모 컨테이너의 전체 너비로 확장합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    animated: {
      control: "boolean",
      description: "호버 및 클릭 애니메이션을 활성화/비활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    children: {
      control: "text",
      description: "버튼 내부에 표시될 텍스트 또는 콘텐츠입니다.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    leftIcon: {
      control: false,
      description: "버튼 텍스트 왼쪽에 표시될 아이콘입니다.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    rightIcon: {
      control: false,
      description: "버튼 텍스트 오른쪽에 표시될 아이콘입니다.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

// Playground - 모든 props를 자유롭게 조정할 수 있는 스토리
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Playground Button",
    isLoading: false,
    disabled: false,
    fullWidth: false,
    animated: true,
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Button",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error Button",
  },
};

// 전체 Variant 비교
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 버튼 variant를 한눈에 비교할 수 있습니다.",
      },
    },
  },
};

// 사이즈 스토리들
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Button size="xs">Extra Small (xs)</Button>
      <Button size="sm">Small (sm)</Button>
      <Button size="md">Medium (md)</Button>
      <Button size="lg">Large (lg)</Button>
      <Button size="xl">Extra Large (xl)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "5가지 버튼 크기를 비교할 수 있습니다. 아이콘 크기도 자동으로 조정됩니다.",
      },
    },
  },
};

// 내장 아이콘이 포함된 버튼들
export const WithBuiltInIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" rightIcon={<DownloadIcon />}>
        Download
      </Button>
      <Button variant="outline" leftIcon={<SettingsIcon />}>
        Settings
      </Button>
      <Button
        variant="success"
        leftIcon={<HeartIcon />}
        rightIcon={<PlusIcon />}
      >
        Like & Add
      </Button>
      <Button variant="error" leftIcon={<TrashIcon />} size="sm">
        Delete
      </Button>
      <Button variant="warning" rightIcon={<SettingsIcon />} size="lg">
        Configure
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "내장 SVG 아이콘들을 사용한 버튼 예시입니다. lucide-react 없이도 다양한 아이콘을 사용할 수 있습니다.",
      },
    },
  },
};

// 커스텀 아이콘 예시
export const WithCustomIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        leftIcon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        }
        variant="warning"
      >
        번개 ⚡
      </Button>
      <Button
        rightIcon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        }
        variant="success"
      >
        전송 📤
      </Button>
      <Button
        leftIcon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        variant="success"
      >
        완료 ✅
      </Button>
      <Button
        leftIcon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        }
        variant="outline"
      >
        즐겨찾기 ⭐
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "커스텀 SVG 아이콘을 사용한 버튼 예시입니다. 어떤 SVG 아이콘이든 사용할 수 있습니다.",
      },
    },
  },
};

// 아이콘 크기 자동 조정
export const IconSizeAdaptation: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="xs" leftIcon={<PlusIcon />}>
        XS
      </Button>
      <Button size="sm" leftIcon={<PlusIcon />}>
        SM
      </Button>
      <Button size="md" leftIcon={<PlusIcon />}>
        MD
      </Button>
      <Button size="lg" leftIcon={<PlusIcon />}>
        LG
      </Button>
      <Button size="xl" leftIcon={<PlusIcon />}>
        XL
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "버튼 크기에 따라 아이콘 크기가 자동으로 조정됩니다. xs(12px) → sm/md(16px) → lg(20px) → xl(24px)",
      },
    },
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading...",
  },
  parameters: {
    docs: {
      description: {
        story: "로딩 상태에서는 스피너가 표시되고 버튼이 비활성화됩니다.",
      },
    },
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button isLoading variant="primary">
        Primary Loading
      </Button>
      <Button isLoading variant="secondary">
        Secondary Loading
      </Button>
      <Button isLoading variant="success">
        Success Loading
      </Button>
      <Button isLoading variant="error">
        Error Loading
      </Button>
      <Button isLoading variant="outline">
        Outline Loading
      </Button>
      <Button isLoading variant="ghost">
        Ghost Loading
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant에서 로딩 상태를 확인할 수 있습니다.",
      },
    },
  },
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button disabled variant="secondary">
        Disabled Secondary
      </Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="success" leftIcon={<HeartIcon />}>
        Disabled Success
      </Button>
      <Button disabled variant="error" rightIcon={<TrashIcon />}>
        Disabled Error
      </Button>
      <Button disabled variant="ghost">
        Disabled Ghost
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "비활성화된 버튼들입니다. 투명도가 50%로 설정되고 클릭할 수 없습니다.",
      },
    },
  },
};

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Button fullWidth leftIcon={<PlusIcon />}>
        Add New Block
      </Button>
      <Button fullWidth variant="outline" rightIcon={<DownloadIcon />}>
        Download Project
      </Button>
      <Button fullWidth variant="secondary">
        Cancel Action
      </Button>
      <Button fullWidth variant="error" leftIcon={<TrashIcon />}>
        Delete Everything
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "전체 너비 버튼들입니다. 폼이나 카드에서 주로 사용됩니다.",
      },
    },
  },
};

// 애니메이션 비교
export const AnimationComparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center space-y-4">
        <h3 className="font-semibold">애니메이션 있음</h3>
        <div className="space-y-2">
          <Button animated={true}>Hover me! 🎭</Button>
          <Button animated={true} variant="outline">
            Click me! 🎪
          </Button>
        </div>
      </div>
      <div className="text-center space-y-4">
        <h3 className="font-semibold">애니메이션 없음</h3>
        <div className="space-y-2">
          <Button animated={false} variant="secondary">
            Static Button
          </Button>
          <Button animated={false} variant="ghost">
            No Animation
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "애니메이션이 있는 버튼과 없는 버튼을 비교할 수 있습니다. 호버하거나 클릭해보세요!",
      },
    },
  },
};

// 실제 사용 시나리오들
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      {/* 블록 생성 영역 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">🧱 블록 생성</h3>
        <div className="flex gap-3">
          <Button leftIcon={<PlusIcon />}>새 블록</Button>
          <Button variant="outline" leftIcon={<SettingsIcon />}>
            템플릿
          </Button>
          <Button variant="ghost" size="sm">
            미리보기
          </Button>
        </div>
      </div>

      {/* 프로젝트 관리 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">
          📁 프로젝트 관리
        </h3>
        <div className="flex gap-3">
          <Button variant="success" rightIcon={<DownloadIcon />}>
            저장
          </Button>
          <Button variant="warning">미리보기</Button>
          <Button variant="error" leftIcon={<TrashIcon />}>
            삭제
          </Button>
        </div>
      </div>

      {/* 양식 제출 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">📝 양식 제출</h3>
        <div className="space-y-3">
          <Button fullWidth size="lg" leftIcon={<PlusIcon />}>
            프로젝트 생성하기
          </Button>
          <div className="flex gap-3">
            <Button fullWidth variant="outline">
              취소
            </Button>
            <Button fullWidth variant="secondary">
              임시저장
            </Button>
          </div>
        </div>
      </div>

      {/* 상태별 액션 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-dark mb-4">🎯 상태별 액션</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button isLoading>업로드 중...</Button>
          <Button disabled>비활성화됨</Button>
          <Button variant="success" leftIcon={<HeartIcon />}>
            좋아요
          </Button>
          <Button variant="error" size="sm">
            신고하기
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Blockie 앱에서 실제로 사용될 수 있는 다양한 시나리오들입니다.",
      },
    },
  },
};

// 접근성 테스트
export const AccessibilityTest: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">
          ⌨️ 키보드 네비게이션 테스트
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Tab 키로 이동하고 Enter/Space로 클릭해보세요.
        </p>
        <div className="flex gap-3">
          <Button>첫 번째</Button>
          <Button variant="outline">두 번째</Button>
          <Button variant="success">세 번째</Button>
          <Button disabled>네 번째 (비활성)</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">🎯 포커스 스타일</h3>
        <p className="text-sm text-gray-600 mb-4">
          버튼에 포커스할 때 노란색 outline이 표시됩니다.
        </p>
        <div className="flex gap-3">
          <Button leftIcon={<PlusIcon />}>Primary Focus</Button>
          <Button variant="outline" rightIcon={<SettingsIcon />}>
            Outline Focus
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "키보드 네비게이션과 포커스 스타일을 테스트할 수 있습니다. 웹 접근성 가이드라인을 준수합니다.",
      },
    },
  },
};

// 인터랙티브 테스트 (Storybook interactions)
export const InteractiveTest: Story = {
  args: {
    children: "Click me!",
    leftIcon: <PlusIcon />,
  },
  play: async ({ canvasElement, step }) => {
    // Storybook 인터랙션 테스트는 선택사항으로 여기서는 기본 설정만
    console.log("Button interaction test ready");
  },
  parameters: {
    docs: {
      description: {
        story:
          "인터랙티브 테스트용 버튼입니다. Actions 탭에서 클릭 이벤트를 확인할 수 있습니다.",
      },
    },
  },
};
