import { useNavigation } from "@react-navigation/native";
import { BaseCard, BaseCardProps } from "components";
import { Conjugation } from "hooks/useConjugations";
import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { NavigationProps } from "typings/navigation";
import logEvent, { LOG_EVENT } from "utils/logEvent";

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
  const history = useNavigation<NavigationProps>();

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
    ? favorites.reduce<{ name: string; conjugation: Conjugation }[]>(
        (prev, curr) => {
          const conjugation = conjugations?.find(
            ({ name, honorific }) =>
              name === curr.conjugationName && honorific === curr.honorific
          );
          return conjugation
            ? [...prev, { name: curr.name, conjugation }]
            : prev;
        },
        []
      )
    : [];

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {favoritesMap.length > 0 ? (
          favoritesMap.map((favorite, index) => (
            <Row
              style={style.rowView}
              key={index}
              onPress={async () => {
                const { conjugation, name } = favorite;
                await logEvent({
                  type: LOG_EVENT.SELECT_FAV,
                  params: {
                    name,
                    conjugation_name: conjugation?.name,
                    conjugated: conjugation?.conjugation,
                    honorific: conjugation?.honorific,
                  },
                });
                history.push("ConjInfo", {
                  conjugation: conjugation as Conjugation,
                });
              }}
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
