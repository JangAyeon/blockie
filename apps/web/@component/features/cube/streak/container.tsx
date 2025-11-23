import StreakCard from "./streak.expense";
import StreakSkeleton from "./streak.skeleton";
import { CubeContainerProps } from "app/[locale]/(private)/cube/page";
import { useExpensesStreak } from "@hook/api/expense/useExpense";

interface StreakContainerProps {
  dateInfo: CubeContainerProps["dateInfo"];
}

const StreakContainer: React.FC<StreakContainerProps> = ({ dateInfo }) => {
  const {
    data: streak,
    isLoading: isStreakLoading,
    isError: isStreakError,
  } = useExpensesStreak();
  const showSkeleton = isStreakLoading || isStreakError || !streak;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
      {showSkeleton ? (
        <StreakSkeleton />
      ) : (
        <StreakCard streak={streak} dateInfo={dateInfo} />
      )}
    </div>
  );
};

export default StreakContainer;
