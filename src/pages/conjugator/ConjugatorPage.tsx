import { AppBar, HonorificSwitch } from "components";
import Select from "components/Select";
import useConjugations from "hooks/useConjugations";
import React, { FC, useState } from "react";
import { ScrollView, View } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";
import ConjugationsList from "./ConjugationsList";

const stems = [
  { label: "먹다", value: "먹다" },
  { label: "먹드다", value: "먹드다" },
];

const pos = [
  { label: "Verb", value: "Verb" },
  { label: "Adjective", value: "Adjective" },
];

const regularity = [
  { label: "Regular Verb/Adjective", value: "regular" },
  { label: "Irregular Verb/Adjective", value: "irregular" },
];

const ConjugatorPage: FC = () => {
  const { padding, colors } = useTheme();

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
      <ScrollView>
        <View
          style={{
            marginHorizontal: padding.horizontal,
            marginTop: padding.vertical,
          }}
        >
          <Select
            label="Possible Stems"
            list={stems}
            value={formValues.stem}
            inputProps={{ style: { marginBottom: -16 } }}
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
            inputProps={{ style: { marginBottom: -16 } }}
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
            value={formValues.regular ? "regular" : "irregular"}
            inputProps={{ style: { marginBottom: -16 } }}
            onChange={(value) =>
              setFormValues({
                ...formValues,
                regular: value === "regular",
              })
            }
          />
        </View>
        {loading && (
          <ProgressBar
            indeterminate
            color={colors.accent}
            style={{ marginHorizontal: padding.horizontal, marginTop: 32 }}
          />
        )}
        {!loading && data?.conjugations && (
          <ConjugationsList conjugations={data.conjugations} />
        )}
      </ScrollView>
    </View>
  );
};

export default ConjugatorPage;
