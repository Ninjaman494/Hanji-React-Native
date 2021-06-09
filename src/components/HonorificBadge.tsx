import React from "react";
import { ViewStyle } from "react-native";
import { Badge, useTheme } from "react-native-paper";

export interface HonorificBadgeProps {
  visible?: boolean;
  style?: ViewStyle;
}

const HonorificBadge: React.FC<HonorificBadgeProps> = ({ visible, style }) => {
  const { colors, padding } = useTheme();

  return (
    <Badge
      size={30}
      visible={!!visible}
      style={{
        paddingHorizontal: padding?.horizontal,
        marginRight: padding?.horizontal,
        backgroundColor: colors?.accent,
        fontWeight: "500",
        ...style,
      }}
    >
      Honorific
    </Badge>
  );
};

export default HonorificBadge;
