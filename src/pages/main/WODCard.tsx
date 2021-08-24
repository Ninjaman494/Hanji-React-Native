import BaseCard, { BaseCardProps } from "components/BaseCard";
import useGetWOD from "hooks/useGetWOD";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useHistory } from "react-router";

const WODCard: FC<BaseCardProps> = (props) => {
  const history = useHistory();
  const { colors } = useTheme();

  const { data, loading, error } = useGetWOD();

  const wod = data?.wordOfTheDay;

  let text = "Loading...";
  if (wod) {
    text = wod.term;
  } else if (error) {
    text = "Could not fetch Word of the Day";
  }

  return (
    <BaseCard title="Word of the Day" {...props}>
      <Text
        style={[styles.text, { color: loading ? colors.grey : colors.text }]}
        selectable
      >
        {text}
      </Text>
      <Card.Actions style={styles.actions}>
        <Button
          onPress={() => history.push(`/display?id=${wod?.id}`)}
          disabled={loading || !!error}
          color={colors?.accent}
        >
          See entry
        </Button>
      </Card.Actions>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 16,
    textAlign: "center",
    fontSize: 32,
  },
  actions: {
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
});

export default WODCard;
