import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface FormData {
  name: string;
  phone: string;
  monthlyBudget: string;
}
export interface ContentProgressProps {
  // steps: string[];
  currentStep: number;
}
export interface BlockieSlide {
  title: string;
  stepName: string;
  description: string;
  backgroundColor: string;
  buttonColor: string;
  emotion: Emotion;
}

export interface ContentSectionProps {
  // currentStep: number;
  // setCurrentStep: Dispatch<SetStateAction<number>>;
  // formData: FormData;
  // handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // handleBudgetChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // formatCurrency: (value: string) => string;
  // handleNext: () => void;
  // handleBack: () => void;
}

export interface ContentContainerProps {
  // currentStep: number;
  formData: FormData;
  // handleNext: () => void;
  // handleBack: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBudgetChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // formatCurrency: (value: string) => string;
  // setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface ButtonContainerProps {
  // currentStep: number;
  // setCurrentStep: Dispatch<SetStateAction<number>>;
  // canGoBack: boolean;
  handleNext: () => void;
  handleBack: () => void;
}

export type Emotion = "happy" | "neutral" | "sad";
