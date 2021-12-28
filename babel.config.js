module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      ["module:react-native-dotenv"],
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
            ".web.js",
            ".web.tsx",
            ".native.js",
            ".native.tsx",
          ],
          root: ["./src"],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
