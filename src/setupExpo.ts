import { reloadAsync } from "expo-updates";
import { Alert } from "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { init, Native } from "sentry-expo";

const setupExpo = (): void => {
  init({
    dsn: "https://b0c3c2bae79f4bbcbdbfdf9f3b8cc479@o1034119.ingest.sentry.io/6000706",
    beforeBreadcrumb(breadcrumb, hint) {
      if (breadcrumb.category === "xhr") {
        breadcrumb.data = JSON.parse(hint?.input);
      }
      return breadcrumb;
    },
    // enableInExpoDevelopment: true,
    // debug: true, // log debug info in dev mode
  });

  // Global error handlers
  const { Fatal, Error } = Native.Severity;
  setJSExceptionHandler((error, isFatal) => {
    Native.captureException(error, {
      level: isFatal ? Fatal : Error,
    });

    Alert.alert(
      "Unexpected Error",
      "An unexpected error occured. We will need to restart the app.",
      [
        {
          text: "Restart",
          onPress: async () => await reloadAsync(),
        },
      ]
    );
  }, false);

  setNativeExceptionHandler(
    (errStr) => Native.captureException(errStr, { level: Fatal }),
    false,
    true
  );
};

export default setupExpo;
