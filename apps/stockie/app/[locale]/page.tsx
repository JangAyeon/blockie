import { redirect } from "@i18n/navigation";
import { LocaleParams } from "@type/layout";
import { cookies } from "next/headers";

const LocaleRootPage = async ({ params }: LocaleParams) => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log("access_token", access_token);
  const { locale } = await params;
  // if (!access_token) {
  //   redirect({ href:"/", locale });
  // } else {
  //   redirect({ href: pageUrl.cube, locale });
  // }

  redirect({ href: "/", locale });
};

export default LocaleRootPage;
