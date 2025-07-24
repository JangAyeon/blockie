"use client";

import {
  MyPageLoading,
  MyPageError,
  HeroSection,
  ProfileForm,
} from "@component/features/user";
import { useMyPage } from "@hook/api/user/useMyPage";
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
  if (hasError || !isSuccess) return <MyPageError errors={errors} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
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
