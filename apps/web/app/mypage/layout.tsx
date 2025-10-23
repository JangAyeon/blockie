// app/mypage/layout.tsx
import { cookies } from "next/headers";
import React from "react";
import { queryKeys } from "../../@utils/query/query.control";
import { fetchUserProfile } from "../../@utils/apis/user";
import HydrationProvider from "../../@provider/hydration";
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

  return (
    <HydrationProvider
      queryKey={queryKeys.user.base}
      queryFn={() => fetchUserProfile(access_token)}
    >
      <div>토큰: {access_token}</div>
      {children}
    </HydrationProvider>
  );
}
