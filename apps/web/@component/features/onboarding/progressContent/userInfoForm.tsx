import { Input } from "@repo/ui";
import { FormData } from "@type/onboarding";
import { useTranslations } from "next-intl";

interface UserInfoFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  formData,
  onInputChange,
  onPhoneChange,
}) => {
  const t = useTranslations();
  return (
    <div className="text-left w-full mx-auto">
      <div className="space-y-4">
        <Input
          label={t("user.name")}
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder={t("user.name")}
          size="lg"
          required
        />

        <Input
          label={t("user.phone")}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onPhoneChange}
          placeholder={t("user.phonePlaceholder")}
          maxLength={13}
          size="lg"
          required
        />
      </div>
    </div>
  );
};

export default UserInfoForm;
