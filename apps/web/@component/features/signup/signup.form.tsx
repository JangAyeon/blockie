import { useSignupForm } from "@hook/business/signup/useSignupForm";
import { Button, Input } from "@repo/ui";
interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = ({}) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="이메일"
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
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          size="lg"
          error={errors.password}
          required
        />

        <Input
          label="비밀번호"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
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
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
