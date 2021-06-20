import { HonorificBadge, ListItem } from "components";
import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import { useState } from "react";
import { FC } from "react";
import { Divider, Menu } from "react-native-paper";

export interface FavoriteItemProps {
  favorite: Favorite;
  onDelete: (favorite: Favorite) => void;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ favorite, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={
        <>
          <ListItem
            onPress={() => {}}
            onLongPress={() => setShowMenu(true)}
            title={favorite.name}
            description={favorite.conjugationName}
            titleStyle={{ marginBottom: 4 }}
            descriptionStyle={{ textTransform: "capitalize" }}
            right={() => (
              <HonorificBadge
                visible={favorite.honorific}
                style={{ alignSelf: "center" }}
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
