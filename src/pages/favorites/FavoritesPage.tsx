import { AppBar, LoadingScreen } from "components";
import useGetFavorites, { Favorite } from "hooks/useGetFavorites";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, List, Portal } from "react-native-paper";
import AddFavoriteModal from "./AddFavoriteModal";
import DeleteFavoriteModal from "./DeleteFavoriteModal";
import FavoriteItem from "./FavoriteItem";

const FavoritesPage: React.FC = () => {
  const { favorites, loading, error, refetch } = useGetFavorites();

  const [showAddModal, setShowAddModal] = useState(false);
  const [favToDelete, setFavToDelete] = useState<Favorite | null>(null);

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
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <List.Section>
            {favorites?.map((fav, index) => (
              <FavoriteItem
                key={index}
                favorite={fav}
                onDelete={() => setFavToDelete(fav)}
              />
            ))}
          </List.Section>
          <FAB
            accessibilityLabel="add favorite button"
            style={styles.fab}
            icon="plus"
            disabled={loading || !!error}
            onPress={() => setShowAddModal(true)}
          />
          <Portal>
            <AddFavoriteModal
              visible={showAddModal}
              favorites={favorites ?? []}
              onDismiss={() => setShowAddModal(false)}
              onSubmit={() => {
                refetch();
                setShowAddModal(false);
              }}
            />
            <DeleteFavoriteModal
              visible={!!favToDelete}
              favorites={favorites ?? []}
              favToDelete={favToDelete as Favorite}
              onDismiss={() => setFavToDelete(null)}
              onSubmit={() => {
                refetch();
                setFavToDelete(null);
              }}
            />
          </Portal>
        </View>
      )}
    </View>
  );
};

export default FavoritesPage;
