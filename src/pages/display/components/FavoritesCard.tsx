import { useNavigation } from "@react-navigation/native";
import { BaseCard, BaseCardProps } from "components";
import { Conjugation } from "hooks/useConjugations";
import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { StackNavigationProp } from "typings/navigation";

export type FavoritesCardProps = BaseCardProps & {
  favorites: Favorite[];
  conjugations?: Conjugation[];
  onPress: () => void;
};

const FavoritesCard: React.FC<FavoritesCardProps> = ({
  favorites,
  conjugations,
  onPress,
  ...rest
}) => {
  const { colors, padding, textSizes } = useTheme();
  const history = useNavigation<StackNavigationProp>();

  const style = StyleSheet.create({
    conjView: {
      paddingHorizontal: padding.horizontal,
    },
    rowView: {
      marginBottom: padding.vertical,
    },
    text: {
      fontSize: textSizes.regular,
    },
    divider: {
      fontSize: textSizes.regular,
      textAlign: "center",
    },
    actions: {
      justifyContent: "flex-end",
      paddingBottom: 0,
    },
  });

  const favoritesMap = conjugations?.length
    ? favorites.map((favorite) => {
        const conjugation = conjugations?.find(
          ({ name, honorific }) =>
            name === favorite.conjugationName &&
            honorific === favorite.honorific
        );
        return { name: favorite.name, conjugation: conjugation };
      })
    : [];

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {favoritesMap.length > 0 ? (
          favoritesMap.map((favorite, index) => (
            <Row
              style={style.rowView}
              key={index}
              onPress={() =>
                history.push("ConjInfo", {
                  conjugation: favorite.conjugation as Conjugation,
                })
              }
            >
              <Col size={5}>
                <Text style={style.text}>{favorite.name}</Text>
              </Col>
              <Col>
                <Text style={style.divider}>:</Text>
              </Col>
              <Col size={5}>
                <Text style={style.text}>
                  {favorite.conjugation?.conjugation}
                </Text>
              </Col>
            </Row>
          ))
        ) : (
          <Text style={style.text}>
            You don't have any favorites. Click on favorites in settings to make
            some.
          </Text>
        )}
      </Grid>
      <Card.Actions style={style.actions}>
        <Button onPress={onPress} color={colors.accent}>
          See all
        </Button>
      </Card.Actions>
    </BaseCard>
  );
};

export default FavoritesCard;
