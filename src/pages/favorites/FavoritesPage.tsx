import React from "react";
import useGetFavorites from "hooks/useGetFavorites";
import { Divider, List } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AppBar from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import HonorificBadge from "components/HonorificBadge";
import ListItem from "components/ListItem";

const FavoritesPage: React.FC = () => {
  const { favorites, loading } = useGetFavorites();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
  });

  return (
    <View style={styles.parent}>
      <AppBar title="Favorites" />
      {loading ? (
        <LoadingScreen text="Loading.." />
      ) : (
        <View>
          <List.Section>
            {favorites?.map((f) => (
              <>
                <ListItem
                  title={f.name}
                  description={f.conjugationName}
                  right={() => (
                    <HonorificBadge
                      visible={f.honorific}
                      style={{ alignSelf: "center" }}
                    />
                  )}
                  titleStyle={{ marginBottom: 4 }}
                  descriptionStyle={{ textTransform: "capitalize" }}
                />
                <Divider />
              </>
            ))}
          </List.Section>
        </View>
      )}
    </View>
  );
};

export default FavoritesPage;
