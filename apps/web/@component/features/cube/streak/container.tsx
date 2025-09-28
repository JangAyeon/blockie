import { StreakInfoResponse } from "@type/expense";
import StreakCard from "./streak.expense";

interface StreakContainerProps {
  streak?: StreakInfoResponse;
  dateInfo: {
    year: string;
    month: string;
    day: string;
  };
}

const StreakContainer: React.FC<StreakContainerProps> = ({
  streak,
  dateInfo,
}) => {
  const { year, month, day } = dateInfo;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
      {streak ? (
        <StreakCard streak={streak} year={year} month={month} day={day} />
      ) : (
        <div className="text-gray-400">Loading...</div>
      )}
    </div>
  );
};

export default StreakContainer;
