import { OnboardingSlides } from "@constant/onboarding";
import { useProgressStepStore } from "@store/useProgressStepStore";
import { ContentProgressProps } from "@type/onboarding";

const ContentProgress = () => {
  const { currentStep } = useProgressStepStore();
  const progressPercentage =
    (currentStep / (OnboardingSlides.length - 1)) * 100;
  const currentSlideData = OnboardingSlides[currentStep];
  const activeBgColor = currentSlideData?.backgroundColor ?? "bg-blockie-green";
  return (
    <div className="w-full">
      {/* 프로그레스 바 */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${activeBgColor}`}
          style={{
            width: `${progressPercentage}%`,
            // backgroundColor: "bg-blockie-green",
          }}
        ></div>
      </div>

      {/* 단계 라벨 */}
      <div className="flex justify-between text-xs mt-2 ">
        {OnboardingSlides.map((item, index) => (
          <span
            key={index}
            className={`font-medium ${
              index === currentStep
                ? "text-black"
                : index < currentStep
                  ? "text-neutral-medium-gray"
                  : "text-neutral-light-gray"
            }`}
          >
            {item.stepName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContentProgress;
