import React from "react";
import { Text, Title, useTheme } from "react-native-paper";
import AppLayout from "../components/AppLayout";
//@ts-ignore
import { useLocation } from "../routing";
import BaseCard from "../components/BaseCard";
import { Conjugation } from "../hooks/useConjugations";
import { View } from "react-native";

const ConjInfoPage: React.FC = () => {
  const conjugation: Conjugation = useLocation().state.conjugation;
  const { colors, padding } = useTheme();

  const styles = {
    card: {
      marginHorizontal: padding.horizontal,
    },
    title: {
      fontSize: 18,
      color: colors?.primary,
      marginTop: 16,
      marginBottom: padding.vertical,
    },
    conjugation: {
      fontSize: 24,
      marginTop: 0,
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
    <AppLayout error={conjugation ? undefined : "Something went wrong"}>
      <BaseCard title={conjugation?.name} style={styles.card}>
        <View style={{ paddingHorizontal: padding.horizontal }}>
          <Text style={styles.conjugation}>{conjugation?.conjugation}</Text>
          <Title style={styles.title}>Pronunciation</Title>
          <Text style={styles.text}>{conjugation?.pronunciation}</Text>
          <Text style={styles.secondary}>{conjugation?.romanization}</Text>
          <Title style={styles.title}>Explanation</Title>
          {reasons.map((reason) => (
            <View style={{ marginBottom: padding.vertical }}>
              <Text style={styles.text}>{reason.type}</Text>
              <Text style={styles.secondary}>{reason.details}</Text>
            </View>
          ))}
        </View>
      </BaseCard>
    </AppLayout>
  );
};

export default ConjInfoPage;
