module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFiles: ["./src/jestSetup.tsx"],
  transformIgnorePatterns: [],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
