import React from "react";
import { Conjugation } from "../hooks/useConjugations";
import { Badge, Text, Title, useTheme } from "react-native-paper";
import { View } from "react-native";
import BaseCard from "../components/BaseCard";

export type ConjInfoCardProps = {
  conjugation: Conjugation;
};

const ConjInfoCard: React.FC<ConjInfoCardProps> = ({ conjugation }) => {
  const { colors, padding } = useTheme();

  const styles = {
    card: {
      marginHorizontal: padding?.horizontal,
    },
    badge: {
      paddingHorizontal: padding?.horizontal,
      marginRight: padding?.horizontal,
      backgroundColor: colors?.accent,
    },
    title: {
      fontSize: 18,
      color: colors?.primary,
      marginTop: 16,
      marginBottom: padding?.vertical,
    },
    conjugation: {
      fontSize: 24,
      marginTop: -16,
    },
    text: {
      fontSize: 20,
    },
    secondary: {
      fontSize: 18,
      color: "#808080",
    },
  };

  const reasons = conjugation?.reasons.map((reason) => {
    const index = reason.indexOf("(");
    return {
      type: reason.substring(0, index),
      details: reason.substring(index),
    };
  });

  return (
    <BaseCard
      title={conjugation?.name}
      style={styles.card}
      rightIcon={() => (
        <Badge size={30} visible={conjugation?.honorific} style={styles.badge}>
          Honorific
        </Badge>
      )}
    >
      <View style={{ paddingHorizontal: padding?.horizontal }}>
        <Text style={styles.conjugation}>{conjugation?.conjugation}</Text>
        <Title style={styles.title}>Pronunciation</Title>
        <Text style={styles.text}>{conjugation?.pronunciation}</Text>
        <Text style={styles.secondary}>{conjugation?.romanization}</Text>
        <Title style={styles.title}>Explanation</Title>
        {reasons.map((reason, index) => (
          <View style={{ marginBottom: padding?.vertical }} key={index}>
            <Text style={styles.text}>{reason.type}</Text>
            <Text style={styles.secondary}>{reason.details}</Text>
          </View>
        ))}
      </View>
    </BaseCard>
  );
};

export default ConjInfoCard;
