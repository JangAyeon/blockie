const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@component/(.*)$": "<rootDir>/@component/$1",
    "^@hook/(.*)$": "<rootDir>/@hook/$1",
    "^@utils/(.*)$": "<rootDir>/@utils/$1",
    "^@type/(.*)$": "<rootDir>/@type/$1",
    "^@constant/(.*)$": "<rootDir>/@constant/$1",
    "^@provider/(.*)$": "<rootDir>/@provider/$1",
    "^@store/(.*)$": "<rootDir>/@store/$1",
    "^@i18n/(.*)$": "<rootDir>/@i18n/$1",
  },
  testMatch: [
    "**/__tests__/**/*.(test|spec).{js,jsx,ts,tsx}",
    "**/*.(test|spec).{js,jsx,ts,tsx}",
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

module.exports = createJestConfig(customJestConfig);
