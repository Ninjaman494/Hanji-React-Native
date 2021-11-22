import React, { ComponentProps, FC } from "react";
import { Button, Dialog, Text, useTheme } from "react-native-paper";

export interface NoResultsModalProps
  extends Omit<ComponentProps<typeof Dialog>, "children"> {
  query: string;
  onConjugatorPress: () => void;
}

const NoResultsModal: FC<NoResultsModalProps> = ({
  query,
  onConjugatorPress,
  ...rest
}) => {
  const { textSizes } = useTheme();
  const isAdjVerb = query.includes("다");

  return (
    <Dialog {...rest}>
      <Dialog.Title>No Results Found</Dialog.Title>
      <Dialog.Content>
        <Text style={{ fontSize: textSizes?.secondary }}>
          We couldn't find anything matching "{query}".
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={rest.onDismiss}>OK</Button>
        {isAdjVerb && (
          <Button onPress={onConjugatorPress}>Use Conjugator</Button>
        )}
      </Dialog.Actions>
    </Dialog>
  );
};

export default NoResultsModal;
