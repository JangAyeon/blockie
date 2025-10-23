import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Blockie 브랜드 색상 타입
export type BlockieColor =
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";
export type FunctionalColor = "success" | "warning" | "error" | "info";
export type NeutralColor =
  | "black"
  | "dark-gray"
  | "medium-gray"
  | "light-gray"
  | "off-white";

// 버튼 variant 타입
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "warning"
  | "error";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// CSS 변수를 사용한 색상 매핑
const colorVariables = {
  // Blockie 브랜드 색상
  yellow: "var(--color-blockie-yellow)",
  green: "var(--color-blockie-green)",
  blue: "var(--color-blockie-blue)",
  purple: "var(--color-blockie-purple)",
  pink: "var(--color-blockie-pink)",
  red: "var(--color-blockie-red)",

  // 기능 색상
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  info: "var(--color-info)",

  // 중립 색상
  black: "var(--color-neutral-black)",
  "dark-gray": "var(--color-neutral-dark-gray)",
  "medium-gray": "var(--color-neutral-medium-gray)",
  "light-gray": "var(--color-neutral-light-gray)",
  "off-white": "var(--color-neutral-off-white)",
};

// 색상 CSS 변수 가져오기
export const getColorVar = (
  color: BlockieColor | FunctionalColor | NeutralColor
) => {
  return colorVariables[color];
};
type ButtonStyle = {
  backgroundColor: string;
  color: string;
  borderColor?: string;
  className: string;
};
// 버튼 variant 스타일 생성
export const getButtonVariantStyle = (variant: ButtonVariant): ButtonStyle => {
  const styles = {
    primary: {
      backgroundColor: getColorVar("yellow"),
      color: getColorVar("black"),
      className: "hover:opacity-90 active:opacity-80",
    },
    secondary: {
      backgroundColor: getColorVar("off-white"),
      color: getColorVar("dark-gray"),
      className: "border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
    },
    outline: {
      backgroundColor: "transparent",
      color: getColorVar("yellow"),
      borderColor: getColorVar("yellow"),
      className: "border-2 hover:bg-yellow-50 active:bg-yellow-100",
    },
    ghost: {
      backgroundColor: "transparent",
      color: getColorVar("dark-gray"),
      className: "hover:bg-gray-100 active:bg-gray-200",
    },
    success: {
      backgroundColor: getColorVar("success"),
      color: "white",
      className: "hover:opacity-90 active:opacity-80",
    },
    warning: {
      backgroundColor: getColorVar("warning"),
      color: getColorVar("black"),
      className: "hover:opacity-90 active:opacity-80",
    },
    error: {
      backgroundColor: getColorVar("error"),
      color: "white",
      className: "hover:opacity-90 active:opacity-80",
    },
  };
  return styles[variant];
};

// 버튼 사이즈 스타일 생성
export const getButtonSizeStyle = (size: ButtonSize) => {
  const styles = {
    xs: "px-2 py-1 text-xs min-h-[24px]",
    sm: "px-3 py-1.5 text-sm min-h-[32px]",
    md: "px-4 py-2 text-base min-h-[40px]",
    lg: "px-6 py-3 text-lg min-h-[48px]",
    xl: "px-8 py-4 text-xl min-h-[56px]",
  };
  return styles[size];
};

// 인라인 스타일 생성 헬퍼
export const createInlineStyle = (
  backgroundColor?: string,
  color?: string,
  borderColor?: string,
  additional?: React.CSSProperties
) => {
  return {
    ...(backgroundColor && { backgroundColor }),
    ...(color && { color }),
    ...(borderColor && { borderColor }),
    ...additional,
  };
};
