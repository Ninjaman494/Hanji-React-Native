import {
  FormikForm,
  FormikSelect,
  FormikSwitch,
  FormikTextField,
} from "components";
import { Formik } from "formik";
import { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React, { ComponentProps, FC } from "react";
import { Button, Dialog } from "react-native-paper";
import {
  ConjugationName,
  ConjugationType,
  Formality,
} from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import toTitleCase from "utils/toTitleCase";
import * as yup from "yup";

export type AddFavoriteModalProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  favorites: Favorite[];
  onSubmit: () => void;
};

/**
 * Check if the given conjugation requires a formality.
 * All conjugations require a formality except for
 * nominal ing, determiner past/preset/future, and
 * connective if/and/but
 */
const requiresFormality = (conjugation: string) =>
  !conjugation.includes("determiner") &&
  !conjugation.includes("connective") &&
  conjugation !== ConjugationType.NOMINAL_ING;

const validationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  conjugation: yup.string().label("Conjugation").required(),
  formality: yup
    .string()
    .label("Formality")
    .when("conjugation", {
      is: (conjugation: string) =>
        conjugation && requiresFormality(conjugation),
      then: yup.string().required(),
    }),
});

const conjugationValues = Object.values(ConjugationType).map((val) => ({
  label: toTitleCase(val),
  value: val,
}));

const formalityValues = Object.values(Formality).map((val) => ({
  label: toTitleCase(val),
  value: val,
}));

const AddFavoriteModal: FC<AddFavoriteModalProps> = ({
  favorites,
  onDismiss,
  onSubmit,
  ...rest
}) => {
  const { setFavorites } = useSetFavorites();

  return (
    <Dialog
      onDismiss={onDismiss}
      style={[{ maxWidth: 500, width: "90%", alignSelf: "center" }, rest.style]}
      {...rest}
    >
      <Dialog.Title>Create Favorite</Dialog.Title>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          conjugation: "",
          formality: "",
          honorific: false,
        }}
        onSubmit={async ({ conjugation, formality, name, honorific }) => {
          const conjugationName = (
            requiresFormality(conjugation)
              ? `${conjugation} ${formality}`
              : conjugation
          ) as ConjugationName;

          await logEvent({
            type: LOG_EVENT.ADD_FAVORITE,
            params: {
              conjugation_name: conjugationName,
              name,
              honorific,
            },
          });

          await setFavorites([
            ...favorites,
            { conjugationName, name, honorific },
          ]);
          onSubmit();
        }}
      >
        {({ handleSubmit, values, isValid, isSubmitting, dirty }) => (
          <>
            <Dialog.Content>
              <FormikForm>
                <FormikTextField name="name" label="Name" />
                <FormikSelect
                  name="conjugation"
                  label="Conjugation"
                  list={conjugationValues}
                />
                {!!values.conjugation &&
                  requiresFormality(values.conjugation) && (
                    <FormikSelect
                      name="formality"
                      label="Formality"
                      list={formalityValues}
                    />
                  )}
                <FormikSwitch name="honorific" label="Honorific" />
              </FormikForm>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onDismiss}>Cancel</Button>
              <Button
                onPress={handleSubmit}
                disabled={!isValid || !dirty}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddFavoriteModal;
