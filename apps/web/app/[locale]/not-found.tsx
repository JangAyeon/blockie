import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import { useTranslations } from "next-intl";
import error from "next/error";
import { useEffect } from "react";

export default function NotFoundPage() {
  const t = useTranslations();

  useEffect(() => {
    console.error("GlobalError::", error);

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
      <p>apps/web/app/error.tsx</p>
    </>
  );
}
