import { redirect } from "@i18n/navigation";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
type LocalLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
const LocaleRootPage = async ({ params }: LocalLayoutProps) => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log("access_token", access_token);
  const { locale } = await params;
  if (!access_token) {
    redirect({ href: "/signin", locale });
  }
  return notFound();
};

export default LocaleRootPage;
