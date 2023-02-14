import AsyncStorage from "@react-native-async-storage/async-storage";
import { PageName } from "typings/navigation";

/**
 * AsyncStorage key for user id which is synced
 * between Sentry,RevenueCat, and Firebase
 */
export const USER_ID_KEY = "USER_ID";
/**
 * AsyncStorage key for favorite conjugations,
 * which is stored as a JSON string
 */
export const FAVORITES_KEY = "@favorites_Key";

/**
 * AsyncStorage key for the previous version of
 * the app. Used for showing changelog
 */
export const LAST_VERSION_KEY = "LAST_VERSION";
/**
 * AsyncStorage key for the number of times the
 * user has opened the app.
 */
export const SESSIONS_KEY = "NUM_SESSIONS";

/**
 * AsyncStorage key for whether we've fetched
 * the user's purchase history from RevenueCat
 */
export const RESTORED_KEY = "RESTORED_PURCHASES";

/**
 * AsyncStorage key for whether the rating request
 * dialog has been shown
 */
export const SHOWN_KEY = "ALREADY_SHOWN";

/**
 * Has the honorific toggle on Conjugations Page
 * been used
 */
export const HONORIFIC_TOGGLED_KEY = "HONORIFIC_TOGGLED";

export type PageVisitKey = `${PageName}_VISIT_COUNT`;

export type PopupShownKey = `${string}_POPUP_SHOWN`;

export type AsyncStorageKey =
  | typeof USER_ID_KEY
  | typeof FAVORITES_KEY
  | typeof LAST_VERSION_KEY
  | typeof SESSIONS_KEY
  | typeof RESTORED_KEY
  | typeof SHOWN_KEY
  | typeof HONORIFIC_TOGGLED_KEY
  | PageVisitKey
  | PopupShownKey;

export const convertToInt = (val: string | null) => (val ? parseInt(val) : 0);

export const convertToObj = (val: string | null) =>
  val ? JSON.parse(val) : null;

export const convertToBool = (val: string | null) => val === "true";

export const getAsyncStorage = async <
  T extends "string" | "number" | "boolean" | "object"
>(
  key: AsyncStorageKey,
  type: T
): Promise<
  T extends "string"
    ? string | null
    : T extends "number"
    ? number
    : T extends "boolean"
    ? boolean
    : unknown
> => {
  const val = await AsyncStorage.getItem(key);
  let newVal;
  switch (type) {
    case "string":
      newVal = val as string;
      break;
    case "number":
      newVal = val ? parseInt(val) : 0;
      break;
    case "boolean":
      newVal = val === "true";
      break;
    default:
      newVal = val ? JSON.parse(val) : null;
      break;
  }
  return newVal;
};

export const setAsyncStorage = async (
  key: AsyncStorageKey,
  val: string | number | boolean | object
) => {
  const valType = typeof val;

  let newVal: string;
  switch (valType) {
    case "string":
      newVal = val as string;
      break;
    case "number":
      newVal = val.toString();
      break;
    case "boolean":
      newVal = val ? "true" : "false";
      break;
    default:
      newVal = JSON.stringify(val);
      break;
  }

  await AsyncStorage.setItem(key, newVal);
};
