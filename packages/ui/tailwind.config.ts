/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기본 브랜드 색상
        blockie: {
          yellow: "#F4DF7D",
          green: "#8DDBA4",
          blue: "#7DC0F4",
          purple: "#C89DF4",
          pink: "#F48DAE",
          red: "#F47D7D",
          "red-light": "#F49B9B",
        },
        // 중립 색상
        neutral: {
          black: "#1F2937",
          "dark-gray": "#4B5563",
          "medium-gray": "#9CA3AF",
          "light-gray": "#E5E7EB",
          "off-white": "#F9FAFB",
        },
        // 의미론적 색상
        success: "#34D399",
        warning: "#FBBF24",
        error: "#EF4444",
        info: "#60A5FA",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        display: ["Montserrat", "Pretendard", "sans-serif"],
      },
      fontSize: {
        // 타이포그래피 시스템
        display: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "title-1": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "title-2": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title-3": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "body-1": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-2": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        button: ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "number-l": ["40px", { lineHeight: "48px", fontWeight: "700" }],
        "number-m": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "number-s": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      },
      borderRadius: {
        // 테두리 반경
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        // 그림자 시스템
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        // 여백 및 간격 시스템
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
      },
      animation: {
        // 애니메이션
        slideUp: "slideUp 0.3s ease-out forwards",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        // 키프레임
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
