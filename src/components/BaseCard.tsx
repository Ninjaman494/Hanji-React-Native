import React, { ComponentProps, FC } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";

export type BaseCardProps = Omit<
  ComponentProps<typeof Card>,
  "mode" | "children"
> & {
  title?: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: (props: { size: number }) => React.ReactNode;
  children?: React.ReactNode;
  btnProps?: Omit<ComponentProps<typeof Button>, "children"> & {
    text: string;
  };
};

const BaseCard: FC<BaseCardProps> = ({
  title,
  children,
  rightIcon,
  btnProps,
  ...rest
}) => {
  const { colors, textSizes, padding } = useTheme();

  const styles = StyleSheet.create({
    title: {
      color: colors?.primary,
      fontWeight: "400",
      fontSize: textSizes?.cardTitle,
    },
    content: { paddingHorizontal: 0, paddingBottom: padding?.vertical },
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
      {btnProps && (
        <Card.Actions style={styles.action}>
          <Button color={colors.accent} {...btnProps}>
            {btnProps.text}
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default BaseCard;
