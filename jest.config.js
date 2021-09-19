module.exports = {
  preset: "react-native",
  setupFiles: ["./src/jestSetup.ts"],
  transformIgnorePatterns: [],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
