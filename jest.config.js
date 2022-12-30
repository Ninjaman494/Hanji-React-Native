module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFiles: [
    "./src/jestSetup.tsx",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  setupFilesAfterEnv: ["./src/jestPostSetup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|@react-native-firebase|react-native.*|expo.*|@expo.*|@sentry|static-container|sentry-expo)/)",
  ],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
