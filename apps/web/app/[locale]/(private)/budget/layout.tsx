// app/budget/layout.tsx
// import { cookies } from "next/headers";

import HydrationProvider from "@provider/query/parallel.hydration";
import { queryKeys } from "@utils/query/query.key";
import { budgetService } from "@utils/apis/services/budget";
import { LayoutProps } from "@type/layout";
export default async function BudgetLayout({ children }: LayoutProps) {
  // const cookieStore = await cookies();
  // const access_token = cookieStore.get("access_token")?.value ?? null;

  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  // const day = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 맞추기 위해 padStart 사용

  // if (!access_token) {
  //   return <div>No access token</div>;
  // }
  const prefetchQueries = [
    {
      queryKey: queryKeys.budget.status({ year, month }),
      queryFn: () => budgetService.getBudgetStatus({ year, month }),
    },
  ];
  return (
    <HydrationProvider queries={prefetchQueries}>{children}</HydrationProvider>
  );
}
