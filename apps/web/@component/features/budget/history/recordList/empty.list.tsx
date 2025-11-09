import Image from "next/image";
import { useTranslations } from "next-intl";

const EmptyHistoryList = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-40 text-neutral-medium-gray">
      <Image
        src="/budget/history/monthCalendar.svg"
        alt="plus icon"
        width={32}
        height={32}
      />

      <p>{t("budget.noHistory")}</p>
    </div>
  );
};

export default EmptyHistoryList;
