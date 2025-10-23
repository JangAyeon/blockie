import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  cn,
  getButtonVariantStyle,
  getButtonSizeStyle,
  createInlineStyle,
  type ButtonVariant,
  type ButtonSize,
} from "../../utils/styles";

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
  <svg
    className={cn("animate-spin", className)}
    fill="none"
    viewBox="0 0 24 24"
  >
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

// 내장 아이콘 export
export {
  PlusIcon,
  LoadingIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
  HeartIcon,
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animated?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animated = true,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyle = getButtonVariantStyle(variant);
    const sizeClasses = getButtonSizeStyle(size);

    const buttonClasses = cn(
      "btn-base",
      variantStyle.className,
      sizeClasses,
      fullWidth && "w-full",
      (disabled || isLoading) && "opacity-50 cursor-not-allowed",
      animated && "hover-lift",
      className
    );

    const inlineStyle = createInlineStyle(
      variantStyle.backgroundColor,
      variantStyle.color,
      variantStyle.borderColor,
      style
    );

    // 아이콘 크기를 버튼 사이즈에 맞게 조정
    const getIconSize = () => {
      switch (size) {
        case "xs":
          return "w-3 h-3";
        case "sm":
          return "w-4 h-4";
        case "md":
          return "w-4 h-4";
        case "lg":
          return "w-5 h-5";
        case "xl":
          return "w-6 h-6";
        default:
          return "w-4 h-4";
      }
    };

    const iconSize = getIconSize();
    const ButtonComponent = (
      animated ? motion.button : "button"
    ) as React.ElementType;
    const motionProps = animated
      ? {
          whileHover: !disabled && !isLoading ? { y: -2 } : undefined,
          whileTap: !disabled && !isLoading ? { scale: 0.95 } : undefined,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
            duration: 0.2,
          },
        }
      : {};

    return (
      <ButtonComponent
        ref={ref}
        className={buttonClasses}
        style={inlineStyle}
        disabled={disabled || isLoading}
        {...(animated ? motionProps : {})}
        {...props}
      >
        {isLoading ? (
          <LoadingIcon className={iconSize} />
        ) : (
          leftIcon && <span className={iconSize}>{leftIcon}</span>
        )}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className={iconSize}>{rightIcon}</span>
        )}
      </ButtonComponent>
    );
  }
);

Button.displayName = "Button";
