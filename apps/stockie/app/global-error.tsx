"use client";
import { ApiMethod } from "@constant/api.route";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
// import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
// import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  // useEffect(() => {
  //   // console.error("GlobalError::", error);

  //   logger({
  //     eventType: EventName.GLOBAL_ERROR,
  //     userAgent: navigator.userAgent,
  //     request: {
  //       url: window.location.href,
  //       method: ApiMethod.get,
  //     },
  //     error: {
  //       name: error.name || "unexpected global runtime errors",
  //       message:
  //         error.message || "runtime global error parsed to notFound Error",
  //       source: "app/global-error.tsx",
  //       stack: error.stack, // 🔥 가장 중요! 디버깅에 필수
  //       digest: error?.digest, // Next.js 특화 정보
  //       cause: error.cause ? String(error.cause) : undefined,
  //     },
  //     message: `Global Error: ${error.name} - ${error.message}`,
  //   });
  // }, [error]);

  return notFound();
}
