import * as StoreReview from "expo-store-review";
import { FC, useEffect } from "react";
import {
  getAsyncStorage,
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
      const wasShown = await getAsyncStorage(SHOWN_KEY, "boolean");
      const sessions = (await getAsyncStorage(SESSIONS_KEY, "number")) + 1;
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
