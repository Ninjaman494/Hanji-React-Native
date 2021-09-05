import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

export interface HonorificSwitchProps {
  honorific: boolean;
  onPress: (value: boolean) => void;
}

const HonorificSwitch: FC<HonorificSwitchProps> = ({ honorific, onPress }) => {
  const { padding, colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    switchBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: padding?.horizontal,
      paddingBottom: 8,
      backgroundColor: colors?.primary,
    },
    switchText: {
      fontSize: textSizes?.secondary,
      color: "white",
    },
  });

  return (
    <View style={styles.switchBar}>
      <Text style={styles.switchText}>
        {honorific ? "Honorific" : "Regular"} Forms
      </Text>
      <Switch
        value={honorific}
        thumbColor="white"
        trackColor={{ false: colors?.primaryDark, true: "#FFFFFF88" }}
        onValueChange={onPress}
      />
    </View>
  );
};

export default HonorificSwitch;
