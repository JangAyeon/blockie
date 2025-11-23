// hooks/useLogout.ts
"use client";

import { useRouter } from "@i18n/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, signUp } from "../@utils/apis/auth";
import { queryFns, queryKeys } from "../@utils/query/query.key";
import { pageUrl } from "@constant/page.route";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: queryFns.auth.signOut,
    onSuccess: () => {
      // 캐시 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.base });

      // 홈으로 이동
      router.replace(`${pageUrl.root}`);
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push(`${pageUrl.onboarding}`); // 회원가입 후 마이페이지로 이동
    },
    onError: (err) => {
      console.error("회원가입 실패", err);
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      router.push(`${pageUrl.cube}`); // 로그인 후 cube
    },
    onError: (err) => {
      console.error("로그인 실패", err);
    },
  });
};

// export const useUserProfile = () => {
//   // const { data, isLoading, isError } = useQuery({
//   //   queryKey: queryKeys.user.base,
//   //   queryFn: () => fetchUserProfile(""),
//   //   staleTime: 1000 * 60 * 5,
//   // });
//   return useQuery({
//     queryKey: queryKeys.user.base,
//     queryFn: () => fetchUserProfile(""),
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const useUpdateUserProfile = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (newData: userFormData) => updateUserProfile(newData),
//     onSuccess: (updatedData) => {
//       // 캐시 수동 업데이트 (더 깔끔)
//       queryClient.setQueryData(queryKeys.user.base, updatedData);
//       alert("저장되었습니다!");
//     },
//     onError: () => {
//       alert("저장 실패");
//     },
//   });
// };
