import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme, Card } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Conjugation } from "../../hooks/useConjugations";
import BaseCard, { BaseCardProps } from "../../components/BaseCard";
import { useHistory } from "react-router";

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

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {conjugations.map((conjugation, index) => (
          <Row
            style={style.rowView}
            testID="conjCardRow"
            key={index}
            onPress={() =>
              history.push("/conjinfo", { conjugation: conjugation })
            }
          >
            <Col size={5}>
              <Text style={style.text}>
                {conjugation.speechLevel === "NONE"
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
          <Button onPress={onPress} color={colors?.accent}>
            See all
          </Button>
        </Card.Actions>
      )}
    </BaseCard>
  );
};

export default ConjugationCard;
