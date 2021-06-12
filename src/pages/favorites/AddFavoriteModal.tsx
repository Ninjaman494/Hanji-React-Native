import {
  FormikForm,
  FormikTextField,
  FormikSelect,
  FormikSwitch,
} from "components";
import { Formik } from "formik";
import { Conjugation, Formality } from "hooks/useGetFavorites";
import React, { FC, ComponentProps } from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import toTitleCase from "utils/toTitleCase";
import * as yup from "yup";

export type AddFavoriteModalProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  onSubmit: () => void;
};

const validationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  conjugation: yup.string().label("Conjugation").required(),
});

const AddFavoriteModal: FC<AddFavoriteModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
}) => {
  const conjugationValues = Object.keys(Conjugation).map((key) => ({
    label: toTitleCase(key),
    value: key,
  }));

  const formalityValues = Object.keys(Formality).map((key) => ({
    label: toTitleCase(key),
    value: key,
  }));

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ maxWidth: 500, width: "90%", alignSelf: "center" }}
      >
        <Dialog.Title>Create Favorite</Dialog.Title>
        <Formik
          initialValues={{ name: "", conjugation: "", honorific: false }}
          validationSchema={validationSchema}
          onSubmit={(v) => {
            console.log(v);
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
                  {values.conjugation && (
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
