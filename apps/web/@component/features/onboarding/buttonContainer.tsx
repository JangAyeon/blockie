import { OnboardingSlides } from "@constant/onboarding";
import { Button } from "@repo/ui";
import { useProgressStepStore } from "@store/useProgressStepStore";
import { ButtonContainerProps } from "@type/onboarding";

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  handleBack,
  handleNext,
}) => {
  const { currentStep, canGoBack } = useProgressStepStore();
  const prevSlideData = OnboardingSlides[currentStep - 1];
  const currentlideData = OnboardingSlides[currentStep];
  return (
    <>
      <div className="w-full space-x-6 flex flex-row items-end justify-between ">
        {canGoBack() && (
          <Button
            type="submit"
            fullWidth
            variant="outline"
            color={prevSlideData?.buttonColor}
            size="lg"
            loading={false}
            onClick={handleBack}
            className="text-button"
          >
            뒤로 가기
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          color={currentlideData?.buttonColor}
          loading={false}
          onClick={handleNext}
          className="text-button "
        >
          다음으로
        </Button>
      </div>
    </>
  );
};

export default ButtonContainer;
