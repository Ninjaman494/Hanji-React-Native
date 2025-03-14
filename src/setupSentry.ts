import * as Sentry from "@sentry/react-native";
import { reloadAsync } from "expo-updates";
import { Alert } from "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";

const setupSentry = (
  routingInstrumentation: Sentry.ReactNavigationInstrumentation
): void => {
  Sentry.init({
    dsn: "https://b0c3c2bae79f4bbcbdbfdf9f3b8cc479@o1034119.ingest.sentry.io/6000706",
    beforeBreadcrumb(breadcrumb, hint) {
      if (breadcrumb.category === "xhr") {
        breadcrumb.data = JSON.parse(hint?.input);
      }
      return breadcrumb;
    },
    enabled: !__DEV__,
    environment:
      process.env.NODE_ENV === "development" ? "development" : "production",
    integrations: [new Sentry.ReactNativeTracing({ routingInstrumentation })],
    tracesSampleRate: 0.2,
  });

  // Global error handlers
  setJSExceptionHandler((error, isFatal) => {
    Sentry.captureException(error, {
      level: isFatal ? "fatal" : "error",
      extra: {
        exceptionSource: "JsException",
      },
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
    (errStr) =>
      Sentry.captureException(errStr, {
        level: "fatal",
        extra: { exceptionSource: "NativeException" },
      }),
    false,
    true
  );
};

export default setupSentry;
