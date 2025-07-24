// app/mypage/layout.tsx
import { cookies } from "next/headers";
import React from "react";
import { queryKeys } from "../../@utils/query/query.key";
import HydrationProvider from "../../@provider/query/parallel.hydration";
import { userService } from "@utils/apis/services/user";
export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log(cookieStore.getAll());
  if (!access_token) {
    return <div>No access token</div>;
  }
  const prefetchQueries = [
    {
      queryKey: queryKeys.user.profile(),
      queryFn: () => userService.getMyProfile(),
    },
    {
      queryKey: queryKeys.user.budgetHistory(6),
      queryFn: () => userService.getBudgetHistory(6),
    },
    {
      queryKey: queryKeys.user.recentExpenses(),
      queryFn: () => userService.getRecentExpenses(),
    },
  ];
  return (
    <HydrationProvider
      queries={prefetchQueries}
      // queryKey={queryKeys.user.base}
      // queryFn={() => fetchUserProfile(access_token)}
    >
      {/* <div>토큰: {access_token}</div> */}
      {children}
    </HydrationProvider>
  );
}
