import React, { ComponentProps, FC } from "react";
import {
  handleTextInput,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { TextInput } from "react-native-paper";
import { compose } from "recompose";

export type FormikTextFieldProps = ComponentProps<typeof TextInput>;

const FormikTextField: FC<FormikTextFieldProps> = (props) => {
  return <TextInput mode="outlined" {...props} />;
};

export default compose<{}, FormikTextFieldProps>(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormikTextField);
