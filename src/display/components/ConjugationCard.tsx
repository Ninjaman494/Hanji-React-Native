import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Conjugation } from "../../hooks/useConjugations";
import BaseCard, { BaseCardProps } from "../../components/BaseCard";

export interface ConjugationCardProps extends BaseCardProps {
  conjugations: Conjugation[];
}

const ConjugationCard: React.FC<ConjugationCardProps> = ({
  conjugations,
  ...rest
}) => {
  const { padding, textSizes } = useTheme();

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
  });

  return (
    <BaseCard {...rest}>
      <Grid style={style.conjView}>
        {conjugations.map((conjugation) => (
          <Row style={style.rowView}>
            <Col>
              <Text style={style.text}>{conjugation.name}</Text>
            </Col>
            <Col>
              <Text style={style.divider}>:</Text>
            </Col>
            <Col>
              <Text style={style.text}>{conjugation.conjugation}</Text>
            </Col>
          </Row>
        ))}
      </Grid>
    </BaseCard>
  );
};

export default ConjugationCard;
