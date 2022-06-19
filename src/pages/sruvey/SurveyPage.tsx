import { AppBar, FormikForm, FormikTextField } from "components";
import FormikCheckboxGroup from "components/formikBindings/FormikCheckboxGroup";
import { Formik } from "formik";
import React, { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { ScreenProps } from "typings/navigation";

interface SurveyForm {
  featureChoices: Set<string>;
  comments?: string;
}

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  const { padding, colors } = useTheme();

  const styles = StyleSheet.create({
    form: {
      paddingHorizontal: padding?.horizontal,
      paddingVertical: padding?.vertical,
    },
    button: {
      marginHorizontal: padding?.horizontal,
      marginTop: 32,
      marginBottom: 16,
    },
  });

  return (
    <>
      <AppBar title="Survey" />
      <ScrollView>
        <Formik<SurveyForm>
          initialValues={{ featureChoices: new Set(), comments: undefined }}
          onSubmit={(values) => console.log("SUBMIT", values)}
        >
          {({ handleSubmit, isSubmitting, isValid, dirty }) => (
            <>
              <FormikForm style={styles.form}>
                <FormikCheckboxGroup
                  name="featureChoices"
                  options={[
                    { value: "offline", label: "Offline dictionary lookup" },
                    {
                      value: "flashcards",
                      label: "Flashcards with conjugations",
                    },
                    {
                      value: "stories",
                      label: "Korean stories with English translations",
                    },
                    {
                      value: "saved",
                      label: "Saved words with conjugations for offline use",
                    },
                    {
                      value: "explanations",
                      label: "Explanations of how each conjugation is used",
                    },
                  ]}
                />
                <FormikTextField
                  name="comments"
                  label="Anything else?"
                  multiline
                />
              </FormikForm>
              <Button
                onPress={handleSubmit}
                mode="contained"
                color={colors.accent}
                style={styles.button}
              >
                Submit
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default SurveyPage;
