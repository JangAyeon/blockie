import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@type/user";
import { userService } from "@utils/apis/services/user";
import { queryKeys } from "@utils/query/query.key";

// 내 프로필 조회
export const useMyProfile = () => {
  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: () => userService.getMyProfile(),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 프로필 업데이트 (옵티미스틱 업데이트 포함)
export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateMyProfile,
    onMutate: async (newData) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: queryKeys.user.profile() });

      // 이전 데이터 백업
      const previousData = queryClient.getQueryData<User>(
        queryKeys.user.profile()
      );

      // 옵티미스틱 업데이트
      if (previousData) {
        queryClient.setQueryData<User>(queryKeys.user.profile(), {
          ...previousData,
          ...newData,
        });
      }

      return { previousData };
    },
    onError: (err, newData, context) => {
      // 에러 시 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.user.profile(),
          context.previousData
        );
      }
    },
    onSuccess: (response) => {
      // 성공 시 서버 응답으로 업데이트
      queryClient.setQueryData(queryKeys.user.profile(), response);
    },
    onSettled: () => {
      // 항상 쿼리 무효화로 최신 상태 보장
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
    },
  });
};
