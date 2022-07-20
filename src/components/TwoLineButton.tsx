import React, { FC } from "react";
import { GestureResponderEvent, StyleSheet, ViewProps } from "react-native";
import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";

export interface TwoLineButtonProps extends ViewProps {
  title: string;
  description: string;
  onPress: (e: GestureResponderEvent) => void;
}

const TwoLineButton: FC<TwoLineButtonProps> = ({
  onPress,
  title,
  description,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    surface: {
      backgroundColor: colors.accent,
      borderRadius: 10,
    },
    title: {
      color: "white",
      fontSize: 18,
      textAlign: "center",
    },
    description: {
      color: "#FDC2CC",
      fontSize: 14,
      textAlign: "center",
    },
  });

  return (
    <Surface style={[style, styles.surface]} elevation={4} {...rest}>
      <TouchableRipple
        borderless
        onPress={onPress}
        rippleColor="rgba(0, 0, 0, .12)"
        style={{ padding: 16, borderRadius: 10 }}
      >
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </>
      </TouchableRipple>
    </Surface>
  );
};

export default TwoLineButton;
