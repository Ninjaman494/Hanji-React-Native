module.exports = {
  preset: "react-native",
  setupFiles: ["./src/jestSetup.ts"],
  setupFilesAfterEnv: ["./src/customMatchers.tsx"],
  transformIgnorePatterns: [],
};
