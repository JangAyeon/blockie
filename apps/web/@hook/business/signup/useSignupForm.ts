"use client";
import { useState, ChangeEvent, FormEvent } from "react";

import { validateForm } from "@utils/auth";
import { useSignUp } from "@hook/useAuth";
import { UseSignupFormReturn, SignupFormData, FormErrors } from "@type/auth";
import { pageUrl } from "@constant/page.route";
import { useRouter } from "@i18n/navigation";

const FORM_DATA_INIT: SignupFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const ERRORS_INIT: FormErrors = {
  email: "",
  password: "",
  confirmPassword: "",
  account: "",
};

export function useSignupForm(): UseSignupFormReturn {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>(ERRORS_INIT);
  const [formData, setFormData] = useState<SignupFormData>(FORM_DATA_INIT);
  const { mutate: signUp, isPending, error } = useSignUp();
  const [isRouting, setIsRouting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // 폼 데이터 업데이트
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // 실시간 에러 클리어
    if (errors[name as keyof FormErrors] || errors.account) {
      setErrors({ ...ERRORS_INIT });
    }
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateAllFields()) {
      return;
    }

    try {
      // 유틸리티 함수를 사용한 API 호출
      const { email, password } = formData;
      console.log("handleSubmit", email, password);

      signUp(
        { email, password },
        {
          onSuccess: () => {
            setIsRouting(true); // 라우팅 시작 → 버튼 계속 disabled 유지
            router.push(`${pageUrl.onboarding}`); // 회원가입 후 마이페이지로 이동
          },
          onError: (err) => {
            setErrors({
              account: "회원가입에 실패했습니다.",
            });
          },
        }
      );

      console.log("회원가입 성공:", { email, password });
    } catch (e) {
      console.error("회원가입 실패:", error);
    }
  };

  const toggleShowPassword = (type: "password" | "confirmPassword") => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return {
    formData,
    isLoading: isPending || isRouting,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    errors,
    toggleShowPassword,
  };
}
