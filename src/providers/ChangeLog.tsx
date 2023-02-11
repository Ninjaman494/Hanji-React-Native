import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Modal } from "react-native";
import { Button, Dialog, Subheading, Text } from "react-native-paper";
import { getAsyncStorage, LAST_VERSION_KEY } from "utils/asyncStorageHelper";
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

const changelog = changelogRaw as Record<string, ChangelogUpdate | null>;

const ChangeLog: FC<ChangeLogProps> = ({ currentVersion, ...rest }) => {
  const [update, setUpdate] = useState<ChangelogUpdate | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const update = changelog[currentVersion as string];
      const lastVersion = await getAsyncStorage(LAST_VERSION_KEY, "string");

      if (!!update && lastVersion !== currentVersion) {
        setVisible(true);
        setUpdate(update);
      }
      await AsyncStorage.setItem(LAST_VERSION_KEY, currentVersion as string);
    })();
  }, [setUpdate, setVisible]);

  const onDismiss = useCallback(() => setVisible(false), [setUpdate]);

  return (
    <Modal visible={visible} transparent onRequestClose={onDismiss}>
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
    </Modal>
  );
};

export default ChangeLog;
