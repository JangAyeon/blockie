import { pageUrl } from "@constant/page.route";
import { StreakInfoResponse } from "@type/expense";
import {
  getProgressPercent,
  getStreakLevel,
} from "@utils/common/getStreakConfig";
import { handleDateChangeBtn } from "@utils/expense";
import { useRouter } from "@i18n/navigation";
import React from "react";

const StreakCard: React.FC<{
  streak: StreakInfoResponse;
  year: string;
  month: string;
  day: string;
}> = ({ streak, year, month, day }) => {
  // 샘플 데이터
  // const streak = {
  //   currentStreak: 12,
  //   maxStreak: 18,
  //   daysToNextReward: 2,
  //   nextRewardTarget: 14,
  //   hasRecordToday: true,
  //   streakLevel: "silver",
  //   totalRecordDays: 45,
  //   streakStartDate: "2025-07-16",
  // };
  const router = useRouter();
  return (
    <div>
      {/* 오늘 기록 완료 배지 */}
      {streak.hasRecordToday && (
        <div className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
          ✓ 오늘 완료
        </div>
      )}

      <div className="flex items-center relative z-10 ">
        {/* 아이콘과 레벨 표시 */}
        <div className="relative mr-4 max-sm:hidden">
          <div
            className={` w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${getStreakLevel(streak.streakLevel).color} group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
          >
            <span className="text-2xl">🔥</span>
          </div>
          {/* 레벨 배지 */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
            <span className="text-xs">
              {getStreakLevel(streak.streakLevel).emoji}
            </span>
          </div>
        </div>

        <div className="flex-1">
          {/* 메인 텍스트 */}
          <div>
            <button
              onClick={() =>
                handleDateChangeBtn(pageUrl.cube, "prev", year, month, router)
              }
            >
              {" "}
              ▷
            </button>
            <div className="flex items-center  gap-2 mb-1">
              <h3 className="font-bold text-lg text-gray-800">
                {streak.currentStreak}일 연속 기록 중!
              </h3>
            </div>
            <button
              onClick={() =>
                handleDateChangeBtn(pageUrl.cube, "next", year, month, router)
              }
            >
              {" "}
              ▷
            </button>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  다음 보상까지 남은 일수{" "}
                  <span
                    className={`text-xs font-bold bg-gradient-to-r ${getStreakLevel(streak.streakLevel).color} bg-clip-text text-transparent`}
                  >
                    {streak.daysToNextReward}
                  </span>
                </div>
              </div>

              <span className="text-xs text-gray-600 font-medium">
                {streak.nextRewardTarget - streak.daysToNextReward}/
                {streak.nextRewardTarget}
              </span>
            </div>
            {/* 진행률 바 */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${getStreakLevel(streak.streakLevel).color} h-2 rounded-full transition-all duration-500 ease-out`}
                style={{
                  width: `${getProgressPercent({
                    nextRewardTarget: streak.nextRewardTarget,
                    daysToNextReward: streak.daysToNextReward,
                  })}%`,
                }}
              />
            </div>
          </div>

          <p className="text-sm text-gray-600">
            꾸준히 기록하면 특별한 보상이 기다려요
          </p>
        </div>
      </div>

      {/* 하단 동기부여 메시지 */}

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex sm:items-center justify-between max-sm:flex-col max-sm:items-start gap-3">
          <span className="text-xs text-gray-500">
            {new Date(streak.streakStartDate || new Date()).toLocaleDateString(
              "ko-KR"
            )}
            부터 시작 (총 {streak.totalRecordDays}일 기록)
          </span>
          <div className="flex flex-row gap-2 justify-center">
            <span className="text-xs text-gray-500 bg-gray-100  px-2 py-1 rounded-full font-medium">
              최고: {streak.maxStreak}일
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                {streak.streakLevel.toUpperCase()} 레벨
              </span>
            </div>
            {streak.daysToNextReward <= 3 ? (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium animate-pulse">
                🎁 보상 임박!
              </span>
            ) : (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                🔥 연속 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
