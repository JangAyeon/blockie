// import React from "react";

// export const Spinner = ({
//   size = "sm", // 'sm', 'md', 'lg', 'xl'
//   color = "gray", // Blockie 브랜드 컬러들
//   thickness = "sm", // 'sm', 'md', 'lg'
//   speed = "normal", // 'slow', 'normal', 'fast'
//   className = "",
// }) => {
//   // 사이즈 매핑
//   const sizeMap: Record<string, number> = {
//     sm: 24,
//     md: 40,
//     lg: 56,
//     xl: 80,
//   };

//   // 두께 매핑
//   const thicknessMap: Record<string, number> = {
//     sm: 2,
//     md: 3,
//     lg: 4,
//   };

//   // 속도 매핑
//   const speedMap: Record<string, string> = {
//     slow: "2s",
//     normal: "1s",
//     fast: "0.5s",
//   };

//   // Blockie 컬러 매핑
//   const colorMap: Record<string, string> = {
//     yellow: "var(--color-blockie-yellow)",
//     green: "var(--color-blockie-green)",
//     blue: "var(--color-blockie-blue)",
//     purple: "var(--color-blockie-purple)",
//     pink: "var(--color-blockie-pink)",
//     red: "var(--color-blockie-red)",
//     gray: "var(--color-neutral-medium-gray)",
//   };

//   const spinnerSize = sizeMap[size];
//   const borderThickness = thicknessMap[thickness];
//   const animationSpeed = speedMap[speed];
//   const spinnerColor = colorMap[color] || color;

//   const spinnerStyle = {
//     width: `${spinnerSize}px`,
//     height: `${spinnerSize}px`,
//     border: `${borderThickness}px solid var(--color-neutral-off-white)`,
//     borderTop: `${borderThickness}px solid ${spinnerColor}`,
//     borderRadius: "50%",
//     animation: `spin ${animationSpeed} linear infinite`,
//     display: "inline-block",
//   };

//   return (
//     <div
//       className={`inline-block ${className}`}
//       style={spinnerStyle}
//       role="status"
//       aria-label="Loading"
//     />
//   );
// };
