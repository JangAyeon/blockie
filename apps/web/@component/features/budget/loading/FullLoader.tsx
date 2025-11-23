import { BlockieFace, BlockieBottom } from "@repo/ui";
import { useTranslations } from "next-intl";

const FullLoader = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <BlockieFace size={60} emotion="neutral" />
        <BlockieBottom size={60} />
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">
        {t("budget.loadingBudget")}
      </p>
    </div>
  );
};

export default FullLoader;
