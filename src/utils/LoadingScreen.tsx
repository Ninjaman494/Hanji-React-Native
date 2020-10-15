import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline, ProgressBar, useTheme } from "react-native-paper";

export interface LoadingScreenProps {
  text: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Headline style={styles.loadingText}>{text}</Headline>
      <ProgressBar indeterminate color={colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  loadingText: {
    textAlign: "center",
    paddingBottom: 16,
  },
});

export default LoadingScreen;
