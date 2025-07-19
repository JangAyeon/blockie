import { ChangeEvent, FormEvent } from "react";

export interface AuthTypeProps {
  type: "signin" | "signup";
}

export interface AuthContent {
  title: string;
  togoPageName: string;
  togoUrl: string;
  headerTitle: string;
  welcome: {
    title: string;
    subTitle: string;
  };
}
export type FormErrors = Record<string, string>;
/* signup */

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  //   name: string;
  //   monthlyBudget: string;
  //   consumptionType: "planned" | "impulse";
  //   mainCategories: Category[];
}

export interface UseSignupFormReturn {
  formData: SignupFormData;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  errors: FormErrors;
}

/* signin */

export interface SigninFormData {
  email: string;
  password: string;
  rememberEmail: boolean;
}
export interface UseSigninFormReturn {
  formData: SigninFormData;
  errors: Record<string, string>;
  isLoading: boolean;
  handleInputChange: (e: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface RememberEmailData {
  email: SigninFormData["email"];
  rememberMe: SigninFormData["rememberEmail"];
}
