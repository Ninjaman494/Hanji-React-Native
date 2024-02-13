import { ApolloError } from "@apollo/client";
import { captureException } from "@sentry/react-native";
import React, { ComponentProps, FC, useEffect } from "react";
import { Button, Dialog, Text } from "react-native-paper";

export interface ErrorDialog
  extends Omit<ComponentProps<typeof Dialog>, "children"> {
  error?: ApolloError;
}

const ErrorDialog: FC<ErrorDialog> = ({ error, ...rest }) => {
  useEffect(() => {
    if (error && error.networkError?.message !== "Network request failed") {
      captureException(error, { extra: { error } });
    }
  }, [error]);

  return (
    <Dialog {...rest}>
      <Dialog.Title>Error Occurred</Dialog.Title>
      <Dialog.Content>
        <Text>
          {error?.message || "An error occurred"}. Please try again later or
          contact support.
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={rest.onDismiss}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ErrorDialog;
