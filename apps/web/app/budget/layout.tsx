// app/budget/layout.tsx
import { cookies } from "next/headers";

import { fetchBudgetStatus } from "../../@utils/apis/budget";
import HydrationProvider from "../../@provider/query/single.hydration";
export default async function BudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;

  const today = new Date();
  const year = parseInt(today.getFullYear().toString());
  const month = parseInt((today.getMonth() + 1).toString());

  if (!access_token) {
    return <div>No access token</div>;
  }

  return (
    // <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>

    <HydrationProvider
      queryKey={["budget", year, month]}
      queryFn={() => fetchBudgetStatus(year, month, access_token)}
    >
      {children}
    </HydrationProvider>
  );
}
