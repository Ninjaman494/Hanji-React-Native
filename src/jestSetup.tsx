import { EffectCallback } from "react";

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
