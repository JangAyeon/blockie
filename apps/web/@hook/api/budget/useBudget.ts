import { BUDGET_ITEM_COUNT } from "@constant/budget";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetHistoryResponse, BudgetSummary } from "@type/budget";
import { budgetService } from "@utils/apis/services/budget";
import { getExpenseStateWithBudget } from "@utils/budget";
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
    select: (response) => ({
      ...response,
      ...getExpenseStateWithBudget(response.spent, response.budget),
    }),
    staleTime: 5 * 60 * 1000, // 5분
    enabled: Boolean(year && month),
  });
};

export const useBudgetHistory = (months = BUDGET_ITEM_COUNT) => {
  return useQuery({
    queryKey: queryKeys.user.budgetHistory(months),
    queryFn: () => budgetService.getBudgetHistory(months),
    select: (response) => response,
    staleTime: 10 * 60 * 1000, // 10분
    enabled: Boolean(months),
  });
};
export const useUpdateBudget = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: budgetService.updateBudget,
    onMutate: async (newData) => {
      // 진행 중인 쿼리 취소
      const { year, month, ...rest } = newData;
      const YYMM = {
        month: month.toString().padStart(2, "0"),
        year: year.toString(),
      };
      await queryClient.cancelQueries({
        queryKey: [queryKeys.budget.history(), queryKeys.budget.status(YYMM)],
      });

      // 이전 데이터 백업
      const previousStatusData = queryClient.getQueryData<BudgetSummary>(
        queryKeys.budget.status(YYMM)
      );

      const previousHistoryData =
        queryClient.getQueryData<BudgetHistoryResponse>(
          queryKeys.budget.history()
        );

      // 옵티미스틱 업데이트
      if (previousStatusData) {
        queryClient.setQueryData<BudgetSummary>(queryKeys.budget.status(YYMM), {
          ...previousStatusData,
          ...rest,
          year: String(year),
          month: String(month),
        });
      }
      if (previousHistoryData) {
        queryClient.setQueryData<BudgetHistoryResponse>(
          queryKeys.budget.history(),
          {
            ...previousHistoryData,
            ...rest,
          }
        );
      }
      return { previousStatusData, previousHistoryData };
    },
    onError: (err, newData, context) => {
      // 에러 시 롤백
      const YYMM = {
        month: month.toString().padStart(2, "0"),
        year: year.toString(),
      };
      if (context?.previousStatusData) {
        queryClient.setQueryData(
          queryKeys.budget.status(YYMM),
          context.previousStatusData
        );
      }
      if (context?.previousHistoryData) {
        queryClient.setQueryData(
          queryKeys.budget.history(),
          context.previousHistoryData
        );
      }
    },
    onSettled: (response) => {
      // 성공 시 서버 응답으로 업데이트

      const YYMM = {
        month: month.toString().padStart(2, "0"),
        year: year.toString(),
      };
      console.log("onSuccess", response, queryKeys.budget.status(YYMM));
      queryClient.invalidateQueries({ queryKey: queryKeys.budget.history() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.budget.status(YYMM),
      });
    },
  });
};
