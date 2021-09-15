import { BaseCard, ListItem } from "components";
import { Entry } from "hooks/useGetEntry";
import React, { useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Headline, List, Subheading, useTheme } from "react-native-paper";

export interface DefPosCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
}

const DefPosCard: React.FC<DefPosCardProps> = ({ entry, style }) => {
  const { padding } = useTheme();
  const [showingMore, setShowMore] = useState(false);
  const styles = StyleSheet.create({
    text: { paddingLeft: padding.horizontal },
  });

  let definitions = entry.definitions;
  if (!showingMore) {
    definitions = definitions.slice(0, 3); // show first 3 only
  }

  return (
    <BaseCard
      style={style}
      // Used to show/hide button
      btnText={
        entry.definitions.length > 3
          ? !showingMore
            ? "Show More"
            : "Collapse"
          : undefined
      }
      onBtnPress={() => setShowMore(!showingMore)}
    >
      <Headline testID="defPosCardTerm" style={styles.text} selectable>
        {entry.term}
      </Headline>
      <Subheading testID="defPosCardPos" style={styles.text}>
        {entry.pos}
      </Subheading>
      <List.Section>
        {definitions.map((definition, index) => (
          <ListItem title={definition} key={index} testID="defPosCardDef" />
        ))}
      </List.Section>
    </BaseCard>
  );
};

export default DefPosCard;
