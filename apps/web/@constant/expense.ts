export const categoryConfig: Record<
  string,
  {
    bg: string;
    color: string;
    text: string;
    border: string;
    icon: string; // 여기에 이모지
    example?: string;
  }
> = {
  "월별 고정 지출": {
    color: "#F4DF7D",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: "📑",
    example: "월세, 관리비, 통신비, 구독",
  },
  "월별 변동 지출": {
    color: "#7DC0F4",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "💳",
    example: "식비, 교통비, 의료비",
  },
  "비정기 지출": {
    color: "#F47D7D",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: "🎁",
    example: "여행, 경조사, 큰 지출",
  },
  // 쇼핑: {
  //   color: "#F48DAE",
  //   bg: "bg-pink-50",
  //   text: "text-pink-700",
  //   border: "border-pink-200",
  //   icon: "🛍️",
  // },
  // "기타": {
  //   color: "#C89DF4",
  //   bg: "bg-purple-50",
  //   text: "text-purple-700",
  //   border: "border-purple-200",
  //   icon: "☕",
  // },
  // 생활용품: {
  //   color: "#8DDBA4",
  //   bg: "bg-green-50",
  //   text: "text-green-700",
  //   border: "border-green-200",
  //   icon: "🧻",
  // },
  기타: {
    color: "#9CA3AF",
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: "⭐",
    example: "취미, 선물, 기타",
  },
};

export const EXPENSE_TAB_MENU = {
  STATISTICS: "STATISTICS",
  LIST: "LIST",
  OVERVIEW: "OVERVIEW",
} as const;

export const EXPENSE_PAGE_VARIANTS = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    // transition: {
    //   duration: 0.3,
    //   ease: "easeOut",
    // },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    // transition: {
    //   duration: 0.3,
    //   ease: "easeIn",
    // },
  }),
};
