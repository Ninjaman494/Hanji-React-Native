jest.mock("react-native-exception-handler");
jest.mock("sentry-expo");

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { init } from "sentry-expo";
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
