import { BaseCard, HonorificBadge } from "components";
import { Conjugation } from "hooks/useConjugations";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Title, useTheme } from "react-native-paper";
import toTitleCase from "utils/toTitleCase";

export type ConjInfoCardProps = {
  conjugation: Conjugation;
};

const ConjInfoCard: React.FC<ConjInfoCardProps> = ({ conjugation }) => {
  const { colors, padding, textSizes } = useTheme();

  const styles = StyleSheet.create({
    card: {
      marginHorizontal: padding?.horizontal,
      marginBottom: 8,
    },
    title: {
      fontSize: textSizes?.cardTitle,
      fontWeight: "400",
      color: colors?.primary,
      marginTop: 16,
      marginBottom: padding?.vertical,
    },
    conjugation: {
      fontSize: 24,
      marginTop: -24,
    },
    text: {
      fontSize: 20,
    },
    secondary: {
      fontSize: 18,
      color: "#808080",
    },
  });

  const reasons = conjugation?.reasons.map((reason) => {
    const index = reason.indexOf("(");
    return {
      type: reason.substring(0, index),
      details: reason.substring(index),
    };
  });

  return (
    <BaseCard
      title={toTitleCase(conjugation?.name)}
      style={styles.card}
      rightIcon={() => <HonorificBadge visible={conjugation?.honorific} />}
    >
      <View style={{ paddingHorizontal: padding?.horizontal }}>
        <Text style={styles.conjugation} selectable>
          {conjugation?.conjugation}
        </Text>
        <Title style={styles.title}>Pronunciation</Title>
        <Text style={styles.text} selectable>
          {conjugation?.pronunciation}
        </Text>
        <Text style={styles.secondary} selectable>
          {conjugation?.romanization}
        </Text>
        <Title style={styles.title}>Explanation</Title>
        {reasons.map((reason, index) => (
          <View style={{ marginBottom: padding?.vertical }} key={index}>
            <Text style={styles.text} selectable>
              {reason.type}
            </Text>
            <Text style={styles.secondary} selectable>
              {reason.details}
            </Text>
          </View>
        ))}
      </View>
    </BaseCard>
  );
};

export default ConjInfoCard;
