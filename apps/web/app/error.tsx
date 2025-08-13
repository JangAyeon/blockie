"use client";

import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>apps/web/app/error.tsx</p>
    </div>
  );
}
