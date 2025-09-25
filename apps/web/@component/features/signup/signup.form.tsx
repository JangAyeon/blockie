import { useSignupForm } from "@hook/business/signup/useSignupForm";
import { Button, Input } from "@repo/ui";
import { useTranslations } from "next-intl";
interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const {
    // step,
    formData,
    // totalSteps,
    isLoading,
    handleChange,
    handleSubmit,
    errors,
    // handleSelectConsumptionType,
    // toggleCategory,
    // formatCurrency,
    // handleBudgetChange,
    // handleNext,
    // handleBack,
  } = useSignupForm();
  const t = useTranslations();
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label={t("email.label")}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          size="lg"
          error={errors.email}
          required
        />

        <Input
          label={t("password.label")}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t("password.placeholder")}
          size="lg"
          error={errors.password}
          required
        />

        <Input
          label={t("password.confirm")}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={t("password.placeholder")}
          size="lg"
          error={errors.confirmPassword}
          required
        />
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isLoading}
        className="h-14 text-button"
      >
        {isLoading ? t("signUp.loading") : t("signUp.label")}
      </Button>
    </form>
  );
};

export default SignupForm;
