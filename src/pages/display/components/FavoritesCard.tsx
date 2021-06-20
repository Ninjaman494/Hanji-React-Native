import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme, Card } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Conjugation } from "hooks/useConjugations";
import { BaseCard, BaseCardProps } from "components";
import { useHistory } from "react-router";
import { Favorite } from "hooks/useGetFavorites";

export type FavoritesCardProps = BaseCardProps & {
  favorites: Favorite[];
  conjugations?: Conjugation[];
  onPress?: () => void;
};

const FavoritesCard: React.FC<FavoritesCardProps> = ({
  favorites,
  conjugations,
  onPress,
  ...rest
}) => {
  const { colors, padding, textSizes } = useTheme();
  const history = useHistory();

  const style = StyleSheet.create({
    conjView: {
      paddingHorizontal: padding?.horizontal,
    },
    rowView: {
      marginBottom: padding?.vertical,
    },
    text: {
      fontSize: textSizes?.regular,
    },
    divider: {
      fontSize: textSizes?.regular,
      textAlign: "center",
    },
    actions: {
      justifyContent: "flex-end",
      paddingBottom: 0,
    },
  });

  const favoritesMap = favorites.map((favorite) => {
    const conjugation = conjugations?.find(
      ({ name, honorific }) =>
        name === favorite.conjugationName && honorific === favorite.honorific
    );
    return { name: favorite.name, conjugation: conjugation };
  });

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {favoritesMap.length > 0 ? (
          favoritesMap.map((favorite, index) => (
            <Row
              style={style.rowView}
              key={index}
              onPress={() =>
                history.push("/conjinfo", { conjugation: favorite.conjugation })
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
      {onPress && (
        <Card.Actions style={style.actions}>
          <Button onPress={onPress} color={colors?.accent}>
            See all
          </Button>
        </Card.Actions>
      )}
    </BaseCard>
  );
};

export default FavoritesCard;
