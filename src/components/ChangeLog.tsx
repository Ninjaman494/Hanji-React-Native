import React, { ComponentProps, FC, useCallback, useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export type ChangeLogProps = Omit<
  ComponentProps<typeof Dialog>,
  "children" | "visible"
>;

const ChangeLog: FC<ChangeLogProps> = (props) => {
  const [visibile, setVisible] = useState(true);

  const onDismiss = useCallback(() => setVisible(false), [setVisible]);
  return (
    <Portal>
      <Dialog visible={visibile} onDismiss={onDismiss} {...props}>
        <Dialog.Title>What's New</Dialog.Title>
        <Dialog.Content>
          <Text>Hello World!</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangeLog;
