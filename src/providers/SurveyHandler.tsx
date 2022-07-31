import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { NavigationProps } from "typings/navigation";

export type SurveyHandlerProps = Omit<
  ComponentProps<typeof Dialog>,
  "children" | "visible"
>;

const NUM_SESSIONS = 5;
const LAST_ASKED_TIME = 432000000; // 5 days in milliseconds
const FILLED_OUT_KEY = "FILLED_OUT";
const LAST_ASKED_KEY = "LAST_ASKED";

/**
 * Ask the user to fill out a survey after NUM_SESSIONS. If
 * they say yes, don't ask again. If they say no, wait 5
 * days and ask again. Keep asking until they say yes
 *
 */
const SurveyHandler: FC<SurveyHandlerProps> = (props) => {
  const navigation = useNavigation<NavigationProps>();

  const { sessionCount } = useGetAdFreeStatus();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      // Wait till sessionCount is fetched or we have enough sessions
      if (sessionCount < NUM_SESSIONS) return;

      const shownSurveyStr = await AsyncStorage.getItem(FILLED_OUT_KEY);
      const shownSurvey = shownSurveyStr === "true";

      const lastAskedStr = await AsyncStorage.getItem(LAST_ASKED_KEY);
      const lastAsked = lastAskedStr ? new Date(parseInt(lastAskedStr)) : null;

      setVisible(true);
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
      <Dialog visible={visible} onDismiss={onDismiss} {...props}>
        <Dialog.Title>We need your feedback!</Dialog.Title>
        <Dialog.Content>
          <Text>
            Would you mind filling out a short 4 question survey? Your feedback
            helps us make Hanji even better for users like you.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Later</Button>
          <Button
            onPress={() => {
              updateSurveyState(true);
              // push won't work b/c we're outside StackNavigator
              navigation.navigate("Survey");
            }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SurveyHandler;
