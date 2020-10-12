import React from "react";
import { Card, useTheme } from "react-native-paper";

interface BaseCardProps {
  title?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <Card elevation={5} style={{ marginBottom: 16 }}>
      {title && (
        <Card.Title
          title={title}
          titleStyle={{ color: colors.primary, fontSize: 16 }}
        />
      )}
      <Card.Content style={{ paddingHorizontal: 0 }}>{children}</Card.Content>
    </Card>
  );
};

export default BaseCard;
