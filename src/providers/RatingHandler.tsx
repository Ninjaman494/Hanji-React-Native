import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { FC, useEffect } from "react";
import {
  convertToBool,
  convertToInt,
  SESSIONS_KEY,
  setAsyncStorage,
  SHOWN_KEY,
} from "utils/asyncStorageHelper";

export interface RatingDialog {
  numSessions: number;
}

const RatingHandler: FC<RatingDialog> = ({ numSessions }) => {
  useEffect(() => {
    (async () => {
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      const shownString = await AsyncStorage.getItem(SHOWN_KEY);

      const wasShown = convertToBool(shownString);
      const sessions = convertToInt(sessionString) + 1;
      await setAsyncStorage(SESSIONS_KEY, sessions);

      if (!wasShown && sessions >= numSessions) {
        if (await StoreReview.hasAction()) {
          await StoreReview.requestReview();
          await setAsyncStorage(SHOWN_KEY, true);
        }
      }
    })();
  }, [SESSIONS_KEY, numSessions]);

  return null;
};

export default RatingHandler;
