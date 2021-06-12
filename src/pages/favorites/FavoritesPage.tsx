import React, { useState } from "react";
import useGetFavorites from "hooks/useGetFavorites";
import { Divider, FAB, List } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AddFavoriteModal from "./AddFavoriteModal";
import { AppBar, HonorificBadge, ListItem, LoadingScreen } from "components";
import FavoriteItem from "./FavoriteItem";
import useSetFavorites from "hooks/useSetFavorites";

const FavoritesPage: React.FC = () => {
  const { favorites, loading, error, refetch } = useGetFavorites();
  const { setFavorites } = useSetFavorites();

  const [showModal, setShowModal] = useState(false);

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <View style={styles.parent}>
      <AppBar title="Favorites" />
      {loading ? (
        <LoadingScreen text="Loading..." />
      ) : (
        <View style={{ flex: 1 }}>
          <List.Section>
            {favorites?.map((fav, index) => (
              <FavoriteItem
                key={index}
                favorite={fav}
                onDelete={async () => {
                  await setFavorites(favorites.filter((el) => el !== fav));
                  refetch();
                }}
              />
            ))}
          </List.Section>
          <FAB
            style={styles.fab}
            icon="plus"
            disabled={loading || !!error}
            onPress={() => setShowModal(true)}
          />
          <AddFavoriteModal
            visible={showModal}
            favorites={favorites ?? []}
            onDismiss={() => setShowModal(false)}
            onSubmit={() => {
              refetch();
              setShowModal(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default FavoritesPage;
