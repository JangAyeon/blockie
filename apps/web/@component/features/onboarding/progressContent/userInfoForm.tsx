import { Input } from "@repo/ui";
import { FormData } from "@type/onboarding";

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
  return (
    <div className="text-left w-full mx-auto">
      <div className="space-y-4">
        <Input
          label="이름"
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="이름을 입력해주세요"
          size="lg"
          required
        />

        <Input
          label="전화번호"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onPhoneChange}
          placeholder="010-0000-0000"
          maxLength={13}
          size="lg"
          required
          helperText="안전한 서비스 이용을 위해 필요해요"
        />
      </div>
    </div>
  );
};

export default UserInfoForm;
