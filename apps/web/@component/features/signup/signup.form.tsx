"use client";

import { useState } from "react";
import { useSignupForm } from "@hook/business/signup/useSignupForm";
import { Button, Input } from "@repo/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";
import EyeIconSwitcher from "@component/common/eye.switcher";

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    errors,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
  } = useSignupForm();
  const t = useTranslations();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 계정 오류 에러 메시지 (서버 api 에러 메시지) */}
      {errors.account && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{errors.account}</p>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label={t("email.label")}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          size="lg"
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            label={t("password.label")}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("password.placeholder")}
            size="lg"
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("password")}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIconSwitcher show={showPassword} />
          </button>
        </div>

        <div className="relative">
          <Input
            label={t("password.confirm")}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={t("password.placeholder")}
            size="lg"
            error={errors.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("confirmPassword")}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            <EyeIconSwitcher show={showConfirmPassword} />
          </button>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isLoading}
        disabled={Object.values(errors).join("").length > 0}
        className="h-14 text-button"
      >
        {isLoading ? t("signUp.loading") : t("signUp.label")}
      </Button>
    </form>
  );
};

export default SignupForm;
