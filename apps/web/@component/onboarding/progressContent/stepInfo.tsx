import { OnboardingSlides } from "@constant/onboarding";
import { BlockieFace } from "@repo/ui";
import { useProgressStepStore } from "@store/useProgressStepStore";
interface StepInfoProps {
  // currentStep: number;
}
const StepInfo: React.FC<StepInfoProps> = () => {
  const { currentStep, setCurrentStep, goToNext, goToPrevious } =
    useProgressStepStore();
  const currentSlideData = OnboardingSlides[currentStep];
  return (
    currentSlideData && (
      <div className="flex flex-col justify-center items-center gap-8">
        <BlockieFace size={120} emotion={currentSlideData.emotion} />
        {/* 텍스트 */}
        <div className="px-4 flex flex-col gap-2">
          <h1
            className="text-2xl sm:text-3xl font-bold  text-neutral-black"
            // style={{ color: colors.black }}
          >
            {currentSlideData.title}
          </h1>
          <p
            className={`text-base sm:text-lg text-neutral-dark-gray`}
            /*style={{ color: colors.darkGray }}*/
          >
            {currentSlideData.description}
          </p>
        </div>
      </div>
    )
  );
};

export default StepInfo;
