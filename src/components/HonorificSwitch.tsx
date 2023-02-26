import React, { FC } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

export interface HonorificSwitchProps {
  honorific: boolean;
  onPress: (value: boolean) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
}

const HonorificSwitch: FC<HonorificSwitchProps> = ({
  honorific,
  onPress,
  onLayout,
}) => {
  const { padding, colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    switchBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: padding?.horizontal,
      paddingBottom: 8,
      backgroundColor: colors?.primary,
      zIndex: 100,
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
        onLayout={onLayout}
      />
    </View>
  );
};

export default HonorificSwitch;
