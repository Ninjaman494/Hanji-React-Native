import FormikForm from "components/formikBindings/FormikForm";
import FormikSelect from "components/formikBindings/FormikSelect";
import FormikTextField from "components/formikBindings/FormikTextField";
import { Formik } from "formik";
import React, { FC, ComponentProps, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  Portal,
  Dialog,
  Paragraph,
  Button,
  useTheme,
} from "react-native-paper";

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
  const [show, setVisible] = useState(false);
  const [conjugation, setConjugation] = useState<number | undefined>(undefined);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ maxWidth: 500, width: "90%", alignSelf: "center" }}
      >
        <Dialog.Title>Create Favorite</Dialog.Title>
        <Dialog.Content>
          <Formik
            initialValues={{ name: "", conjugation: "", honorific: false }}
            onSubmit={() => {}}
          >
            {() => (
              <FormikForm>
                <FormikTextField label="Name" />
                <FormikSelect
                  label="Conjugation"
                  visible={show}
                  showDropDown={() => setVisible(true)}
                  onDismiss={() => setVisible(false)}
                  value={conjugation}
                  setValue={(v) => setConjugation(v as number)}
                  list={[
                    { label: "connective and", value: 1 },
                    { label: "connective but", value: 2 },
                    { label: "declarative past", value: 3 },
                  ]}
                />
              </FormikForm>
            )}
          </Formik>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onSubmit}>Submit</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddFavoriteModal;
