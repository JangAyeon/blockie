import { useTranslations } from "next-intl";

const Detail = ({
  maxBlocks,
  totalBlocks,
  showByCategory,
}: {
  maxBlocks: number;
  totalBlocks: number;
  showByCategory: boolean;
}) => {
  const t = useTranslations("cube.block");
  return (
    <div className="flex flex-row gap-2">
      <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
        {/* 남은 공간: 대략 {Math.ceil(maxBlocks - totalBlocks)}칸 */}
        {t("remainingSpaceDetail", {
          slots: Math.ceil(maxBlocks - totalBlocks),
        })}
      </div>
      <div
        className={`text-sm px-3 py-1.5 rounded-full font-medium ${
          showByCategory
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {/* {totalBlocks}/{maxBlocks} 블록 */}
        {t("blockRatio", { used: totalBlocks, total: maxBlocks })}
      </div>
    </div>
  );
};
export default Detail;
