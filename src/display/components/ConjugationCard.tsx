import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Conjugation } from "../../hooks/useConjugations";
import BaseCard, { BaseCardProps } from "../../utils/BaseCard";

export interface ConjugationCardProps extends BaseCardProps {
  conjugations: Conjugation[];
}

const ConjugationCard: React.FC<ConjugationCardProps> = ({
  conjugations,
  ...rest
}) => {
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

const style = StyleSheet.create({
  conjView: {
    paddingHorizontal: 16,
  },
  rowView: {
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
  },
  divider: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default ConjugationCard;
