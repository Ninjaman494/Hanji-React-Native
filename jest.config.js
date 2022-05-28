module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFiles: ["./src/jestSetup.tsx"],
  setupFilesAfterEnv: ["./src/jestPostSetup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|@react-native-firebase|react-native.*|expo.*|@expo.*|@sentry|static-container)/)",
  ],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
