// stores/onboardingNavigationStore.ts
import { OnboardingSlides } from "@constant/onboarding";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ProgressStepnState {
  // State
  currentStep: number;

  // Actions
  setCurrentStep: (step: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToStep: (step: number) => void;
  resetNavigation: () => void;

  // Computed getters (함수형으로 항상 최신 값 반환)
  canGoBack: () => boolean;
  canGoNext: () => boolean;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;

  // 추가 유틸리티
  getTotalSteps: () => number;
  getProgressPercentage: () => number;
}

export const useProgressStepStore = create<ProgressStepnState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentStep: 0,

      // Basic setter (원본 훅의 setCurrentStep과 동일)
      setCurrentStep: (step: number) =>
        set({ currentStep: step }, false, "setCurrentStep"),

      // Navigation actions
      goToNext: () =>
        set(
          (state) => ({
            currentStep: Math.min(
              state.currentStep + 1,
              OnboardingSlides.length - 1
            ),
          }),
          false,
          "goToNext"
        ),

      goToPrevious: () =>
        set(
          (state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
          }),
          false,
          "goToPrevious"
        ),

      goToStep: (step: number) => {
        // 원본 훅과 동일한 validation 로직
        if (step >= 0 && step < OnboardingSlides.length) {
          set({ currentStep: step }, false, "goToStep");
        }
      },

      resetNavigation: () => set({ currentStep: 0 }, false, "resetNavigation"),

      // Computed values (getter 함수로 구현하여 항상 최신 상태 반영)
      canGoBack: () => get().currentStep > 0,

      canGoNext: () => get().currentStep < OnboardingSlides.length - 1,

      isFirstStep: () => get().currentStep === 0,

      isLastStep: () => get().currentStep === OnboardingSlides.length - 1,

      getTotalSteps: () => OnboardingSlides.length,

      getProgressPercentage: () => {
        const { currentStep } = get();
        return OnboardingSlides.length > 1
          ? (currentStep / (OnboardingSlides.length - 1)) * 100
          : 0;
      },
    }),
    {
      name: "onboarding-navigation-store", // Redux DevTools에서 보이는 이름
    }
  )
);
