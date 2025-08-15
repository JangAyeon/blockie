"use client";

import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import error from "next/error";
import { useEffect } from "react";

type LocalLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("NotFound.title"),
    robots: "noindex, nofollow", // 404 페이지는 인덱싱 방지
  };
}

export default function NotFoundPage() {
  const t = useTranslations();

  useEffect(() => {
    // console.error("GlobalError::", error);

    logger({
      eventType: EventName.NOT_FOUND,
      userAgent: navigator.userAgent,
      request: {
        url: window.location.href,
        method: "GET",
        userAgent: navigator.userAgent,
      },
      message: `${error.displayName}`,
    });
  }, [error]);
  return (
    <>
      <h1>{t("HomePage.title")}</h1>
      <p>apps/web/app/[locale]/not-found.tsx</p>
    </>
  );
}
