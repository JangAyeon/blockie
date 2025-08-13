"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";

export default function HomePage() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("HomePage.title")}</h1>
      <Link href="/mypage">{t("HomePage.about")}</Link>
    </div>
  );
}
