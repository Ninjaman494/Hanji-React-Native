import { useNavigation } from "@react-navigation/native";
import { BaseCard, ListItem } from "components";
import { Entry } from "hooks/useGetEntry";
import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  Headline,
  List,
  Subheading,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { NavigationProps, PageName } from "typings/navigation";

export interface SearchResultsCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
}

const SearchResultsCard: React.FC<SearchResultsCardProps> = ({
  entry,
  style,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const { padding } = useTheme();
  const styles = StyleSheet.create({
    text: { paddingLeft: padding?.horizontal },
  });

  const definitions = entry.definitions.slice(0, 2);
  if (entry.definitions.length > 2) {
    definitions.push(`+${entry.definitions.length - 2} More`);
  }

  const onPress = useCallback(
    () => navigation.push(PageName.DISPLAY, { entryId: entry.id }),
    [navigation, entry.id]
  );

  return (
    <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
      <BaseCard style={style} btnProps={{ text: "See Entry", onPress }}>
        <Headline style={styles.text}>{entry.term}</Headline>
        <Subheading style={styles.text}>{entry.pos}</Subheading>
        <List.Section>
          {definitions.map((definition, index) => (
            <ListItem title={definition} key={index} />
          ))}
        </List.Section>
      </BaseCard>
    </TouchableRipple>
  );
};

export default SearchResultsCard;
