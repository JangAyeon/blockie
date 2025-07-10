// src/components/Button.tsx
import React from "react";

// 내장 아이콘 컴포넌트들
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const LoadingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// 내장 아이콘 export
export {
  PlusIcon,
  LoadingIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
  HeartIcon,
  CheckIcon,
  AlertIcon,
  XIcon,
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 버튼 변형 */
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "error";
  /** 커스텀 색상 (CSS 변수명 또는 HEX) */
  color?:
    | "blockie-yellow"
    | "blockie-green"
    | "blockie-blue"
    | "blockie-purple"
    | "blockie-pink"
    | "blockie-red"
    | "blockie-red-light"
    | "neutral-black"
    | "neutral-dark-gray"
    | "success"
    | "warning"
    | "error"
    | "info"
    | string;
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Blockie 디자인 시스템의 기본 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" leftIcon={<PlusIcon />}>
 *   새로 만들기
 * </Button>
 *
 * // 커스텀 색상 사용
 * <Button variant="primary" color="blockie-green" rightIcon={<CheckIcon />}>
 *   완료
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      color,
      size = "md",
      leftIcon,
      rightIcon,
      fullWidth = false,
      loading = false,
      className = "",
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // 아이콘 크기를 버튼 사이즈에 맞게 조정
    const getIconSize = () => {
      switch (size) {
        case "sm":
          return "w-4 h-4";
        case "md":
          return "w-4 h-4";
        case "lg":
          return "w-5 h-5";
        default:
          return "w-4 h-4";
      }
    };

    // 색상이 지정된 경우 커스텀 스타일 생성
    const getCustomStyles = () => {
      if (!color) return {};

      const colorValue = color.startsWith("#")
        ? color
        : `var(--color-${color})`;

      switch (variant) {
        case "primary":
          return {
            backgroundColor: colorValue,
            color: getContrastColor(color),
            "--tw-ring-color": colorValue,
          };
        case "outline":
          return {
            borderColor: colorValue,
            color: colorValue,
            "--tw-ring-color": colorValue,
          };
        case "ghost":
          return {
            color: colorValue,
            "--tw-ring-color": colorValue,
          };
        default:
          return {};
      }
    };

    // 색상에 따른 대비 텍스트 색상 결정
    const getContrastColor = (colorName: string) => {
      const lightColors = [
        "blockie-yellow",
        "blockie-green",
        "blockie-pink",
        "blockie-red-light",
        "warning",
      ];
      const darkColors = [
        "blockie-blue",
        "blockie-purple",
        "blockie-red",
        "neutral-black",
        "neutral-dark-gray",
        "success",
        "error",
      ];

      if (lightColors.includes(colorName)) {
        return "var(--color-neutral-black)";
      } else if (darkColors.includes(colorName)) {
        return "white";
      }
      return "white"; // 기본값
    };

    const defaultVariantClasses = {
      primary: `
        bg-blockie-yellow text-neutral-black 
        hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-blockie-yellow focus:ring-offset-2
      `,
      secondary: `
        bg-white border border-gray-300 text-gray-700 
        hover:bg-gray-50 hover:shadow hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
      `,
      outline: `
        bg-transparent border-2 border-current
        hover:bg-current hover:bg-opacity-10 hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-current focus:ring-offset-2
      `,
      ghost: `
        bg-transparent 
        hover:bg-current hover:bg-opacity-10 hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-current focus:ring-offset-2
      `,
      success: `
        bg-success text-white 
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-success focus:ring-offset-2
      `,
      warning: `
        bg-warning text-neutral-black 
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-warning focus:ring-offset-2
      `,
      error: `
        bg-error text-white 
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-error focus:ring-offset-2
      `,
    };

    // color가 지정된 경우 기본 색상 클래스 제거
    const variantClasses = color
      ? {
          primary: `
        hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
          secondary: `
        bg-white border border-gray-300 
        hover:bg-gray-50 hover:shadow hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
      `,
          outline: `
        bg-transparent border-2 
        hover:bg-current hover:bg-opacity-10 hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
          ghost: `
        bg-transparent 
        hover:bg-current hover:bg-opacity-10 hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
          success: `
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
          warning: `
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
          error: `
        hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5 
        active:scale-95 
        focus:ring-2 focus:ring-offset-2
      `,
        }
      : defaultVariantClasses;

    const baseClasses = `
      btn-base
      inline-flex items-center justify-center gap-2
      font-medium rounded-lg 
      transition-all duration-200 
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `;

    const widthClasses = fullWidth ? "w-full" : "";
    const iconSize = getIconSize();

    const buttonClasses = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      widthClasses,
      className,
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const isDisabled = disabled || loading;
    const customStyles = { ...getCustomStyles(), ...style };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        style={customStyles}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <LoadingIcon className={`${iconSize} animate-spin`} />
        ) : (
          leftIcon && <span className={iconSize}>{leftIcon}</span>
        )}

        <span>{children}</span>

        {!loading && rightIcon && <span className={iconSize}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
