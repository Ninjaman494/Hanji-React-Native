import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { SurveyState, SURVEYS_KEY } from "./UserProvider";

export interface SurveyHandlerProps
  extends Omit<ComponentProps<typeof Dialog>, "children" | "visible"> {
  numSessions: number;
}

const { NOT_ASKED, ASK_AGAIN, DONT_ASK_AGAIN } = SurveyState;

const SurveyHandler: FC<SurveyHandlerProps> = ({ numSessions, ...rest }) => {
  const { sessionCount, surveyState } = useGetAdFreeStatus();
  const [visible, setVisible] = useState(false);

  const notAsked = surveyState === NOT_ASKED;

  useEffect(
    () =>
      setVisible(sessionCount >= numSessions && surveyState !== DONT_ASK_AGAIN),
    [sessionCount, surveyState, setVisible]
  );

  const updateSurveyState = async (state: SurveyState) => {
    await AsyncStorage.setItem(SURVEYS_KEY, state);
    setVisible(false);
  };

  const onDismiss = async () =>
    updateSurveyState(notAsked ? ASK_AGAIN : DONT_ASK_AGAIN);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} {...rest}>
        <Dialog.Title>Survey Request</Dialog.Title>
        <Dialog.Content>
          <Text>Would you fill out our survey please?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => updateSurveyState(DONT_ASK_AGAIN)}>Ok</Button>
          <Button onPress={onDismiss}>
            {notAsked ? "Ask again later" : "Don't ask again"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SurveyHandler;
