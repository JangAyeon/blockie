"use client";

import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import error from "next/error";
import Error from "next/error";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.error("GlobalError::", error);

    logger({
      eventType: EventName.GLOBAL_ERROR,
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
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
