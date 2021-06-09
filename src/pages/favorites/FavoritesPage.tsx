import React, { useState } from "react";
import useGetFavorites from "hooks/useGetFavorites";
import { Divider, FAB, List } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AppBar from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import HonorificBadge from "components/HonorificBadge";
import ListItem from "components/ListItem";
import AddFavoriteModal from "./AddFavoriteModal";

const FavoritesPage: React.FC = () => {
  const { favorites, loading } = useGetFavorites();

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
        <LoadingScreen text="Loading.." />
      ) : (
        <View style={{ flex: 1 }}>
          <List.Section>
            {favorites?.map((f) => (
              <>
                <ListItem
                  title={f.name}
                  description={f.conjugationName}
                  titleStyle={{ marginBottom: 4 }}
                  descriptionStyle={{ textTransform: "capitalize" }}
                  right={() => (
                    <HonorificBadge
                      visible={f.honorific}
                      style={{ alignSelf: "center" }}
                    />
                  )}
                />
                <Divider />
              </>
            ))}
          </List.Section>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setShowModal(true)}
          />
          <AddFavoriteModal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            onSubmit={() => setShowModal(false)}
          />
        </View>
      )}
    </View>
  );
};

export default FavoritesPage;
