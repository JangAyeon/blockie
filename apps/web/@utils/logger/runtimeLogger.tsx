"use client";

import { useEffect } from "react";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";

function getBrowserInfo() {
  return window.navigator.userAgent;
}

function setupRuntimeErrorHandlers() {
  if (typeof window !== "undefined") {
    // Reference Error, Type Error 등 런타임 에러 캡처
    window.onerror = (message, source, _lineno, _colno, error) => {
      // error 객체에는 다음 정보들이 포함됩니다:
      // - error.name: "ReferenceError" | "TypeError" 등
      // - error.message: "aaa is not defined" 등
      // - error.stack: 에러 발생 위치의 스택 트레이스

      logger({
        eventType: EventName.RUNTIME_ERROR,
        message: message.toString(),
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
          source: source,
        },
        userAgent: getBrowserInfo(),
      });
    };

    // async/await나 Promise에서 발생하는 에러 캡처
    window.onunhandledrejection = (event) => {
      const error = event.reason;

      logger({
        eventType: EventName.RUNTIME_ERROR,
        message: error?.message,
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
        userAgent: getBrowserInfo(),
      });
    };
  }
}

export function RuntimeLogger() {
  useEffect(() => {
    setupRuntimeErrorHandlers();
  }, []);

  return null;
}
