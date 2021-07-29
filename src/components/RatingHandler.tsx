import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect } from "react";
import Rate, { AndroidMarket } from "react-native-rate";

export interface RatingDialog {
  numSessions: number;
}

const SESSIONS_KEY = "NUM_SESSIONS";
const SHOWN_KEY = "ALREADY_SHOWN";

export const ratingOptions = {
  AppleAppID: "TO-DO",
  GooglePackageName: "com.a494studios.koreanconjugator",
  AmazonPackageName: "com.a494studios.koreanconjugator",
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  fallbackPlatformURL:
    "https://play.google.com/store/apps/details?id=com.a494studios.koreanconjugator",
};

const RatingHandler: FC<RatingDialog> = ({ numSessions }) => {
  useEffect(() => {
    (async () => {
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      const shownString = await AsyncStorage.getItem(SHOWN_KEY);

      const sessions = sessionString ? parseInt(sessionString) + 1 : 1;
      await AsyncStorage.setItem(SESSIONS_KEY, sessions.toString());

      if (shownString !== "true" && sessions >= numSessions) {
        Rate.rate(
          ratingOptions,
          async (success) =>
            await AsyncStorage.setItem(SHOWN_KEY, success.toString())
        );
      }
    })();
  }, [SESSIONS_KEY, numSessions]);

  return null;
};

export default RatingHandler;
