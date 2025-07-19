import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 기본 버튼 컴포넌트입니다.

### 주요 특징
- 🎨 **5가지 변형**: primary, secondary, outline, ghost, danger
- 📏 **다양한 크기**: sm, md, lg 지원
- ⚡ **인터랙션**: hover, active, focus 상태 애니메이션
- 🔄 **로딩 상태**: 스피너와 비활성화 지원
- ♿ **접근성**: 키보드 네비게이션, 포커스 링

### 사용법
\`\`\`tsx
import { Button } from './components/Button';

<Button variant="primary" size="md">
  클릭하세요
</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      description: "버튼 스타일 변형",
    },
    color: {
      control: { type: "select" },
      options: [
        "blockie-yellow",
        "blockie-green",
        "blockie-blue",
        "blockie-purple",
        "blockie-pink",
        "blockie-red",
        "blockie-red-light",
        "neutral-black",
        "neutral-dark-gray",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "커스텀 색상 (CSS 변수명)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼 크기",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 사용 여부",
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태",
    },
    children: {
      control: { type: "text" },
      description: "버튼 내용",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Button 스토리
export const BasicButton: Story = {
  args: {
    children: "기본 버튼",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 형태의 버튼입니다.",
      },
    },
  },
};

// 2. Button Variants 스토리
export const ButtonVariants: Story = {
  args: {
    children: <div>ButtonVariants</div>,
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">기본 버튼 변형</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 버튼 스타일 변형을 보여줍니다.",
      },
    },
  },
};

// 3. Custom Colors 스토리
export const CustomColors: Story = {
  args: {
    children: <div>CustomColors</div>,
  },
  render: () => {
    const colors = [
      "blockie-yellow",
      "blockie-green",
      "blockie-blue",
      "blockie-purple",
      "blockie-pink",
      "blockie-red",
      "success",
      "warning",
      "error",
      "info",
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">커스텀 색상 조합</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Primary 변형 + 다양한 색상</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <Button
                    key={`primary-${color}`}
                    variant="primary"
                    color={color}
                  >
                    {color.split("-").pop()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Outline 변형 + 다양한 색상</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <Button
                    key={`outline-${color}`}
                    variant="outline"
                    color={color}
                  >
                    {color.split("-").pop()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Ghost 변형 + 다양한 색상</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <Button key={`ghost-${color}`} variant="ghost" color={color}>
                    {color.split("-").pop()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용법</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <code className="block bg-white px-2 py-1 rounded">
              &lt;Button variant="primary" color="blockie-green"&gt;초록
              버튼&lt;/Button&gt;
            </code>
            <code className="block bg-white px-2 py-1 rounded">
              &lt;Button variant="outline" color="blockie-purple"&gt;보라
              테두리&lt;/Button&gt;
            </code>
            <code className="block bg-white px-2 py-1 rounded">
              &lt;Button variant="ghost" color="error"&gt;에러
              고스트&lt;/Button&gt;
            </code>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Blockie 색상 변수를 자유롭게 조합한 커스텀 버튼들을 보여줍니다.",
      },
    },
  },
};

// 4. Button Sizes 스토리
export const ButtonSizes: Story = {
  args: {
    children: <div>ButtonSizes</div>,
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">버튼 크기</h3>
          <div className="flex items-center gap-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">커스텀 색상 + 크기 조합</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Button variant="primary" color="blockie-green" size="sm">
                Small Green
              </Button>
              <Button variant="primary" color="blockie-green" size="md">
                Medium Green
              </Button>
              <Button variant="primary" color="blockie-green" size="lg">
                Large Green
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" color="blockie-purple" size="sm">
                Small Purple
              </Button>
              <Button variant="outline" color="blockie-purple" size="md">
                Medium Purple
              </Button>
              <Button variant="outline" color="blockie-purple" size="lg">
                Large Purple
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 버튼과 커스텀 색상 조합을 보여줍니다.",
      },
    },
  },
};

// 4. Button States 스토리
export const ButtonStates: Story = {
  args: {
    children: <div>ButtonStates</div>,
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">버튼 상태</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">기본 상태</h4>
              <div className="flex gap-4">
                <Button variant="primary">Normal</Button>
                <Button variant="secondary">Normal</Button>
                <Button variant="outline">Normal</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">비활성화 상태</h4>
              <div className="flex gap-4">
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">로딩 상태</h4>
              <div className="flex gap-4">
                <Button variant="primary" loading>
                  Loading
                </Button>
                <Button variant="secondary" loading>
                  Loading
                </Button>
                <Button variant="outline" loading>
                  Loading
                </Button>
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
        story: "버튼의 다양한 상태를 보여줍니다.",
      },
    },
  },
};

// 5. Full Width Buttons 스토리
export const FullWidthButtons: Story = {
  args: {
    children: <div>ButtonStates</div>,
  },
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">전체 너비 버튼</h3>
          <div className="space-y-3">
            <Button variant="primary" fullWidth>
              전체 너비 Primary
            </Button>
            <Button variant="secondary" fullWidth>
              전체 너비 Secondary
            </Button>
            <Button variant="outline" fullWidth>
              전체 너비 Outline
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "전체 너비를 사용하는 버튼들을 보여줍니다.",
      },
    },
  },
};

// 6. Interactive Examples 스토리
export const InteractiveExamples: Story = {
  args: {
    children: <div>InteractiveExamples</div>,
  },
  render: () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleAsyncAction = async () => {
      setLoading(true);
      // 2초 대기 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setCount((prev) => prev + 1);
    };

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">인터랙티브 예시</h3>

          <div className="space-y-6">
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-3">카운터</h4>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                  disabled={count === 0}
                >
                  -
                </Button>
                <span className="text-lg font-semibold min-w-[2rem] text-center">
                  {count}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-3">비동기 액션</h4>
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={handleAsyncAction}
                >
                  {loading ? "처리 중..." : "비동기 작업 실행"}
                </Button>
                <span className="text-sm text-gray-600 self-center">
                  실행 횟수: {count}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-3">토글 액션</h4>
              <Button
                variant={liked ? "primary" : "outline"}
                onClick={() => setLiked((prev) => !prev)}
              >
                {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "실제 사용 시나리오를 보여주는 인터랙티브 예시입니다.",
      },
    },
  },
};

// 7. Button Groups 스토리
export const ButtonGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState("left");

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">버튼 그룹</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">액션 그룹</h4>
              <div className="flex gap-2">
                <Button variant="primary">저장</Button>
                <Button variant="secondary">취소</Button>
                <Button variant="outline">미리보기</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">커스텀 색상 액션 그룹</h4>
              <div className="flex gap-2">
                <Button variant="primary" color="success">
                  완료
                </Button>
                <Button variant="outline" color="warning">
                  대기
                </Button>
                <Button variant="outline" color="error">
                  삭제
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">위험한 액션</h4>
              <div className="flex gap-2">
                <Button variant="secondary">뒤로</Button>
                <Button variant="primary" color="error">
                  삭제
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">세그먼트 컨트롤 (토글 그룹)</h4>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={selected === "left" ? "primary" : "ghost"}
                  color={selected === "left" ? "blockie-blue" : undefined}
                  onClick={() => setSelected("left")}
                  className="rounded-none border-0"
                >
                  왼쪽
                </Button>
                <Button
                  variant={selected === "center" ? "primary" : "ghost"}
                  color={selected === "center" ? "blockie-blue" : undefined}
                  onClick={() => setSelected("center")}
                  className="rounded-none border-0 border-l border-r border-gray-300"
                >
                  가운데
                </Button>
                <Button
                  variant={selected === "right" ? "primary" : "ghost"}
                  color={selected === "right" ? "blockie-blue" : undefined}
                  onClick={() => setSelected("right")}
                  className="rounded-none border-0"
                >
                  오른쪽
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  args: {
    children: "Button Group",
  },
  parameters: {
    docs: {
      description: {
        story:
          "여러 버튼을 조합한 그룹 사용 예시입니다. 커스텀 색상을 활용한 다양한 조합을 확인할 수 있습니다.",
      },
    },
  },
};

// 8. Playground (모든 props 조합 테스트용)
export const Playground: Story = {
  args: {
    children: "플레이그라운드 버튼",
    variant: "primary",
    color: "blockie-yellow", // 기본 색상 추가
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 Button 속성을 자유롭게 테스트할 수 있는 플레이그라운드입니다. 하단의 Controls 패널에서 다양한 속성과 색상을 변경해보세요.",
      },
    },
  },
};
