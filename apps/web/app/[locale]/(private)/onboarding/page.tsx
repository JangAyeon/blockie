"use client";

import ContentProgress from "@component/features/onboarding/contentProgress";
import ContentSection from "@component/features/onboarding/contentSection";
import { Suspense } from "react";

export default function OnboardingPage() {
  // const [currentStep, setCurrentStep] = useState<number>(0);
  // const {
  //   currentStep,
  //   setCurrentStep,
  //   goToNext,
  //   goToPrevious,
  //   goToStep,
  //   canGoBack,
  //   canGoNext,
  // } = useOnboardingNavigation();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      <div className="flex flex-col justify-between w-full h-full">
        <ContentProgress />
        <Suspense>
          {" "}
          <ContentSection />
        </Suspense>
      </div>
    </div>
  );
}
