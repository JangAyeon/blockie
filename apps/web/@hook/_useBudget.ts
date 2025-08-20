// import { upsertBudget } from "../@utils/apis/budget";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useUpsertBudget = (year: number, month: number) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (formBudget: number) =>
//       upsertBudget({ year, month, amount: formBudget }),
//     onSuccess: (updated) => {
//       queryClient.invalidateQueries({ queryKey: ["budget", year, month] });
//       alert("예산이 저장되었습니다!");
//     },
//     onError: () => {
//       alert("예산 저장에 실패했습니다.");
//     },
//   });
// };
