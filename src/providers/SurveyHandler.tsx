import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export interface SurveyHandlerProps
  extends Omit<ComponentProps<typeof Dialog>, "children" | "visible"> {
  numSessions: number;
}

const FILLED_OUT_KEY = "FILLED_OUT";
const LAST_ASKED_KEY = "LAST_ASKED";

const SurveyHandler: FC<SurveyHandlerProps> = ({ numSessions, ...rest }) => {
  const { sessionCount } = useGetAdFreeStatus();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      // Wait till sessionCount is fetched or we have enough sessions
      if (sessionCount < numSessions) return;

      const shownSurveyStr = await AsyncStorage.getItem(FILLED_OUT_KEY);
      const shownSurvey = shownSurveyStr === "true";

      const lastAskedStr = await AsyncStorage.getItem(LAST_ASKED_KEY);
      const lastAsked = lastAskedStr ? new Date(parseInt(lastAskedStr)) : null;

      // 432000000 == 5 days in milliseconds
      setVisible(
        !shownSurvey &&
          (!lastAsked || Date.now() - lastAsked.getTime() >= 432000000)
      );
    })();
  }, [sessionCount, setVisible]);

  const updateSurveyState = async (isFilled: boolean) => {
    await AsyncStorage.setItem(FILLED_OUT_KEY, isFilled ? "true" : "false");
    setVisible(false);
  };

  const onDismiss = async () => {
    updateSurveyState(false);
    await AsyncStorage.setItem(LAST_ASKED_KEY, Date.now().toString());
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} {...rest}>
        <Dialog.Title>Survey Request</Dialog.Title>
        <Dialog.Content>
          <Text>Would you fill out our survey please?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => updateSurveyState(true)}>Ok</Button>
          <Button onPress={onDismiss}>Ask again later</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SurveyHandler;
