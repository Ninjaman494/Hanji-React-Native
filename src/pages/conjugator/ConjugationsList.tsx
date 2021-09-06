import { Conjugation } from "hooks/useConjugations";
import ConjugationCard from "pages/conjugations/components/ConjugationCard";
import React, { FC, useMemo } from "react";
import { useTheme } from "react-native-paper";
import toTitleCase from "utils/toTitleCase";

export interface ConjugationsListProps {
  conjugations: Conjugation[];
}

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsList: FC<ConjugationsListProps> = ({ conjugations }) => {
  const { padding } = useTheme();
  const style = {
    marginVertical: padding?.vertical,
    marginHorizontal: padding?.horizontal,
  };

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
    <>
      {Object.keys(conjMap).map((key) => (
        <ConjugationCard
          key={key}
          title={toTitleCase(key)}
          conjugations={conjMap[key]}
          style={style}
        />
      ))}
    </>
  );
};

export default ConjugationsList;
