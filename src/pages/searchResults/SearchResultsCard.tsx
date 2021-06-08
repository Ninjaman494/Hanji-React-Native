import React from "react";
import { Headline, List, Subheading, useTheme } from "react-native-paper";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Entry } from "hooks/useGetEntry";
import BaseCard from "components/BaseCard";
import ListItem from "components/ListItem";
import { useHistory } from "react-router";

export interface SearchResultsCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
}

const SearchResultsCard: React.FC<SearchResultsCardProps> = ({
  entry,
  style,
}) => {
  const history = useHistory();
  const { padding } = useTheme();
  const styles = StyleSheet.create({
    text: { paddingLeft: padding?.horizontal },
  });

  const definitions = entry.definitions.slice(0, 2);
  if (entry.definitions.length > 2) {
    definitions.push(`+${entry.definitions.length - 2} More`);
  }

  return (
    <BaseCard
      style={style}
      btnText="See Entry"
      onBtnPress={() => history.push(`/display?id=${entry.id}`)}
    >
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
