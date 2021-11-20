import BaseCard, { BaseCardProps } from "components/BaseCard";
import useGetWOD from "hooks/useGetWOD";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface WODCardProps extends Omit<BaseCardProps, "onBtnPress"> {
  onSeeEntry: (entryId: string) => void;
}

const WODCard: FC<WODCardProps> = ({ onSeeEntry, ...rest }) => {
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
    <BaseCard
      title="Word of the Day"
      btnText="See entry"
      onBtnPress={() => onSeeEntry(wod?.id as string)}
      {...rest}
    >
      <Text
        style={[styles.text, { color: loading ? colors.grey : colors.text }]}
        selectable
      >
        {text}
      </Text>
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
