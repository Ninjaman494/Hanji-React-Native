import { AppBar, HonorificSwitch } from "components";
import Select from "components/Select";
import useConjugations from "hooks/useConjugations";
import ConjugationsPageContent from "pages/conjugations/components/ConjugationPageContent";
import React, { FC, useState } from "react";
import { View } from "react-native";

const stems = [
  { label: "먹다", value: "먹다" },
  { label: "먹드다", value: "먹드다" },
];

const pos = [
  { label: "Verb", value: "Verb" },
  { label: "Adjective", value: "Adjective" },
];

const regularity = [
  { label: "Regular verb/adjective", value: "regular" },
  { label: "Irregular verb/adjective", value: "irregular" },
];

const ConjugatorPage: FC = () => {
  const [formValues, setFormValues] = useState({
    stem: "먹다",
    isAdj: false,
    regular: false,
    honorific: false,
  });

  const { data, loading, error } = useConjugations(formValues);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Conjugator" />
      <HonorificSwitch
        honorific={formValues.honorific}
        onPress={(value) => setFormValues({ ...formValues, honorific: value })}
      />
      <View>
        <Select
          label="Possible Stems"
          list={stems}
          value={formValues.stem}
          onChange={(value) =>
            setFormValues({
              ...formValues,
              stem: value,
            })
          }
        />
        <Select
          label="Part of Speech"
          list={pos}
          value={formValues.isAdj ? "Adjective" : "Verb"}
          onChange={(value) =>
            setFormValues({
              ...formValues,
              isAdj: value === "Adjective",
            })
          }
        />
        <Select
          label="Regularity"
          list={regularity}
          value={formValues.regular ? "Adjective" : "Verb"}
          onChange={(value) =>
            setFormValues({
              ...formValues,
              regular: value === "regular",
            })
          }
        />
        {data?.conjugations && (
          <ConjugationsPageContent conjugations={data.conjugations} />
        )}
      </View>
    </View>
  );
};

export default ConjugatorPage;
