import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations();
  return (
    <>
      <h1>{t("HomePage.title")}</h1>
      <p>apps/web/app/error.tsx</p>
    </>
  );
}
