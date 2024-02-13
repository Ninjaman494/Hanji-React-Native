jest.mock("react-native-exception-handler");
jest.mock("@sentry/react-native");

import { init } from "@sentry/react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import setupSentry from "setupSentry";

const mockInstrumentation = jest.fn();

describe("setupSentry", () => {
  it("initializes Sentry", () => {
    setupSentry(mockInstrumentation as any);

    expect(init).toHaveBeenCalled();
  });

  it("sets global error handlers", () => {
    setupSentry(mockInstrumentation as any);

    expect(setJSExceptionHandler).toHaveBeenCalled();
    expect(setNativeExceptionHandler).toHaveBeenCalled();
  });
});
