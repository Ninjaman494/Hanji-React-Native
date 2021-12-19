import AsyncStorage from "@react-native-async-storage/async-storage";
import changelog, { ChangelogUpdate } from "changelog";
import * as Application from "expo-application";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Dialog, Portal, Subheading, Text } from "react-native-paper";

export type ChangeLogProps = Omit<
  ComponentProps<typeof Dialog>,
  "children" | "visible"
>;

const LAST_VERSION_KEY = "LAST_VERSION";

const ChangeLog: FC<ChangeLogProps> = (props) => {
  const [update, setUpdate] = useState<ChangelogUpdate | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const lastVersion = await AsyncStorage.getItem(LAST_VERSION_KEY);
      const currentVersion = Application.nativeBuildVersion;

      if (!!lastVersion && lastVersion !== currentVersion) {
        setVisible(true);
        setUpdate(changelog[currentVersion as string]);
      }
      await AsyncStorage.setItem(LAST_VERSION_KEY, currentVersion as string);
    })();
  }, [setUpdate, setVisible]);

  const onDismiss = useCallback(() => setVisible(false), [setUpdate]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} {...props}>
        <Dialog.Title>What's New</Dialog.Title>
        <Dialog.Content>
          <Subheading>
            <Text style={{ fontWeight: "bold" }}>{update?.name}</Text>
            <Text> ({update?.date})</Text>
          </Subheading>
          {update?.features.map((f) => (
            <Text key={f} style={{ marginBottom: 4 }}>{`\u2022 ${f}`}</Text>
          ))}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangeLog;
