import React from "react";
import { StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";

type ListItemProps = React.ComponentProps<typeof List.Item>;

const ListItem: React.FC<ListItemProps> = ({
  style,
  titleStyle,
  descriptionStyle,
  ...rest
}) => {
  const { textSizes } = useTheme();

  const styles = StyleSheet.create({
    item: {
      paddingVertical: 0,
    },
    title: {
      fontSize: textSizes?.regular,
    },
    description: {
      fontSize: textSizes?.secondary,
    },
  });

  return (
    <List.Item
      {...rest}
      style={[styles.item, style]}
      titleStyle={[styles.title, titleStyle]}
      descriptionStyle={[styles.description, descriptionStyle]}
    />
  );
};

export default ListItem;
