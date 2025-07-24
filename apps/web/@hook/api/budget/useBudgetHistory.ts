import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@type/user";
import { userService } from "@utils/apis/services/user";
import { queryKeys } from "@utils/query/query.key";

export const useBudgetHistory = (months = 6) => {
  return useQuery({
    queryKey: queryKeys.user.budgetHistory(months),
    queryFn: () => userService.getBudgetHistory(months),
    select: (response) => response,
    staleTime: 10 * 60 * 1000, // 10분
  });
};
