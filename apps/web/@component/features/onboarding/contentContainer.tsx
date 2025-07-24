import { ContentContainerProps } from "@type/onboarding";

import BudgetForm from "./progressContent/budgetForm";
import UserInfoForm from "./progressContent/userInfoForm";
import StepIndicator from "./progressContent/stepIndicator";
import StepInfo from "./progressContent/stepInfo";
import { useProgressStepStore } from "@store/useProgressStepStore";

const ContentContainer = ({
  // currentStep,
  formData,
  handleInputChange,
  handlePhoneChange,
  handleBudgetChange,
  // setCurrentStep,
}: ContentContainerProps) => {
  const { currentStep, setCurrentStep, goToNext, goToPrevious } =
    useProgressStepStore();
  return (
    <section className="w-full flex flex-col items-center text-center flex-1 justify-start gap-10 py-8">
      <div className="flex flex-col justify-center items-center gap-3">
        {/* 아이콘 + 해당 단계 안내 텍스트 영역 */}
        <StepInfo />

        {/* Step Indicator */}
        <StepIndicator
        // currentStep={currentStep}
        // onStepChange={setCurrentStep}
        />
      </div>

      {/* 동적 콘텐츠 영역 - 고정 높이로 레이아웃 안정화 */}
      <div className="w-full flex-1 ">
        {currentStep === 3 && (
          <UserInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            onPhoneChange={handlePhoneChange}
          />
        )}

        {currentStep === 4 && (
          <BudgetForm formData={formData} onBudgetChange={handleBudgetChange} />
        )}
      </div>
    </section>
  );
};

export default ContentContainer;
