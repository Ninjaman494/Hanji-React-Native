import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { FC, useEffect } from "react";
import { SESSIONS_KEY, SHOWN_KEY } from "utils/asyncStorageKeys";

export interface RatingDialog {
  numSessions: number;
}

const RatingHandler: FC<RatingDialog> = ({ numSessions }) => {
  useEffect(() => {
    (async () => {
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      const shownString = await AsyncStorage.getItem(SHOWN_KEY);

      const sessions = sessionString ? parseInt(sessionString) + 1 : 1;
      await AsyncStorage.setItem(SESSIONS_KEY, sessions.toString());

      if (shownString !== "true" && sessions >= numSessions) {
        if (await StoreReview.hasAction()) {
          await StoreReview.requestReview();
          await AsyncStorage.setItem(SHOWN_KEY, "true");
        }
      }
    })();
  }, [SESSIONS_KEY, numSessions]);

  return null;
};

export default RatingHandler;
