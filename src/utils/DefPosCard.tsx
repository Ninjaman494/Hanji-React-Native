import { Entry } from "../hooks/useGetEntry";
import React from "react";
import BaseCard from "./BaseCard";
import { Headline, List, Subheading, useTheme } from "react-native-paper";
import ListItem from "./ListItem";
import { StyleProp, ViewStyle } from "react-native";

export interface DefPosCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
}

const DefPosCard: React.FC<DefPosCardProps> = ({ entry, style }) => {
  const { padding } = useTheme();
  const textStyle = { paddingLeft: padding.horizontal };

  return (
    <BaseCard style={style}>
      <Headline style={textStyle}>{entry.term}</Headline>
      <Subheading style={textStyle}>{entry.pos}</Subheading>
      <List.Section>
        {entry.definitions.map((definition, index) => (
          <ListItem title={definition} key={index} />
        ))}
      </List.Section>
    </BaseCard>
  );
};

export default DefPosCard;
