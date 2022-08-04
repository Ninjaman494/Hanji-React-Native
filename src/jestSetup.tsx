import { EffectCallback } from "react";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("hooks/useGetAdFreeStatus", () =>
  jest.fn().mockReturnValue({ isAdFree: true })
);
jest.mock("utils/logEvent");

const mock = {
  push: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
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
