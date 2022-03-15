import { HonorificBadge } from "components";
import { Favorite } from "hooks/useGetFavorites";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, List, useTheme } from "react-native-paper";

export interface FavoriteItemProps {
  favorite: Favorite;
  onDelete: (favorite: Favorite) => void;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ favorite, onDelete }) => {
  const { textSizes } = useTheme();
  const styles = StyleSheet.create({
    title: { fontSize: textSizes.regular, marginBottom: 4 },
    description: {
      fontSize: textSizes.secondary,
      textTransform: "capitalize",
    },
    badge: { alignSelf: "center" },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <>
      <List.Item
        title={favorite.name}
        description={favorite.conjugationName}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        right={() => (
          <View style={styles.rightContainer}>
            <HonorificBadge visible={favorite.honorific} style={styles.badge} />
            <IconButton
              icon="trash-can"
              size={24}
              onPress={() => onDelete(favorite)}
            />
          </View>
        )}
      />
      <Divider />
    </>
  );
};

export default FavoriteItem;
