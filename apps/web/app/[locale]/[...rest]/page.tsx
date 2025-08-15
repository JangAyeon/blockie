import { ApiMethod } from "@constant/api.route";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function CatchAllPage() {
  // 404 페이지 진입 로그
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || undefined;
  const fullUrl = headerList.get("referer") || "";
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

  notFound();
}
