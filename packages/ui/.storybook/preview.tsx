import type { Preview } from "@storybook/react";
// import type { Decorator } from "@storybook/react";
import "../src/styles.css";

// const withThemeWrapper: Decorator = (Story, context) => {
//   const theme = context.globals.theme || "light";

//   const themeStyles: Record<string, string> = {
//     light: "bg-neutral-off-white text-dark",
//     dark: "bg-neutral-black text-white",
//     colorful:
//       "bg-gradient-to-br from-blockie-yellow via-blockie-green to-blockie-blue text-dark",
//   };

//   return (
//     <div
//       className={`min-h-screen p-8 font-sans transition-all duration-300 ${
//         themeStyles[theme] || themeStyles.light
//       }`}
//       style={{ fontFamily: "Pretendard, system-ui, sans-serif" }}
//     >
//       {Story()}
//     </div>
//   );
// };

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      default: "blockie-light",
      values: [
        {
          name: "blockie-light",
          value: "#f9fafb",
        },
        {
          name: "blockie-yellow",
          value: "#f4df7d",
        },
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1f2937",
        },
        {
          name: "gradient",
          value: "linear-gradient(45deg, #f4df7d, #8ddba4, #7dc0f4)",
        },
      ],
    },
    docs: {
      toc: {
        title: "목차",
        headingSelector: "h2, h3",
      },
      source: {
        state: "open",
      },
    },
    layout: "centered",
  },

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Blockie theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light Mode", left: "☀️" },
          { value: "dark", title: "Dark Mode", left: "🌙" },
          { value: "colorful", title: "Colorful", left: "🎨" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  // decorators: [withThemeWrapper],
};

export default preview;
