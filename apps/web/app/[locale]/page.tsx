import { pageUrl } from "@constant/page.route";
import { redirect } from "@i18n/navigation";
import { cookies } from "next/headers";

type LocalLayoutProps = {
  params: Promise<{ locale: string }>;
};
const LocaleRootPage = async ({ params }: LocalLayoutProps) => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log("access_token", access_token);
  const { locale } = await params;
  if (!access_token) {
    redirect({ href: pageUrl.signin, locale });
  } else {
    redirect({ href: pageUrl.cube, locale });
  }
};

export default LocaleRootPage;
