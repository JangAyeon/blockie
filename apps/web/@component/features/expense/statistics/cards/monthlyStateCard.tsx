import { SpendingAnalysisResponse } from "@type/expense";
import { FC } from "react";
import { useTranslations } from "next-intl";

interface MonthlyStateCardProps {
  average: SpendingAnalysisResponse["averageSpending"];
  max: SpendingAnalysisResponse["maxSpending"];
  min: SpendingAnalysisResponse["minSpending"];
  comments: SpendingAnalysisResponse["insights"];
}

const MonthlyStateCard: FC<MonthlyStateCardProps> = ({
  average,
  max,
  min,
  comments,
}) => {
  const t = useTranslations();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 col-span-1">
          <p className="text-body-2 text-blue-700 mb-1">
            {t("expense.statistics.monthlyAverage")}
          </p>
          <p className="text-title-2 font-bold">
            {average}
            {t("expense.overview.currencyUnit")}
          </p>
        </div>

        <div className="bg-pink-50 rounded-lg p-4 ">
          <p className="text-body-2 text-pink-700 mb-1">
            {t("expense.statistics.monthlyMax")}
          </p>
          <p className="text-title-2 font-bold">
            {max}
            {t("expense.overview.currencyUnit")}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-body-2 text-green-700 mb-1">
            {t("expense.statistics.monthlyMin")}
          </p>
          <p className="text-title-2 font-bold">
            {min}
            {t("expense.overview.currencyUnit")}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-body-2 font-medium mb-2">
          {t("expense.statistics.monthlyAnalysis")}
        </h4>
        <div className="text-body-2 text-neutral-dark-gray">
          {comments.map((item, idx) => (
            <div key={idx}>* {item}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MonthlyStateCard;
