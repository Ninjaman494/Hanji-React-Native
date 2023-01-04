// @ts-expect-error import doesn't have type
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import { EffectCallback } from "react";

jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("hooks/useGetAdFreeStatus", () =>
  jest.fn().mockReturnValue({ isAdFree: true })
);
jest.mock("utils/logEvent");
jest.mock("expo-modules-core");
jest.mock("@notifee/react-native", () => ({
  requestPermission: jest.fn(),
  openNotificationSettings: jest.fn(),
}));

const mock = {
  push: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  navigate: jest.fn(),
};
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useFocusEffect: (func: EffectCallback) => func(),
  useNavigationContainerRef: () => ({
    getCurrentRoute: () => ({
      name: "MainPage",
      params: { foo: "bar" },
    }),
  }),
  useNavigation: () => mock,
}));

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
