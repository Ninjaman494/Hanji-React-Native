import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect, useState } from "react";
import { Dialog, Paragraph, Portal } from "react-native-paper";

export interface RatingDialog {
  numSessions: number;
}

const SESSIONS_KEY = "NUM_SESSIONS";
const SHOWN_KEY = "ALREADY_SHOWN";

const RatingDialog: FC<RatingDialog> = ({ numSessions }) => {
  const [sessionCount, setSessionCount] = useState(0);
  const [alreadyShown, isAlreadyShown] = useState(false);

  useEffect(() => {
    (async () => {
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      const shownString = await AsyncStorage.getItem(SHOWN_KEY);

      const sessions = sessionString ? parseInt(sessionString) + 1 : 1;
      await AsyncStorage.setItem(SESSIONS_KEY, sessions.toString());
      setSessionCount(sessions);

      isAlreadyShown(shownString === "true");
    })();
  }, [SESSIONS_KEY, setSessionCount]);

  return (
    <Portal>
      <Dialog
        visible={sessionCount >= numSessions && !alreadyShown}
        onDismiss={async () => {
          isAlreadyShown(true);
          AsyncStorage.setItem(SHOWN_KEY, "true");
        }}
      >
        <Dialog.Title>Leave a Review</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Hello</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default RatingDialog;
