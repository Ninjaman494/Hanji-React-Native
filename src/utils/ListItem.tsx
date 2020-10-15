import React from "react";
import { List } from "react-native-paper";

type ListItemProps = React.ComponentProps<typeof List.Item>;

const styles = {
  item: {
    paddingVertical: 0,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 18,
  },
};

const ListItem: React.FC<ListItemProps> = ({
  style,
  titleStyle,
  descriptionStyle,
  ...rest
}) => {
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
