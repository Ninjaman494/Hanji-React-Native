import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
export interface SurveyHandlerProps
  extends Omit<ComponentProps<typeof Dialog>, "children" | "visible"> {
  numSessions: number;
}

const SurveyHandler: FC<SurveyHandlerProps> = ({ numSessions, ...rest }) => {
  const { sessionCount } = useGetAdFreeStatus();
  const [visible, setVisible] = useState(false);

  useEffect(
    () => setVisible(sessionCount >= numSessions),
    [sessionCount, setVisible]
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)} {...rest}>
        <Dialog.Title>Survey Request</Dialog.Title>
        <Dialog.Content>
          <Text>Would you fill out our survey please?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button>Ok</Button>
          <Button>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SurveyHandler;
