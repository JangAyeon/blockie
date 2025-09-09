// app/mypage/layout.tsx
// import { cookies } from "next/headers";
import React from "react";
import { queryKeys } from "@utils/query/query.key";
import HydrationProvider from "@provider/query/parallel.hydration";
import { userService } from "@utils/apis/services/user";
import { LayoutProps } from "@type/layout";
import FloatButton from "@component/features/user/float.button";
export default async function MyPageLayout({ children }: LayoutProps) {
  // const cookieStore = await cookies();
  // const access_token = cookieStore.get("access_token")?.value ?? null;
  // // console.log(access_token);
  // if (!access_token) {
  //   return <div>No access token</div>;
  // }
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
      <FloatButton />
    </HydrationProvider>
  );
}
