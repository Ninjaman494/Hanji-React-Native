import { HonorificBadge } from "components";
import { Favorite } from "hooks/useGetFavorites";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, List, Menu, useTheme } from "react-native-paper";

export interface FavoriteItemProps {
  favorite: Favorite;
  onDelete: (favorite: Favorite) => void;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ favorite, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { textSizes } = useTheme();
  const styles = StyleSheet.create({
    title: { fontSize: textSizes.regular, marginBottom: 4 },
    description: {
      fontSize: textSizes.secondary,
      textTransform: "capitalize",
    },
    badge: { alignSelf: "center" },
  });

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={
        <>
          <List.Item
            onPress={() => {}}
            onLongPress={() => setShowMenu(true)}
            title={favorite.name}
            description={favorite.conjugationName}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
            right={() => (
              <HonorificBadge
                visible={favorite.honorific}
                style={styles.badge}
              />
            )}
          />
          <Divider />
        </>
      }
    >
      <Menu.Item
        title="Delete"
        onPress={() => {
          onDelete(favorite);
          setShowMenu(false);
        }}
      />
    </Menu>
  );
};

export default FavoriteItem;
