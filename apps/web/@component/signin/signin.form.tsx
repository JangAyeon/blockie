"use client";
import { useSigninForm } from "@hook/signin";
import { Button, Input } from "@repo/ui";
import { validateForm } from "@utils/auth";

const SigninForm = () => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useSigninForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 에러 메시지 */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="example@email.com"
          size="lg"
          error={errors.email}
          required
        />

        {/* <button
              type="button"
              className="text-sm text-gray-900 hover:text-gray-700 transition-colors"
            >
              비밀번호를 잊으셨나요?
            </button> */}

        <Input
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="비밀번호를 입력하세요"
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
            이메일 기억하기
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
        로그인
      </Button>
    </form>
  );
};

export default SigninForm;
