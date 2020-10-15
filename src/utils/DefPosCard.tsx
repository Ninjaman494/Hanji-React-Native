import { Entry } from "../hooks/useGetEntry";
import React from "react";
import BaseCard from "./BaseCard";
import { Headline, List, Subheading } from "react-native-paper";

export interface DefPosCardProps {
  entry: Entry;
}

const DefPosCard: React.FC<DefPosCardProps> = ({ entry }) => (
  <BaseCard style={{ margin: 8 }}>
    <Headline style={{ paddingLeft: 16 }}>{entry.term}</Headline>
    <Subheading style={{ paddingLeft: 16 }}>{entry.pos}</Subheading>
    <List.Section>
      {entry.definitions.map((definition, index) => (
        <List.Item
          title={definition}
          style={{ paddingVertical: 0 }}
          key={index}
        />
      ))}
    </List.Section>
  </BaseCard>
);

export default DefPosCard;
