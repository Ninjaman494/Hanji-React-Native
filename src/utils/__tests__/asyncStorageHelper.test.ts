import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AsyncStorageKey,
  FAVORITES_KEY,
  getAsyncStorage,
  HONORIFIC_TOGGLED_KEY,
  SESSIONS_KEY,
  setAsyncStorage,
  USER_ID_KEY,
} from "utils/asyncStorageHelper";

jest.mock("@react-native-async-storage/async-storage");

const STRING_KEY = USER_ID_KEY;
const INT_KEY = SESSIONS_KEY;
const BOOL_KEY = HONORIFIC_TOGGLED_KEY;
const OBJ_KEY = FAVORITES_KEY;

const STRING_VAL = "foobar";
const INT_VAL = 1337;
const BOOL_VAL = true;
const OBJ_VAL = { a: "foobar", b: 123, c: true };

const STRING_RAW = STRING_VAL;
const INT_RAW = INT_VAL.toString();
const BOOL_RAW = "true";
const OBJ_RAW = JSON.stringify(OBJ_VAL);

(AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
  if (key === STRING_KEY) return STRING_RAW;
  if (key === INT_KEY) return INT_RAW;
  if (key === BOOL_KEY) return BOOL_RAW;
  if (key === OBJ_KEY) return OBJ_RAW;
});

describe("asyncStorageHelper", () => {
  describe("getAsyncStorage", () => {
    it.each([
      ["string", STRING_KEY, STRING_VAL],
      ["number", INT_KEY, INT_VAL],
      ["boolean", BOOL_KEY, BOOL_VAL],
      ["object", OBJ_KEY, OBJ_VAL],
    ])("can fetch and parse %s", async (type, key, val) => {
      const result = await getAsyncStorage(key as AsyncStorageKey, type as any);
      expect(result).toEqual(val);
    });
  });

  describe("setAsyncStorage", () => {
    it.each([
      ["string", STRING_KEY, STRING_RAW, STRING_VAL],
      ["number", INT_KEY, INT_RAW, INT_VAL],
      ["boolean", BOOL_KEY, BOOL_RAW, BOOL_VAL],
      ["object", OBJ_KEY, OBJ_RAW, OBJ_VAL],
    ])("can parse and set %s", async (_, key, rawVal, val) => {
      await setAsyncStorage(key as AsyncStorageKey, val);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, rawVal);
    });
  });
});
