import { categoryConfig } from "@constant/expense";
import { ExpenseCategorySummary } from "@type/expense";
import { FC } from "react";

interface CategoryStateCardProps {
  data: ExpenseCategorySummary;
}

const CategoryStateCard: FC<CategoryStateCardProps> = ({ data }) => {
  const mostSpentCategory = data.categories.sort(
    (a, b) => -a.amount + b.amount
  )[0];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.categories.map((item, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      categoryConfig[item.category]?.color || "#9CA3AF",
                  }}
                />
                <span className="font-medium">{item.category}</span>
              </div>
              <span className="text-body-2 text-neutral-dark-gray">
                {item.count}건
              </span>
            </div>
            <p className="text-title-2 font-bold text-neutral-black mb-1">
              {item.amount.toLocaleString()}원
            </p>
            <p className="text-body-2 text-neutral-dark-gray">
              평균 {Math.round(item.amount / item.count).toLocaleString()}원
            </p>
            <div className="mt-2">
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      categoryConfig[item.category]?.color || "#9CA3AF",
                    width: `${item.percentage.toFixed(1)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-neutral-dark-gray mt-1 text-right">
                전체의 {item.percentage.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>{" "}
      {mostSpentCategory && (
        <div className="mt-6 bg-blockie-yellow bg-opacity-10 rounded-lg p-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blockie-yellow"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>

              <h4 className="text-body-2 font-medium text-blockie-yellow">
                지출 패턴 분석
              </h4>
            </div>
            <div>
              {" "}
              <p className="text-body-2">
                * 가장 많이 지출하는 카테고리는{" "}
                <strong>{mostSpentCategory.category || "-"}</strong>
                입니다.
              </p>
              <p className="text-body-2">
                * 전체 지출의{" "}
                <strong>{mostSpentCategory.percentage.toFixed(1)}%</strong>를
                차지합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryStateCard;
