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
      <Dialog.Title>Error Occurred</Dialog.Title>
      <Dialog.Content>
        <Text>
          An error occurred. Please try again later or contact support.
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={rest.onDismiss}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ErrorDialog;
