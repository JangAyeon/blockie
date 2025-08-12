import { ChangeEvent } from "react";

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

export interface ContentContainerProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBudgetChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonContainerProps {
  handleNext: () => void;
  handleBack: () => void;
}

export type Emotion = "happy" | "neutral" | "sad";
