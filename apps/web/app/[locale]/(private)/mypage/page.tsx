"use client";

import ErrorCard from "@component/common/error.card";
import {
  MyPageLoading,
  HeroSection,
  ProfileForm,
} from "@component/features/user";
import { useMyPage } from "@hook/business/mypage/useMyPage";
import { useUserEmotion } from "@hook/business/mypage/useUserEmotion";

// 메인 컴포넌트
export default function MyPage() {
  const {
    profile,
    budgetHistory,
    recentExpenses,
    isLoading,
    hasError,
    errors,
    isSuccess,
  } = useMyPage();
  const emotion = useUserEmotion(budgetHistory.data);

  if (isLoading) return <MyPageLoading />;
  if (hasError || !isSuccess) return <ErrorCard errors={errors} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-1 py-8">
        <HeroSection
          user={profile.data!}
          budgetHistory={budgetHistory.data!}
          recentExpenses={recentExpenses.data || []}
          emotion={emotion}
        />

        <ProfileForm user={profile.data!} />
      </main>
    </div>
  );
}
