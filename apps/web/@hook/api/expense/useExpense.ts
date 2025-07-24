import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@type/user";
import { userService } from "@utils/apis/services/user";
import { queryKeys } from "@utils/query/query.key";

export const useExpenses = (limit = 4) => {
  return useQuery({
    queryKey: queryKeys.user.recentExpenses(),
    queryFn: () => userService.getRecentExpenses(),
    select: (response) => {
      // 최신순 정렬 후 limit 개수만 반환
      const expenses = response;

      return (
        expenses
          .sort(
            (a, b) =>
              new Date(b.expenseDate).getTime() -
              new Date(a.expenseDate).getTime()
          )
          .slice(0, limit) ?? []
      );
    },
    staleTime: 2 * 60 * 1000, // 2분
  });
};
