import React from "react";
import { Card, useTheme } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";

export type BaseCardProps = Omit<
  React.ComponentProps<typeof Card>,
  "children"
> & {
  title?: string;
  style?: StyleProp<ViewStyle>;
};

const BaseCard: React.FC<BaseCardProps> = ({ title, children, ...rest }) => {
  const { colors, textSizes } = useTheme();

  return (
    <Card elevation={5} {...rest}>
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
