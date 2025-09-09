"use client";
import { ApiMethod } from "@constant/api.route";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
// import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
// import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // useEffect(() => {
  //   logger({
  //     eventType: EventName.RUNTIME_ERROR,
  //     userAgent: navigator.userAgent,
  //     request: {
  //       url: window.location.href,
  //       method: ApiMethod.get,
  //     },
  //     error: {
  //       name: error.name || "unexpected runtime errors under app",
  //       message: error.message || "No error message",
  //       source: "app/error.tsx",
  //       stack: error.stack,
  //       digest: error?.digest, // Next.js 특화 정보
  //       cause: error.cause ? String(error.cause) : undefined,
  //     },
  //     message: `Runtime Error: ${error.name} - ${error.message}`,
  //   });
  // }, [error]);

  return notFound();
}
