"use client";

import { useSigninForm } from "@hook/business/signin";
import { Button, Input } from "@repo/ui";
import { useTranslations } from "next-intl";

const SigninForm = () => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useSigninForm();
  const t = useTranslations();

  console.log("SigninForm", formData, errors, isLoading);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 에러 메시지 */}
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
          onChange={handleInputChange}
          placeholder="example@email.com"
          size="lg"
          error={errors.email}
          required
        />

        <Input
          label={t("password.label")}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={t("password.placeholder")}
          size="lg"
          error={errors.password}
          required
        />

        <div className="flex flex-row gap-0.5 items-center">
          <input
            type="checkbox"
            id="rememberEmail"
            name="rememberEmail"
            checked={formData.rememberEmail}
            onChange={handleInputChange}
            className="h-4 w-4 text-yellow-400 rounded border-gray-300 focus:ring-yellow-400"
          />
          <label
            htmlFor="rememberEmail"
            className="ml-2 text-body-2 text-neutral-dark-gray"
          >
            {t("email.remember")}
          </label>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isLoading}
        className="h-14 text-button"
      >
        {isLoading ? t("signIn.loading") : t("signIn.label")}
      </Button>
    </form>
  );
};

export default SigninForm;
