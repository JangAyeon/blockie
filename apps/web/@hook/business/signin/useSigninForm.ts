"use client";
import { useState, useEffect } from "react";
import { validateForm, emailStorage } from "@utils/auth";
import { useSignIn } from "@hook/useAuth";
import { UseSigninFormReturn, SigninFormData, FormErrors } from "@type/auth";
import { pageUrl } from "@constant/page.route";
import { useRouter } from "@i18n/navigation";

const FORM_DATA_INIT: SigninFormData = {
  email: "",
  password: "",
  rememberEmail: false,
};
const ERRORS_INIT: FormErrors = {
  account: "",
  email: "",
  password: "",
};

export function useSigninForm(): UseSigninFormReturn {
  const {
    mutate: signIn,
    isPending: isSigninPending,
    isError: isSigninError,
    error,
  } = useSignIn();
  const [isRouting, setIsRouting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<SigninFormData>(FORM_DATA_INIT);
  const [errors, setErrors] = useState<FormErrors>(ERRORS_INIT);

  // 컴포넌트 마운트 시 저장된 이메일 불러오기
  useEffect(() => {
    const { isEnabled, email } = emailStorage.get();

    if (isEnabled && email) {
      const newFormData = {
        ...formData,
        email,
        rememberEmail: true,
      };
      setFormData(newFormData);
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

    const newFormData = {
      ...formData,
      [name]: nextValue,
    };
    setFormData(newFormData);

    // 실시간 유효성 검사 및 에러 클리어

    if (errors[name as keyof FormErrors] || errors.account) {
      const newErrors = { ...errors, account: "" };
      setErrors({ ...newErrors, [name]: "" });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateAllFields()) {
      return;
    }

    setErrors(ERRORS_INIT);

    try {
      // 유틸리티 함수를 사용한 API 호출
      const { email, password } = formData;
      signIn(
        { email, password },
        {
          onSuccess: () => {
            setIsRouting(true); // 라우팅 시작 → 버튼 계속 disabled 유지
            router.push(`${pageUrl.cube}`); // 로그인 후 cube
          },
          onError: (err) => {
            // alert("로그인 실패: " + err.message);
            setErrors({
              account: "로그인에 실패했습니다.",
            });
          },
        }
      );

      // 이메일 기억하기 설정 처리
      if (formData.rememberEmail) {
        emailStorage.save(formData.email);
      } else {
        emailStorage.remove();
      }

      console.log("로그인 성공:");
    } catch (e) {
      console.error("로그인 실패:", error);
    }
  };

  return {
    formData,
    errors,
    isLoading: isSigninPending || isRouting,
    handleInputChange,
    handleSubmit,
  };
}
