import { SpendingAnalysisResponse } from "@type/expense";
import { FC } from "react";

interface WeeklyStateCardProps {
  average: SpendingAnalysisResponse["averageSpending"];
  max: SpendingAnalysisResponse["maxSpending"];
  min: SpendingAnalysisResponse["minSpending"];
  comments: SpendingAnalysisResponse["insights"];
}

const WeeklyStateCard: FC<WeeklyStateCardProps> = ({
  average,
  max,
  min,
  comments,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 col-span-1">
          <p className="text-body-2 text-blue-700 mb-1">주간 평균</p>
          <p className="text-title-2 font-bold">{average}원</p>
        </div>

        <div className="bg-pink-50 rounded-lg p-4 ">
          <p className="text-body-2 text-pink-700 mb-1">주간 최대</p>
          <p className="text-title-2 font-bold">{max}원</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-body-2 text-green-700 mb-1">주간 최소</p>
          <p className="text-title-2 font-bold">{min}원</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-body-2 font-medium mb-2">주간 추이 분석</h4>
        <div className="text-body-2 text-neutral-dark-gray">
          {comments.map((item, idx) => (
            <div key={idx}>* {item}</div>
          ))}
          {/* 지난 6개월 동안 평균적으로 안정적인 지출 패턴을 보이고 있습니다.
          이번 달은 예산 범위 내에서 잘 관리되고 있습니다. */}
        </div>
      </div>
    </>
  );
};

export default WeeklyStateCard;
