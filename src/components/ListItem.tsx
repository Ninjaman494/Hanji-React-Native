import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type ListItemProps = {
  title: string;
  description?: string;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  selectable?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  titleStyle,
  descriptionStyle,
  selectable = true,
}) => {
  const { textSizes, colors } = useTheme();
  const styles = StyleSheet.create({
    title: {
      fontSize: textSizes?.regular,
    },
    description: {
      fontSize: textSizes?.secondary,
      color: colors.grey,
    },
    row: {
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
  });

  return (
    <View style={styles.row}>
      <Text
        selectable={selectable}
        numberOfLines={5}
        style={[styles.title, titleStyle]}
      >
        {title}
      </Text>
      {description && (
        <Text
          selectable={selectable}
          numberOfLines={10}
          style={[styles.description, descriptionStyle]}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

export default ListItem;
