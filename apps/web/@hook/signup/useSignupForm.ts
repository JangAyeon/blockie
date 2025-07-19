"use client";
import { useState, ChangeEvent } from "react";

import { validateForm } from "@utils/auth";
import { useSignUp } from "@hook/useAuth";
import { UseSignupFormReturn, SignupFormData, FormErrors } from "@type/auth";

export function useSignupForm(): UseSignupFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate: signUp, isPending, error } = useSignUp();
  // 폼 데이터 업데이트
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validateAllFields = (): boolean => {
    const emailError = validateForm.email(formData.email);
    const passwordError = validateForm.password(formData.password);
    const confirmPasswordError = validateForm.confirmPassword(
      formData.password,
      formData.confirmPassword
    );

    const newErrors: FormErrors = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    console.log("validateAllFields", newErrors);
    return Object.values(newErrors).length === 0;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateAllFields()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      // 유틸리티 함수를 사용한 API 호출
      const { email, password } = formData;
      signUp({ email, password });

      console.log("회원가입 성공:", { email, password });
    } catch (e) {
      console.error("회원가입 실패:", error);
      setErrors({
        general:
          error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,

    handleChange,
    handleSubmit,
    errors,
  };
}
