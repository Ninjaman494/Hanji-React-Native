import { useNavigation } from "@react-navigation/native";
import { BaseCard, BaseCardProps } from "components";
import { Conjugation } from "hooks/useConjugations";
import React from "react";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { NavigationProps } from "typings/navigation";
import { Formality } from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";

export type ConjugationCardProps = BaseCardProps & {
  conjugations: Conjugation[];
  onPress?: () => void;
};

const ConjugationCard: React.FC<ConjugationCardProps> = ({
  conjugations,
  onPress,
  ...rest
}) => {
  const { colors, padding, textSizes } = useTheme();
  const navigation = useNavigation<NavigationProps>();

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

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {conjugations.map((conjugation, index) => (
          <Row
            style={style.rowView}
            key={index}
            onPress={async () => {
              await logEvent({
                type: LOG_EVENT.SELECT_CONJUGATION,
                params: {
                  name: conjugation.name,
                  conjugation: conjugation.conjugation,
                  honorific: conjugation.honorific,
                },
              });
              navigation.push("ConjInfo", { conjugation });
            }}
          >
            <Col size={5}>
              <Text style={style.text}>
                {conjugation.speechLevel === Formality.NONE
                  ? conjugation.name
                  : conjugation.speechLevel.replace(/_/g, " ").toLowerCase()}
              </Text>
            </Col>
            <Col>
              <Text style={style.divider}>:</Text>
            </Col>
            <Col size={5}>
              <Text style={style.text}>{conjugation.conjugation}</Text>
            </Col>
          </Row>
        ))}
      </Grid>
      {onPress && (
        <Card.Actions style={style.actions}>
          <Button onPress={onPress} color={colors.accent}>
            See all
          </Button>
        </Card.Actions>
      )}
    </BaseCard>
  );
};

export default ConjugationCard;
