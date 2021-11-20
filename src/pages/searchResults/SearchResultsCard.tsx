import { BaseCard, ListItem } from "components";
import { Entry } from "hooks/useGetEntry";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Headline, List, Subheading, useTheme } from "react-native-paper";

export interface SearchResultsCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const SearchResultsCard: React.FC<SearchResultsCardProps> = ({
  entry,
  style,
  onPress,
}) => {
  const { padding } = useTheme();
  const styles = StyleSheet.create({
    text: { paddingLeft: padding?.horizontal },
  });

  const definitions = entry.definitions.slice(0, 2);
  if (entry.definitions.length > 2) {
    definitions.push(`+${entry.definitions.length - 2} More`);
  }

  return (
    <BaseCard style={style} btnText="See Entry" onBtnPress={onPress}>
      <Headline style={styles.text}>{entry.term}</Headline>
      <Subheading style={styles.text}>{entry.pos}</Subheading>
      <List.Section>
        {definitions.map((definition, index) => (
          <ListItem title={definition} key={index} />
        ))}
      </List.Section>
    </BaseCard>
  );
};

export default SearchResultsCard;
