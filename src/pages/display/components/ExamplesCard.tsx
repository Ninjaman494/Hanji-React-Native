import { BaseCard, BaseCardProps, ListItem } from "components";
import React from "react";
import { List } from "react-native-paper";

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
        />
      ))}
    </List.Section>
  </BaseCard>
);

export default ExamplesCard;
