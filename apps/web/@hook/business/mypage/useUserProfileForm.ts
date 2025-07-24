import { useUpdateMyProfile } from "@hook/api/user/useUser";
import { User } from "@type/user";
import { useState } from "react";

type ProfileFormData = Pick<User, "name" | "email" | "phone">;

export const useProfileForm = (initialData: ProfileFormData) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(initialData);

  const updateMutation = useUpdateMyProfile();

  // 폼 데이터 업데이트
  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 폼 제출
  const handleSubmit = async () => {
    try {
      await updateMutation.mutateAsync(formData);
      setEditMode(false);
      return { success: true };
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      return { success: false, error };
    }
  };

  // 편집 취소
  const handleCancel = () => {
    setFormData(initialData);
    setEditMode(false);
  };

  // 편집 모드 시작
  const startEditing = () => {
    setFormData(initialData);
    setEditMode(true);
  };

  // 폼이 변경되었는지 확인
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return {
    // 상태
    editMode,
    formData,
    hasChanges,
    isSubmitting: updateMutation.isPending,

    // 액션
    updateField,
    handleSubmit,
    handleCancel,
    startEditing,
  };
};
