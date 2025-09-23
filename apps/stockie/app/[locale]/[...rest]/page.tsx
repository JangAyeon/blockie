import { ApiMethod } from "@constant/api.route";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { redirect } from "@i18n/navigation";
// import { pageUrl } from "@constant/page.route";
import { LocaleParams } from "@type/layout";

export default async function CatchAllPage({ params }: LocaleParams) {
  // 404 페이지 진입 로그
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || undefined;
  const fullUrl = headerList.get("referer") || "";
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value ?? null;
  console.log("access_token", access_token);
  const { locale } = await params;
  await logger({
    eventType: EventName.NOT_FOUND,
    userAgent,
    message: `No matched Page under [locale], so parsed to Not Found Error`,
    request: {
      url: `${fullUrl}`,
      method: ApiMethod.get,
    },
    error: {
      name: EventName.NOT_FOUND,
      message: `No matched Page under [locale]`,
      stack: `apps/web/app/[locale]/[...rest]/page.tsx`,
      source: `${fullUrl}`,
    },
  });
  // 1: 인증되지 않은 사용자 처리 -> 로그인 페이지로
  // if (!access_token) {
  //   redirect({ href: pageUrl.signin, locale });
  // } else {
  //   return notFound();
  // }
  // redirect({ href: "/stock", locale });
  return <>[...rest] 페이지</>;
}
