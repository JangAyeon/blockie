// stories/Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Blockie 디자인 시스템의 기본 입력 컴포넌트입니다.

### 주요 특징
- 📝 **다양한 크기**: sm, md, lg 지원
- 🎨 **두 가지 스타일**: default, filled
- ✅ **상태 관리**: error, disabled, focus 상태
- ♿ **접근성**: 라벨, 도움말, 키보드 네비게이션

### 사용법
\`\`\`tsx
import { Input } from './components/Input';

<Input 
  label="이메일" 
  type="email" 
  placeholder="your@email.com"
  helperText="로그인에 사용됩니다"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "입력 필드 크기",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "filled"],
      description: "입력 필드 스타일",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "입력 타입",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태",
    },
    label: {
      control: { type: "text" },
      description: "입력 필드 라벨",
    },
    helperText: {
      control: { type: "text" },
      description: "도움말 텍스트",
    },
    error: {
      control: { type: "text" },
      description: "에러 메시지",
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더 텍스트",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Input 스토리
export const BasicInput: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    label: "기본 입력 필드",
  },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 형태의 입력 필드입니다.",
      },
    },
  },
};

// 2. Input Sizes 스토리
export const InputSizes: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">입력 필드 크기</h3>
          <div className="space-y-4">
            <Input
              size="sm"
              label="Small (sm)"
              placeholder="작은 크기 입력 필드"
            />
            <Input
              size="md"
              label="Medium (md) - 기본"
              placeholder="기본 크기 입력 필드"
            />
            <Input
              size="lg"
              label="Large (lg)"
              placeholder="큰 크기 입력 필드"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 입력 필드를 보여줍니다.",
      },
    },
  },
};

// 3. Input Variants 스토리
export const InputVariants: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">입력 필드 스타일</h3>
          <div className="space-y-4">
            <Input
              variant="default"
              label="Default 스타일"
              placeholder="테두리가 있는 기본 스타일"
            />
            <Input
              variant="filled"
              label="Filled 스타일"
              placeholder="배경이 채워진 스타일"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "두 가지 입력 필드 스타일을 비교합니다.",
      },
    },
  },
};

// 4. Input States 스토리
export const InputStates: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">입력 필드 상태</h3>
          <div className="space-y-4">
            <Input label="기본 상태" placeholder="기본 상태의 입력 필드" />

            <Input
              label="포커스 상태"
              placeholder="클릭하여 포커스 확인"
              helperText="클릭하면 노란색 포커스 링이 나타납니다"
            />

            <Input
              label="에러 상태"
              placeholder="잘못된 입력"
              error="올바른 이메일 주소를 입력해주세요"
              defaultValue="invalid-email"
            />

            <Input
              label="성공 상태"
              placeholder="올바른 입력"
              helperText="✓ 사용 가능한 이메일입니다"
              defaultValue="user@example.com"
              className="border-green-500 focus:ring-green-500 focus:border-green-500"
            />

            <Input
              label="비활성화 상태"
              placeholder="비활성화된 필드"
              disabled
              defaultValue="수정할 수 없는 값"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "입력 필드의 다양한 상태를 보여줍니다.",
      },
    },
  },
};

// 5. Input Types 스토리
export const InputTypes: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">입력 타입</h3>
          <div className="space-y-4">
            <Input type="text" label="텍스트" placeholder="일반 텍스트 입력" />

            <Input
              type="email"
              label="이메일"
              placeholder="email@example.com"
            />

            <Input type="password" label="비밀번호" placeholder="••••••••" />

            <Input type="number" label="숫자" placeholder="123" />

            <Input type="tel" label="전화번호" placeholder="010-1234-5678" />

            <Input
              type="url"
              label="웹사이트"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 HTML input 타입을 지원합니다.",
      },
    },
  },
};

// 6. Input with Helper Text 스토리
export const InputWithHelperText: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">도움말과 함께</h3>
          <div className="space-y-4">
            <Input
              label="사용자명"
              placeholder="username"
              helperText="영문, 숫자, 언더스코어만 사용 가능합니다"
            />

            <Input
              label="이메일"
              type="email"
              placeholder="your@email.com"
              helperText="로그인과 알림 수신에 사용됩니다"
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              helperText="최소 8자 이상, 영문과 숫자를 포함해주세요"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "입력 필드에 도움말 텍스트를 추가할 수 있습니다.",
      },
    },
  },
};

// 7. Interactive Example 스토리
export const InteractiveExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (name: string, value: string) => {
      switch (name) {
        case "name":
          return value.length < 2 ? "이름은 2자 이상 입력해주세요" : "";
        case "email":
          return !/\S+@\S+\.\S+/.test(value)
            ? "올바른 이메일을 입력해주세요"
            : "";
        case "password":
          return value.length < 6 ? "비밀번호는 6자 이상 입력해주세요" : "";
        default:
          return "";
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // 실시간 검증
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const isValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value !== "");

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">실시간 검증 폼</h3>
          <div className="space-y-4">
            <Input
              name="name"
              label="이름"
              placeholder="홍길동"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              name="email"
              type="email"
              label="이메일"
              placeholder="hong@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              name="password"
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isValid
                  ? "bg-blockie-yellow text-neutral-black hover:shadow-md hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              {isValid ? "가입하기" : "모든 필드를 올바르게 입력해주세요"}
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "실시간 검증 기능이 포함된 인터랙티브 폼 예시입니다.",
      },
    },
  },
};

// 8. Playground (모든 props 조합 테스트용)
export const Playground: Story = {
  args: {
    label: "플레이그라운드",
    placeholder: "다양한 옵션을 테스트해보세요",
    helperText: "아래 Controls에서 다양한 옵션을 변경해보세요",
    size: "md",
    variant: "default",
    type: "text",
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 Input 속성을 자유롭게 테스트할 수 있는 플레이그라운드입니다. 하단의 Controls 패널에서 다양한 속성을 변경해보세요.",
      },
    },
  },
};
