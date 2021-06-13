import {
  FormikForm,
  FormikTextField,
  FormikSelect,
  FormikSwitch,
} from "components";
import { Formik } from "formik";
import {
  ConjugationName,
  ConjugationType,
  Formality,
} from "utils/conjugationTypes";
import { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React, { FC, ComponentProps } from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import toTitleCase from "utils/toTitleCase";
import * as yup from "yup";

export type AddFavoriteModalProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  favorites: Favorite[];
  onSubmit: () => void;
};

const validationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  conjugation: yup.string().label("Conjugation").required(),
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
    <Portal>
      <Dialog
        onDismiss={onDismiss}
        style={[
          { maxWidth: 500, width: "90%", alignSelf: "center" },
          rest.style,
        ]}
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
          onSubmit={async ({ conjugation, formality, ...rest }) => {
            await setFavorites([
              ...favorites,
              {
                conjugationName:
                  `${conjugation} ${formality}` as ConjugationName,
                ...rest,
              },
            ]);
            onSubmit();
          }}
        >
          {({ handleSubmit, values }) => (
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
                    !values.conjugation.includes("determiner") &&
                    !values.conjugation.includes("connective") &&
                    values.conjugation !== ConjugationType.NOMINAL_ING && (
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
                <Button onPress={handleSubmit}>Submit</Button>
              </Dialog.Actions>
            </>
          )}
        </Formik>
      </Dialog>
    </Portal>
  );
};

export default AddFavoriteModal;
