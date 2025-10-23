// app/budget/layout.tsx
import { cookies } from "next/headers";
import HydrationProvider from "../../@provider/hydration";
import { fetchExpenseStatus } from "../../@utils/apis/expense";
export default async function CubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;

  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 맞추기 위해 padStart 사용

  if (!access_token) {
    return <div>No access token</div>;
  }

  return (
    // <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>

    <HydrationProvider
      queryKey={["expense-monthly", year, month, day]}
      queryFn={() =>
        fetchExpenseStatus(year, month, day, "monthly", access_token)
      }
    >
      {children}
    </HydrationProvider>
  );
}
