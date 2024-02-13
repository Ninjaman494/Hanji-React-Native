// @ts-expect-error import doesn't have type
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import { EffectCallback } from "react";

jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("hooks/useUserContext", () => ({
  __esModule: true,
  ...jest.requireActual("hooks/useUserContext"),
  default: jest.fn().mockReturnValue({
    isAdFree: true,
    sessionCount: 0,
  }),
}));
jest.mock("utils/logEvent", () => ({
  __esModule: true,
  default: jest.fn(),
  LOG_EVENT: {},
}));
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
  useNavigationContainerRef: jest.fn().mockReturnValue({
    getCurrentRoute: () => ({
      name: "MainPage",
      params: { foo: "bar" },
    }),
    isReady: jest.fn().mockReturnValue(true),
  }),
  useNavigation: () => mock,
}));

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
