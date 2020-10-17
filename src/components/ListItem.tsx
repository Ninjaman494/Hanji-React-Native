import React from "react";
import { List, useTheme } from "react-native-paper";

type ListItemProps = React.ComponentProps<typeof List.Item>;

const ListItem: React.FC<ListItemProps> = ({
  style,
  titleStyle,
  descriptionStyle,
  ...rest
}) => {
  const { textSizes } = useTheme();

  const styles = {
    item: {
      paddingVertical: 0,
    },
    title: {
      fontSize: textSizes?.regular,
    },
    description: {
      fontSize: textSizes?.secondary,
    },
  };

  return (
    <List.Item
      {...rest}
      style={styles.item}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
    />
  );
};

export default ListItem;
