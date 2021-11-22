// @ts-ignore
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { EffectCallback } from "react";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

const mock = {
  push: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
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
