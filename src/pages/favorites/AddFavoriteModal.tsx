import FormikForm from "components/formikBindings/FormikForm";
import FormikSelect from "components/formikBindings/FormikSelect";
import FormikTextField from "components/formikBindings/FormikTextField";
import { Formik } from "formik";
import React, { FC, ComponentProps, useState } from "react";
import { Portal, Dialog, Button } from "react-native-paper";

export type AddFavoriteModalProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  onSubmit: () => void;
};

const AddFavoriteModal: FC<AddFavoriteModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
}) => {
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
          onSubmit={(v) => {
            console.log(v);
            onSubmit();
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Dialog.Content>
                <FormikForm>
                  <FormikTextField name="name" label="Name" />
                  <FormikSelect
                    name="conjugation"
                    label="Conjugation"
                    list={[
                      { label: "connective and", value: "CONNECTIVE_AND" },
                      { label: "connective but", value: "CONNECTIVE_BUT" },
                      { label: "declarative past", value: "DECLARATIVE_PAST" },
                    ]}
                  />
                  <FormikSelect
                    name="tense"
                    label="Tense"
                    list={[
                      { label: "and", value: "and" },
                      { label: "but", value: "but" },
                      { label: "past", value: "past" },
                    ]}
                  />
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
