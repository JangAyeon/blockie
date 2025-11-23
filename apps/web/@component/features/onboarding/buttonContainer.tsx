import { OnboardingSlides } from "@constant/onboarding";
import { Button } from "@repo/ui";
import { useProgressStepStore } from "@store/useProgressStepStore";
import { ButtonContainerProps } from "@type/onboarding";
import { useTranslations } from "next-intl";

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  handleBack,
  handleNext,
  isLoading,
}) => {
  const t = useTranslations();
  const { currentStep, canGoBack } = useProgressStepStore();
  const prevSlideData = OnboardingSlides[currentStep - 1];
  const currentlideData = OnboardingSlides[currentStep];
  return (
    <>
      <div className="w-full space-y-6 flex flex-col items-end justify-between ">
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
            {t("common.back")}
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          color={currentlideData?.buttonColor}
          loading={isLoading}
          onClick={handleNext}
          className="text-button "
          disabled={isLoading}
        >
          {isLoading
            ? t("common.loading")
            : currentStep === OnboardingSlides.length - 1
              ? t("common.save")
              : t("common.next")}
        </Button>
      </div>
    </>
  );
};

export default ButtonContainer;
