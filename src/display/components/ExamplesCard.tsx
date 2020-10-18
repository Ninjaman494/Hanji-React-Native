import { List } from "react-native-paper";
import ListItem from "../../components/ListItem";
import BaseCard, { BaseCardProps } from "../../components/BaseCard";
import React from "react";

export type ExamplesCardProps = BaseCardProps & {
  examples: {
    sentence: string;
    translation: string;
  }[];
};

const ExamplesCard: React.FC<ExamplesCardProps> = ({ examples, ...rest }) => (
  <BaseCard title="Examples" {...rest}>
    <List.Section>
      {examples.map((example, index) => (
        <ListItem
          title={example.sentence}
          description={example.translation}
          key={index}
          testID="examplesCardItem"
        />
      ))}
    </List.Section>
  </BaseCard>
);

export default ExamplesCard;
