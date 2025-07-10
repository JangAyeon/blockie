// src/components/Input.tsx
import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 라벨 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  error?: string;
  /** 입력 필드 크기 */
  size?: "sm" | "md" | "lg";
  /** 입력 필드 스타일 변형 */
  variant?: "default" | "filled";
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Blockie 디자인 시스템의 기본 입력 컴포넌트
 *
 * @example
 * ```tsx
 * <Input
 *   label="이메일"
 *   type="email"
 *   placeholder="your@email.com"
 *   helperText="로그인에 사용됩니다"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      variant = "default",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    // 고유 ID 생성 (접근성을 위해)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
      default: "border border-gray-300 bg-white",
      filled: "border-0 bg-gray-100",
    };

    const baseClasses = `
      w-full rounded-lg font-sans transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blockie-yellow
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
      placeholder:text-gray-400
    `;

    const stateClasses = error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : variant === "default"
        ? "focus:border-blockie-yellow hover:border-gray-400"
        : "focus:bg-white";

    const inputClasses = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      className,
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={inputClasses}
          aria-describedby={
            helperText || error ? `${inputId}-description` : undefined
          }
          aria-invalid={!!error}
          {...props}
        />

        {(helperText || error) && (
          <p
            id={`${inputId}-description`}
            className={`text-sm mt-1 ${error ? "text-red-600" : "text-gray-600"}`}
            role={error ? "alert" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
