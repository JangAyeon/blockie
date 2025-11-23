import Image from "next/image";
import { useTranslations } from "next-intl";

const EmptyMonthListed = () => {
  const t = useTranslations();
  return (
    <div className="h-80 mb-6 flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center flex-col flex items-center gap-2 text-neutral-black">
        <Image
          src="/common/noMonthListed.svg"
          alt="plus icon"
          width={32}
          height={32}
        />
        <p>{t("budget.noMonthListed")}</p>
      </div>
    </div>
  );
};

export default EmptyMonthListed;
