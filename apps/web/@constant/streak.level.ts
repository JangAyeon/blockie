// 레벨별 색상과 이모지
export const streaklevelConfig: Record<
  string,
  { emoji: string; color: string; bgColor: string }
> = {
  bronze: {
    emoji: "🥉",
    color: "from-orange-400 to-amber-500",
    bgColor: "from-orange-200/30 to-amber-200/30",
  },
  silver: {
    emoji: "🥈",
    color: "from-gray-400 to-slate-500",
    bgColor: "from-gray-200/30 to-slate-200/30",
  },
  gold: {
    emoji: "🥇",
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-200/30 to-orange-200/30",
  },
  platinum: {
    emoji: "💎",
    color: "from-blue-400 to-purple-500",
    bgColor: "from-blue-200/30 to-purple-200/30",
  },
  diamond: {
    emoji: "💠",
    color: "from-purple-400 to-pink-500",
    bgColor: "from-purple-200/30 to-pink-200/30",
  },
};
