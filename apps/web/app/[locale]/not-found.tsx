"use client";

import { pageUrl } from "@constant/page.route";
import { usePathname } from "@i18n/navigation";
import { useRouter } from "@i18n/navigation";
import { Button } from "@repo/ui";
import { LocaleLayoutProps } from "@type/layout";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import error from "next/error";
import { useEffect, useState } from "react";

// type LocalLayoutProps = {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// };

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("NotFound.title"),
    robots: "noindex, nofollow", // 404 페이지는 인덱싱 방지
  };
}

export default function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [countdown, setCountdown] = useState(10);

  const handleGoHome = () => {
    router.push(pageUrl.cube);
  };
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
    // 10초 후 자동 홈페이지로 이동
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // push는 setTimeout으로 한 번 더 래핑해서 렌더 완료 후 실행
          setTimeout(() => {
            router.push("/cube");
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [pathname, router]);
  return (
    <>
      <h1>{t("HomePage.title")}</h1>
      <p>apps/web/app/[locale]/not-found.tsx</p>
      {/* 404 일러스트 */}
      <div className="mb-8">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <div className="text-xl text-gray-600 mb-2">
          {t("NotFound.title", { default: "페이지를 찾을 수 없습니다" })}
        </div>
        <div className="text-gray-500">
          {t("NotFound.description", {
            default:
              "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
          })}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleGoHome} className="flex items-center gap-2">
            {t("NotFound.goHome", { default: "홈으로 가기" })}
          </Button>
        </div>
      </div>
      {/* 자동 리다이렉트 안내 */}
      <div className="text-sm text-gray-500 mt-6">
        {countdown > 0 && (
          <p>
            {t("NotFound.autoRedirect", {
              seconds: countdown,
              default: `${countdown}초 후 홈페이지로 자동 이동됩니다.`,
            })}
          </p>
        )}
      </div>

      {/* 추가 도움말 */}
      <div className="mt-8 text-xs text-gray-400">
        <p>
          {t("NotFound.helpText", {
            default: "문제가 지속되면 고객센터로 문의해 주세요.",
          })}
        </p>
      </div>
    </>
  );
}
