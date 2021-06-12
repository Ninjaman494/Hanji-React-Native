import {
  FormikForm,
  FormikTextField,
  FormikSelect,
  FormikSwitch,
} from "components";
import { Formik } from "formik";
import React, { FC, ComponentProps } from "react";
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
          {({ handleSubmit, values }) => (
            <>
              <Dialog.Content>
                <FormikForm>
                  <FormikTextField
                    name="name"
                    label="Name"
                    style={{ marginBottom: 8 }}
                  />
                  <FormikSelect
                    name="conjugation"
                    label="Conjugation"
                    list={[
                      { label: "connective and", value: "CONNECTIVE_AND" },
                      { label: "connective but", value: "CONNECTIVE_BUT" },
                      { label: "declarative past", value: "DECLARATIVE_PAST" },
                    ]}
                    inputProps={{ style: { marginBottom: 8 } }}
                  />
                  {values.conjugation && (
                    <FormikSelect
                      name="formality"
                      label="Formality"
                      list={[
                        { label: "and", value: "and" },
                        { label: "but", value: "but" },
                        { label: "past", value: "past" },
                      ]}
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
