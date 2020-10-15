import { Entry } from "../hooks/useGetEntry";
import React from "react";
import BaseCard from "./BaseCard";
import { Headline, List, Subheading } from "react-native-paper";
import ListItem from "./ListItem";
import { StyleProp, ViewStyle } from "react-native";

export interface DefPosCardProps {
  entry: Entry;
  style?: StyleProp<ViewStyle>;
}

const DefPosCard: React.FC<DefPosCardProps> = ({ entry, style }) => (
  <BaseCard style={style}>
    <Headline style={{ paddingLeft: 16 }}>{entry.term}</Headline>
    <Subheading style={{ paddingLeft: 16 }}>{entry.pos}</Subheading>
    <List.Section>
      {entry.definitions.map((definition, index) => (
        <ListItem title={definition} key={index} />
      ))}
    </List.Section>
  </BaseCard>
);

export default DefPosCard;
