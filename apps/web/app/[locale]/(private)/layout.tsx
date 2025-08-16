import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { pageUrl } from "@constant/page.route";

export default async function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const { locale } = await params;

  // 🔒 모든 private 페이지에 대한 통합 인증 체크
  if (!access_token) {
    redirect(`/${locale}${pageUrl.signin}`);
  }

  return <> {children}</>;
}
