import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Dialog, Portal, Subheading, Text } from "react-native-paper";
import changelogRaw from "./change-log.json";

export interface ChangelogUpdate {
  name: string;
  date: string;
  features: string[];
}

export interface ChangeLogProps
  extends Omit<ComponentProps<typeof Dialog>, "children" | "visible"> {
  currentVersion: string;
}

const LAST_VERSION_KEY = "LAST_VERSION";

const changelog = changelogRaw as Record<string, ChangelogUpdate | null>;

const ChangeLog: FC<ChangeLogProps> = ({ currentVersion, ...rest }) => {
  const [update, setUpdate] = useState<ChangelogUpdate | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const lastVersion = await AsyncStorage.getItem(LAST_VERSION_KEY);

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
      <Dialog visible={visible} onDismiss={onDismiss} {...rest}>
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
