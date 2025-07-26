import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "@utils/apis/services/budget";
import { queryKeys } from "@utils/query/query.key";

export const useBudgetStatus = ({
  year,
  month,
}: {
  year: string;
  month: string;
}) => {
  return useQuery({
    queryKey: queryKeys.budget.status({ year, month }),
    queryFn: () => budgetService.getBudgetStatus({ year, month }),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
