import { FormikForm, FormikTextField } from "components";
import { Formik } from "formik";
import React, { FC } from "react";
import "react-native";
import { Button, Subheading, useTheme } from "react-native-paper";
import * as yup from "yup";

export interface SuggestionFormProps {
  onSubmit: (values: SuggestionFormValues) => void;
}

export type SuggestionFormValues = {
  antonym?: string;
  synonym?: string;
  example?: Example;
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

const SuggestionForm: FC<SuggestionFormProps> = ({ onSubmit }) => {
  const { colors } = useTheme();

  return (
    <Formik<SuggestionFormValues>
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
        <>
          <FormikForm>
            <FormikTextField
              name="antonym"
              label="Antonym"
              hideError={errors.antonym === AT_LEAST_ONE}
            />
            <FormikTextField
              name="synonym"
              label="Synonym"
              hideError={errors.synonym === AT_LEAST_ONE}
            />
            <Subheading>Example</Subheading>
            <FormikTextField name="example.sentence" label="Korean Sentence" />
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
  );
};

export default SuggestionForm;
