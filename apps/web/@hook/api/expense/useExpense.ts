import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { YearMonthProps } from "@type/date";
import {
  DeleteExpenseItem,
  getAnalysisProps,
  SpendingAnalysisResponse,
  UpsertExpenseItem,
} from "@type/expense";
import { expenseService } from "@utils/apis/services/expense";
import { userService } from "@utils/apis/services/user";
import { queryKeys } from "@utils/query/query.key";

export const useRecentExpenses = (limit?: number) => {
  return useQuery({
    queryKey: queryKeys.user.recentExpenses(),
    queryFn: () => userService.getRecentExpenses(),
    select: (response) => {
      // 최신순 정렬 후 limit 개수만 반환
      const expenses = response;

      return limit
        ? expenses
            .sort(
              (a, b) =>
                new Date(b.expenseDate).getTime() -
                new Date(a.expenseDate).getTime()
            )
            .slice(0, limit)
        : expenses.sort(
            (a, b) =>
              new Date(b.expenseDate).getTime() -
              new Date(a.expenseDate).getTime()
          );
    },
    staleTime: 2 * 60 * 1000, // 2분
  });
};

export const useMonthlyExpenses = ({
  year,
  month,
  day,
}: {
  year: string;
  month: string;
  day: string;
}) => {
  return useQuery({
    queryKey: queryKeys.expense.monthly({ year, month, day }),
    queryFn: () => expenseService.getMonthlyStatus({ year, month, day }),
    select: (response) => {
      // 최신순 정렬 후 limit 개수만 반환
      const expenses = response;
      const sortedExpenses = expenses.expenses.sort(
        (a, b) =>
          new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
      );

      return { total: expenses.total, expenses: sortedExpenses };
    },
    staleTime: 2 * 60 * 1000, // 2분
  });
};

export const useExpensesCategory = ({ year, month }: YearMonthProps) => {
  return useQuery({
    queryKey: queryKeys.expense.category({
      year,
      month: month.padStart(2, "0"),
    }),
    queryFn: () => expenseService.getCategoryStatus({ year, month }),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useExpensesStreak = () => {
  return useQuery({
    queryKey: queryKeys.expense.streak(),
    queryFn: () => expenseService.getStreak(),
    select: (response) => response,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useDeleteExpenseItem = (options: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,

    showToast = true,
  } = options || {};

  return useMutation({
    mutationFn: (params: DeleteExpenseItem) =>
      expenseService.deleteExpenseItem(params),

    onSuccess: async (data, variables) => {
      // 관련된 쿼리들을 무효화하여 최신 데이터로 업데이트
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(queryKeys.expense.base[0]),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(queryKeys.budget.base[0]),
        refetchType: "all",
      });

      // 성공 토스트
      if (showToast) {
        // alert("지출 항목이 삭제되었습니다.");
      }

      // 커스텀 성공 콜백 실행
      onSuccess?.();
    },

    onError: (error, variables) => {
      // 에러 토스트
      if (showToast) {
        // alert("지출 항목 삭제에 실패했습니다.");
      }

      // 커스텀 에러 콜백 실행
      onError?.(error as Error);
    },
  });
};

export const useAddExpenseItem = (options: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,

    showToast = true,
  } = options || {};

  return useMutation({
    mutationFn: async (params: UpsertExpenseItem["data"]) =>
      await expenseService.addExpenseItem(params),

    onSuccess: async (data, variables) => {
      // 추가로 관련 쿼리들도 무효화 (필요시)
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(queryKeys.expense.base[0]),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(queryKeys.budget.base[0]),
        refetchType: "all",
      });
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.expense.streak(),
      // });
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.expense.category(YYMMDD),
      // });
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.expense.monthly(YYMMDD),
      // });
      // 성공 토스트
      if (showToast) {
        // alert("지출 항목이 추가되었습니다.");
      }

      // 커스텀 성공 콜백 실행
      onSuccess?.();
    },

    onError: (error, variables) => {
      // 에러 토스트
      if (showToast) {
        // alert("지출 항목 추가에 실패했습니다.");
      }

      // 커스텀 에러 콜백 실행
      onError?.(error as Error);
    },
  });
};

export const useEditExpenseItem = (options: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,

    showToast = true,
  } = options || {};

  return useMutation({
    mutationFn: async (params: UpsertExpenseItem) =>
      await expenseService.updateExpenseItem(params),

    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(queryKeys.expense.base[0]),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(queryKeys.budget.base[0]),
        refetchType: "all",
      });

      // 성공 토스트
      if (showToast) {
        // alert("지출 항목이 수정 되었습니다.");
      }

      // 커스텀 성공 콜백 실행
      onSuccess?.();
    },

    onError: (error, variables) => {
      // 에러 토스트
      if (showToast) {
        // alert("지출 항목 수정에 실패했습니다.");
      }

      // 커스텀 에러 콜백 실행
      onError?.(error as Error);
    },
  });
};
export const usePeriodExpensesAnalysis = ({
  period = "monthly",
  months = "6",
  ...options
}: getAnalysisProps) => {
  const params = {
    ...options,
    period,
    months,
  };
  // console.log("zzz", params);
  return useQuery({
    queryKey: queryKeys.expense.analysis(params),
    queryFn: () => expenseService.getAnalysis(params),
    select: (response: SpendingAnalysisResponse) => response,
    staleTime: 3 * 60 * 1000, // 기간별 분석은 좀 더 자주 업데이트
    gcTime: 10 * 60 * 1000,
  });
};
