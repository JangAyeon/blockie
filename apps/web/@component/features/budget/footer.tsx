import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="mt-12 text-center text-sm text-neutral-dark-gray	">
      <p>{t("footer.message")}</p>
      <p className="mt-1">© 2025 Blockie - {t("footer.copyright")}</p>
    </footer>
  );
};

export default Footer;
