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
  handleSubmit: (e: any) => Promise<void>;
}

export type FormErrors = Record<string, string>;

export interface RememberEmailData {
  email: SigninFormData["email"];
  rememberMe: SigninFormData["rememberEmail"];
}
