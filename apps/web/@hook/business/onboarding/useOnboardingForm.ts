import { useState, useCallback } from "react";
import { FormData } from "@type/onboarding";
import { formatPhoneNumber } from "@utils/onboarding/formatter";

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  monthlyBudget: "500000",
};

export const useOnboardingForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateFormData({ [name]: value });
    },
    [updateFormData]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      updateFormData({ phone: formatted });
    },
    [updateFormData]
  );

  const handleBudgetChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");
      updateFormData({ monthlyBudget: rawValue });
    },
    [updateFormData]
  );

  return {
    formData,
    updateFormData,
    handleInputChange,
    handlePhoneChange,
    handleBudgetChange,
  };
};
