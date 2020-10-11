import { Card, List } from "react-native-paper";
import React from "react";
import { Entry } from "../hooks/getEntry";

interface EntryCardProps {
  entry: Entry;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  return (
    <Card>
      <Card.Title title={entry.term} subtitle={entry.pos} />
      <Card.Content>
        <List.Section>
          <List.Subheader>Definitions</List.Subheader>
          {entry.definitions.map((definition) => (
            <List.Item title={definition} />
          ))}
        </List.Section>
        {entry.synonyms && (
          <List.Section>
            <List.Subheader>Synonyms</List.Subheader>
            {entry.synonyms?.map((synonym) => (
              <List.Item title={synonym} />
            ))}
          </List.Section>
        )}
        {entry.antonyms && (
          <List.Section>
            <List.Subheader>Antonyms</List.Subheader>
            {entry.antonyms?.map((antonym) => (
              <List.Item title={antonym} />
            ))}
          </List.Section>
        )}
        {entry.examples && (
          <List.Section>
            <List.Subheader>Examples</List.Subheader>
            {entry.examples?.map((example) => (
              <List.Item
                title={example.sentence}
                description={example.translation}
              />
            ))}
          </List.Section>
        )}
      </Card.Content>
    </Card>
  );
};

export default EntryCard;
