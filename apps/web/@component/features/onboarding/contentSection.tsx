import ButtonContainer from "./buttonContainer";
import ContentContainer from "./contentContainer";
import { OnboardingSlides } from "@constant/onboarding";
// import { useUserProfile, useUpdateUserProfile } from "@hook/useAuth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@i18n/navigation";
// import { useUpsertBudget } from "@hook/useBudget";
import { useOnboardingForm } from "@hook/business/onboarding/useOnboardingForm";
import { useProgressStepStore } from "@store/useProgressStepStore";
import { useMyProfile, useUpdateMyProfile } from "@hook/api/user/useUser";
import { pageUrl } from "@constant/page.route";
import { useUpdateBudget } from "@hook/api/budget/useBudget";
import { useState } from "react";

const ContentSection = () => {
  const { currentStep, setCurrentStep, goToNext, goToPrevious } =
    useProgressStepStore();
  const {
    formData,
    errorMsg,
    handleInputChange,
    handlePhoneChange,
    handleBudgetChange,
    setErrorMsg,
  } = useOnboardingForm();

  const { data, isLoading, isError } = useMyProfile();

  const updateMutation = useUpdateMyProfile();
  const searchParams = useSearchParams();
  const router = useRouter();
  // year, month 가져오기 (없으면 기본값은 오늘 기준)
  const today = new Date();
  const year = parseInt(
    searchParams.get("year") ?? today.getFullYear().toString()
  );
  const month = parseInt(
    searchParams.get("month") ?? (today.getMonth() + 1).toString()
  );
  const mutateBudget = useUpdateBudget({
    year: Number(year),
    month: Number(month),
  });

  const handleNext = async () => {
    const nextStep = currentStep + 1;
    console.log(data, formData);

    if (nextStep === OnboardingSlides.length) {
      if (!data?.email) return;
      const { phone, name, monthlyBudget } = formData;
      const userInfoForm = { phone, name, email: data!.email };

      try {
        const res = await Promise.all([
          updateMutation.mutate(userInfoForm),
          mutateBudget.mutateAsync({
            year: Number(year),
            month: Number(month),
            amount: Number(monthlyBudget),
          }),
        ]);
        console.log(res);
      } catch (err) {
        console.error("업데이트 중 에러", err);
      }
      // alert(`환영합니다! Blockie와 함께 시작해보세요 🎉`);
      router.push(`${pageUrl.cube}`);
    } else {
      if (currentStep == 3 && (!formData.name || !formData.phone)) {
        setErrorMsg("올바른 이름과 핸드폰 번호를 입력해주세요");
        return;
      } else if (currentStep == 4 && !formData.monthlyBudget) {
        setErrorMsg("올바른 예산을 설정 해주세요");
        return;
      }
      goToNext();
    }
  };

  const handleBack = () => {
    goToPrevious();
  };

  //   const canGoBack = currentStep > 0;
  return (
    <>
      <div>
        <ContentContainer
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
          handleBudgetChange={handleBudgetChange}
          errorMsg={errorMsg}
        />
      </div>

      <ButtonContainer
        isLoading={isLoading}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </>
  );
};

export default ContentSection;
