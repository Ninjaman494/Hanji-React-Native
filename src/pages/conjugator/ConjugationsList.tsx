import { Conjugation } from "hooks/useConjugations";
import ConjugationCard from "pages/conjugations/components/ConjugationCard";
import React, { FC, useMemo } from "react";
import { Animated, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import toTitleCase from "utils/toTitleCase";

export interface ConjugationsListProps
  extends Animated.AnimatedProps<ViewProps> {
  conjugations: Conjugation[];
}

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsList: FC<ConjugationsListProps> = ({
  conjugations,
  ...rest
}) => {
  const { padding } = useTheme();

  const conjMap = useMemo(
    () =>
      conjugations.reduce((conjMap: ConjugationMap, value) => {
        const conjugations = conjMap[value.type];
        conjMap[value.type] = conjugations ? [...conjugations, value] : [value];
        return conjMap;
      }, {}),
    [conjugations]
  );

  return (
    <Animated.View {...rest}>
      {Object.keys(conjMap).map((key) => (
        <ConjugationCard
          key={key}
          title={toTitleCase(key)}
          conjugations={conjMap[key]}
          style={{
            marginVertical: padding.vertical,
            marginHorizontal: padding.horizontal,
          }}
        />
      ))}
    </Animated.View>
  );
};

export default ConjugationsList;
