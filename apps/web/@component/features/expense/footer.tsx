import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="p-5 flex flex-col gap-2 text-center text-body-2 text-neutral-dark-gray">
      {/* "스마트한 지출 관리로 건강한 소비 습관을 만들어 보세요." */}
      <p>{t("tagline")}</p>
      {/* "© 2025 Blockie - 모든 권리 보유" */}
      <p>{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
