jest.mock("@sentry/react-native");
jest.mock("react-native-gesture-handler");
jest.mock("utils/handleNotificationReceived");
jest.mock("@react-native-firebase/messaging", () => {
  const onNotificationOpenedApp = jest.fn(async () => {});
  const getInitialNotification = jest.fn(async () => {});
  return () => ({ onNotificationOpenedApp, getInitialNotification });
});

import messaging from "@react-native-firebase/messaging";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { addBreadcrumb } from "@sentry/react-native";
import Pages from "Pages";
import React from "react";
import "react-native";
import "react-native-gesture-handler/jestSetup";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { render } from "utils/testUtils";

jest.useFakeTimers();

// Mocked in jestSetup.tsx
const navRef = useNavigationContainerRef();

describe("Pages component", () => {
  it("sets navigation breadcrumbs", () => {
    render(
      <NavigationContainer>
        <Pages navRef={navRef as any} />
      </NavigationContainer>
    );

    expect(addBreadcrumb).toHaveBeenCalledWith({
      category: "navigation",
      message: "Route changed to MainPage",
      level: "info",
      data: { foo: "bar" },
    });
  });

  it("logs select view events", () => {
    render(
      <NavigationContainer>
        <Pages navRef={navRef as any} />
      </NavigationContainer>
    );

    expect(logEvent).toHaveBeenCalledWith({
      type: LOG_EVENT.SCREEN_VIEW,
      params: {
        screen_name: "MainPage",
        screen_class: "MainPage",
      },
    });
  });

  it("sets up notification listeners", () => {
    const { onNotificationOpenedApp, getInitialNotification } = messaging();

    render(
      <NavigationContainer>
        <Pages navRef={navRef as any} />
      </NavigationContainer>
    );

    expect(onNotificationOpenedApp).toHaveBeenCalled();
    expect(getInitialNotification).toHaveBeenCalled();
  });

  it("verifies that the navigation ref is ready before using it", () => {
    render(
      <NavigationContainer>
        <Pages navRef={navRef as any} />
      </NavigationContainer>
    );

    expect(navRef.isReady).toHaveBeenCalled();
  });
});
