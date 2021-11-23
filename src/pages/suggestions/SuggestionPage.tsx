import { AppBar, FormikForm, FormikTextField } from "components";
import { Formik } from "formik";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Subheading, Text, useTheme } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import * as yup from "yup";

type SuggestionForm = {
  antonym?: string;
  synonym?: string;
  example: Example;
};
type Example = {
  sentence: string;
  translation: string;
};

const AT_LEAST_ONE = "At least one addition is required";

const validationSchema = yup.object().shape(
  {
    antonym: yup
      .string()
      .matches(/^[^A-Za-z0-9]*$/, "Antonym must be in Korean")
      .when(["synonym", "example"], {
        is: (synonym: string, example: Example) =>
          !synonym && !example.sentence && !example.translation,
        then: yup.string().required(AT_LEAST_ONE),
        otherwise: yup.string().notRequired(),
      }),
    synonym: yup
      .string()
      .matches(/^[^A-Za-z0-9]*$/, "Synonym must be in Korean")
      .when(["antonym", "example"], {
        is: (antonym: string, example: Example) =>
          !antonym && !example.sentence && !example.translation,
        then: yup.string().required(AT_LEAST_ONE),
        otherwise: yup.string().notRequired(),
      }),
    example: yup.object().shape(
      {
        sentence: yup
          .string()
          .label("Sentence")
          .when("translation", {
            is: (translation: string) => translation?.length > 0,
            then: yup.string().required("Sentence is required for example"),
          })
          .matches(/^[^A-Za-z]*$/, "Sentence must be in Korean"),
        translation: yup
          .string()
          .label("Translation")
          .when("sentence", {
            is: (sentence: string) => sentence?.length > 0,
            then: yup.string().required("Translation is required for example"),
          })
          .matches(/^[A-Za-z0-9\s,]*$/, "Translation must be in English"),
      },
      [["sentence", "translation"]]
    ),
  },
  [
    ["antonym", "example"],
    ["synonym", "example"],
    ["antonym", "synonym"],
  ]
);

const SuggestionPage: FC<ScreenProps<"Suggestion">> = () => {
  const { padding, colors, textSizes } = useTheme();
  const styles = StyleSheet.create({
    formContainer: {
      marginHorizontal: padding.horizontal,
      marginTop: padding.vertical,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Add to Entry" />
      <View style={styles.formContainer}>
        <Text style={{ fontSize: textSizes.regular, marginBottom: 24 }}>
          Enter at lease one addition. We'll review your suggestion and add it
          to this entry if it's a good fit.
        </Text>
        <Formik<SuggestionForm>
          initialValues={{
            antonym: "",
            synonym: "",
            example: {
              sentence: "",
              translation: "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
            <>
              <FormikForm>
                <FormikTextField
                  name="antonym"
                  label="Antonym"
                  hideError={errors.antonym == AT_LEAST_ONE}
                />
                <FormikTextField
                  name="synonym"
                  label="Synonym"
                  hideError={errors.synonym == AT_LEAST_ONE}
                />
                <Subheading>Example</Subheading>
                <FormikTextField
                  name="example.sentence"
                  label="Korean Sentence"
                />
                <FormikTextField
                  name="example.translation"
                  label="English Translation"
                />
              </FormikForm>
              <Button
                disabled={!isValid || !dirty}
                loading={isSubmitting}
                mode="contained"
                color={colors.accent}
                style={{ marginTop: 32 }}
                onPress={handleSubmit}
              >
                Submit
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SuggestionPage;
