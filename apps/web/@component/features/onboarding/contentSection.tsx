import ButtonContainer from "./buttonContainer";
import ContentContainer from "./contentContainer";
import { OnboardingSlides } from "@constant/onboarding";
// import { useUserProfile, useUpdateUserProfile } from "@hook/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import { useUpsertBudget } from "@hook/useBudget";
import { useOnboardingForm } from "@hook/business/onboarding/useOnboardingForm";
import { useProgressStepStore } from "@store/useProgressStepStore";
import { useMyProfile, useUpdateMyProfile } from "@hook/api/user/useUser";
import { pageUrl } from "@constant/page.route";

const ContentSection = () => {
  const { currentStep, setCurrentStep, goToNext, goToPrevious } =
    useProgressStepStore();
  const { formData, handleInputChange, handlePhoneChange, handleBudgetChange } =
    useOnboardingForm();
  //   const [formData, setFormData] = useState<FormData>({
  //     name: "",
  //     phone: "",
  //     monthlyBudget: "500000",
  //   });
  const { data, isLoading, isError } = useMyProfile();
  const updateMutation = useUpdateMyProfile();
  const searchParams = useSearchParams();
  const router = useRouter();
  // year, month 가져오기 (없으면 기본값은 오늘 기준)
  const today = new Date();
  const year = parseInt(
    searchParams.get("year") ?? today.getFullYear().toString()
  );
  const month = parseInt(
    searchParams.get("month") ?? (today.getMonth() + 1).toString()
  );
  const budgetMutation = useUpsertBudget(year, month);
  //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const rawValue = e.target.value.replace(/,/g, "");
  //     setFormData((prev) => ({ ...prev, monthlyBudget: rawValue }));
  //   };

  //   const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const formatted = formatPhoneNumber(e.target.value);
  //     setFormData((prev) => ({ ...prev, phone: formatted }));
  //   };

  const handleNext = async () => {
    const nextStep = currentStep + 1;
    console.log(data, formData);

    if (nextStep === OnboardingSlides.length) {
      if (!data?.email) return;
      const { phone, name, monthlyBudget } = formData;
      const userInfoForm = { phone, name, email: data!.email };

      try {
        const res = await Promise.all([
          updateMutation.mutate(userInfoForm),
          budgetMutation.mutate(Number(monthlyBudget)),
        ]);
        console.log(res);
      } catch (err) {
        console.error("업데이트 중 에러", err);
      }
      alert(
        `환영합니다! Blockie와 함께 시작해보세요 🎉 ${{ ...formData, email: data?.email }}`
      );
      router.push(`${pageUrl.mypage}`);
    } else {
      goToNext();
    }
  };

  const handleBack = () => {
    goToPrevious();
  };

  //   const canGoBack = currentStep > 0;
  return (
    <>
      <ContentContainer
        // currentStep={currentStep}
        formData={formData}
        handleInputChange={handleInputChange}
        handlePhoneChange={handlePhoneChange}
        handleBudgetChange={handleBudgetChange}
      />
      <ButtonContainer
        // currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </>
  );
};

export default ContentSection;
