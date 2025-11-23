import { streaklevelConfig } from "@constant/streak.level";
import { StreakInfoResponse } from "@type/expense";

export function getStreakLevel(level: string) {
  const currentLevel = streaklevelConfig[level as string] || {
    emoji: "🥉",
    color: "from-orange-400 to-amber-500",
    bgColor: "from-orange-200/30 to-amber-200/30",
  };

  return currentLevel;
}

export function getProgressPercent({
  nextRewardTarget,
  daysToNextReward,
}: {
  nextRewardTarget: StreakInfoResponse["nextRewardTarget"];
  daysToNextReward: StreakInfoResponse["daysToNextReward"];
}) {
  const progressPercentage =
    ((nextRewardTarget - daysToNextReward) / nextRewardTarget) * 100;

  return progressPercentage;
}
