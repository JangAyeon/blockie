"use client";
import { useState, useEffect } from "react";
import { validateForm, emailStorage } from "@utils/auth";

import { useSignIn } from "@hook/useAuth";
import { UseSigninFormReturn, SigninFormData, FormErrors } from "@type/auth";

export function useSigninForm(): UseSigninFormReturn {
  const {
    mutate,
    isPending: isSigninPending,
    isError: isSigninError,
    error,
  } = useSignIn();
  const [isLoading, setIsLoading] = useState(isSigninPending || false);

  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
    rememberEmail: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 컴포넌트 마운트 시 저장된 이메일 불러오기
  useEffect(() => {
    const { isEnabled, email } = emailStorage.get();

    if (isEnabled && email) {
      setFormData((prev) => ({
        ...prev,
        email,
        rememberEmail: true,
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const nextValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;
    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    // 실시간 유효성 검사 및 에러 클리어
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAllFields = (): boolean => {
    const emailError = validateForm.email(formData.email);
    const passwordError = validateForm.password(formData.password);

    const newErrors: FormErrors = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // 폼 유효성 검사
    if (!validateAllFields()) {
      return;
    }

    setErrors({});

    try {
      // 유틸리티 함수를 사용한 API 호출
      const { email, password } = formData;
      mutate({ email, password });

      // 이메일 기억하기 설정 처리
      if (formData.rememberEmail) {
        emailStorage.save(formData.email);
      } else {
        emailStorage.remove();
      }

      console.log("로그인 성공:");
    } catch (e) {
      console.error("로그인 실패:", error);
      setErrors({
        general:
          error instanceof Error ? error.message : "로그인에 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}
