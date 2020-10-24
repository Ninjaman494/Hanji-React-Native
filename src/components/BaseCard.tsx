import React from "react";
import { Button, Card, useTheme } from "react-native-paper";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export type BaseCardProps = Omit<
  React.ComponentProps<typeof Card>,
  "children"
> & {
  title?: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: (props: { size: number }) => React.ReactNode;
  btnText?: string;
  onBtnPress?: () => void;
};

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  children,
  rightIcon,
  btnText,
  onBtnPress,
  ...rest
}) => {
  const { colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    title: {
      color: colors?.primary,
      fontSize: textSizes?.cardTitle,
      textTransform: "capitalize",
    },
    content: { paddingHorizontal: 0 },
    action: { justifyContent: "flex-end" },
  });

  return (
    <Card elevation={5} {...rest}>
      {title && (
        <Card.Title
          title={title}
          right={rightIcon}
          titleStyle={styles.title}
          // Offset added margin from icon
          style={rightIcon ? { marginTop: -8 } : {}}
        />
      )}
      <Card.Content style={styles.content}>{children}</Card.Content>
      {btnText && (
        <Card.Actions style={styles.action}>
          <Button color={colors.accent} onPress={onBtnPress}>
            {btnText}
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default BaseCard;
