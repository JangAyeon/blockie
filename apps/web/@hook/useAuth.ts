// hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut } from "../@utils/apis/auth";
import { queryFns, queryKeys } from "../@utils/query/query.control";
import { fetchUserProfile, updateUserProfile } from "../@utils/apis/user";
import { userFormData } from "../@component/UserProfile";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const {
  //   mutate: handleLogout,
  //   isPending,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: queryFns.auth.signOut,
  //   onSuccess: () => {
  //     // 캐시 제거
  //     queryClient.removeQueries({ queryKey: queryKeys.auth.base });

  //     // 홈으로 이동
  //     router.replace("/");
  //   },
  //   onError: (error) => {
  //     console.error("로그아웃 실패", error);
  //   },
  // });

  // return { handleLogout, isPending, isError, error };

  return useMutation({
    mutationFn: queryFns.auth.signOut,
    onSuccess: () => {
      // 캐시 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.base });

      // 홈으로 이동
      router.replace("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: queryFns.auth.signUp,
    onSuccess: () => {
      router.replace("/mypage"); // 회원가입 후 마이페이지로 이동
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
      router.replace("/mypage"); // 회원가입 후 마이페이지로 이동
    },
    onError: (err) => {
      console.error("로그인 실패", err);
    },
  });
};

export const useUserProfile = () => {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: queryKeys.user.base,
  //   queryFn: () => fetchUserProfile(""),
  //   staleTime: 1000 * 60 * 5,
  // });
  return useQuery({
    queryKey: queryKeys.user.base,
    queryFn: () => fetchUserProfile(""),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: userFormData) => updateUserProfile(newData),
    onSuccess: (updatedData) => {
      // 캐시 수동 업데이트 (더 깔끔)
      queryClient.setQueryData(queryKeys.user.base, updatedData);
      alert("저장되었습니다!");
    },
    onError: () => {
      alert("저장 실패");
    },
  });
};
