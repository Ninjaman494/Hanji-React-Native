import { ApolloError } from "@apollo/client";
import React, { ComponentProps, FC, useEffect } from "react";
import { Button, Dialog, Text } from "react-native-paper";
import { Native } from "sentry-expo";

export interface ErrorDialog
  extends Omit<ComponentProps<typeof Dialog>, "children"> {
  error: ApolloError;
}

const ErrorDialog: FC<ErrorDialog> = ({ error, ...rest }) => {
  useEffect(() => {
    if (error) {
      Native.captureException(error);
    }
  }, [error]);

  return (
    <Dialog {...rest}>
      <Dialog.Title>An Error Occurred</Dialog.Title>
      <Dialog.Content>
        <Text>Error: {JSON.stringify(error, null, 2)}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={rest.onDismiss}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ErrorDialog;
