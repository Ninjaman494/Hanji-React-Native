import React from "react";
import { Card, useTheme } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";

export interface BaseCardProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const BaseCard: React.FC<BaseCardProps> = ({ title, children, style }) => {
  const { colors, textSizes } = useTheme();

  return (
    <Card elevation={5} style={style}>
      {title && (
        <Card.Title
          title={title}
          titleStyle={{
            color: colors?.primary,
            fontSize: textSizes?.cardTitle,
            textTransform: "capitalize",
          }}
        />
      )}
      <Card.Content style={{ paddingHorizontal: 0 }}>{children}</Card.Content>
    </Card>
  );
};

export default BaseCard;
