import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: "Blockie Design System",
    brandUrl: "https://github.com/JangAyeon/blockie",
    brandImage: undefined, // 로고 이미지가 있다면 여기에 추가
    brandTarget: "_self",

    // Blockie 색상으로 커스터마이징
    colorPrimary: "#f4df7d", // blockie-yellow
    colorSecondary: "#8ddba4", // blockie-green

    // UI 색상
    appBg: "#f9fafb",
    appContentBg: "#ffffff",
    appBorderColor: "#e5e7eb",

    // 텍스트 색상
    textColor: "#1f2937",
    textInverseColor: "#ffffff",

    // 툴바 색상
    barTextColor: "#4b5563",
    barSelectedColor: "#f4df7d",
    barBg: "#ffffff",

    // 폰트
    fontBase: "Pretendard, system-ui, sans-serif",
    fontCode: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
});
