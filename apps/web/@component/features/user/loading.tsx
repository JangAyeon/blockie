import { BlockieFace, BlockieBottom } from "@repo/ui";
import { useTranslations } from "next-intl";

// 로딩 컴포넌트
const Loading = () => {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-bounce w-fit">
          <BlockieFace size={120} emotion="neutral" />
          <BlockieBottom size={120} />
        </div>
        <p className="mt-4 text-gray-600">{t("user.loadingMessage")}</p>
      </div>
    </div>
  );
};

export default Loading;
