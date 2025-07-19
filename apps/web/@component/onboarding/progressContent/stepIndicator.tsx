import { OnboardingSlides } from "@constant/onboarding";
import { useProgressStepStore } from "@store/useProgressStepStore";

interface BlockieStepIndicatorProps {
  // currentStep: number;
  // onStepChange: (step: number) => void;
}

const StepIndicator: React.FC<BlockieStepIndicatorProps> = () => {
  const { currentStep, setCurrentStep, goToNext, goToPrevious } =
    useProgressStepStore();
  return (
    <div className="flex space-x-2">
      {OnboardingSlides.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentStep(index)}
          className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
            index === currentStep ? "w-6" : "w-2"
          } ${
            index === currentStep
              ? item.backgroundColor
              : "bg-neutral-light-gray"
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
