// 카테고리별 색상 매핑 (Blockie 색상 팔레트 사용)
export const categoryConfig: Record<
  string,
  { bg: string; color: string; text: string; border: string }
> = {
  식비: {
    color: "#F4DF7D",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  교통비: {
    color: "#7DC0F4",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  의료비: {
    color: "#F47D7D",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  쇼핑: {
    color: "#F48DAE",
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
  카페: {
    color: "#C89DF4",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  생활용품: {
    color: "#8DDBA4",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  기타: {
    color: "#9CA3AF",
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};
