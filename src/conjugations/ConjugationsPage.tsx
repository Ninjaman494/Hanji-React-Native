import React from "react";
import useGetURLParams from "../hooks/useGetURLParams";
import useConjugations, { Conjugation } from "../hooks/useConjugations";
import AppLayout from "../components/AppLayout";
import ConjugationCard from "../display/components/ConjugationCard";
import { FlatList } from "react-native";
import { useTheme } from "react-native-paper";

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsPage: React.FC = () => {
  const { padding } = useTheme();

  const styles = {
    card: {
      marginVertical: padding.vertical,
      marginHorizontal: padding.horizontal,
    },
  };

  const params = useGetURLParams();
  const stem = params.get("stem") as string;
  const isAdj = params.get("isAdj") === "true";
  const honorific = params.get("honorific") === "true";

  const { loading, error, data } = useConjugations({
    stem: stem,
    isAdj: isAdj,
    honorific: honorific,
  });

  const conjMap = data?.conjugations
    ? data?.conjugations.reduce((conjMap: ConjugationMap, value) => {
        const conjugations = conjMap[value.type];
        conjMap[value.type] = conjugations ? [...conjugations, value] : [value];
        return conjMap;
      }, {})
    : {};

  return (
    <AppLayout title="Conjugations" loading={loading} error={error?.message}>
      <FlatList
        data={Object.keys(conjMap)}
        renderItem={({ item }) => (
          <ConjugationCard
            title={item}
            conjugations={conjMap[item]}
            style={styles.card}
          />
        )}
        keyExtractor={(item) => item}
      />
    </AppLayout>
  );
};

export default ConjugationsPage;
