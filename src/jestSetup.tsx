jest.mock("@react-navigation/native");

// @ts-ignore
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

(useNavigation as jest.Mock).mockReturnValue({
  push: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
});
