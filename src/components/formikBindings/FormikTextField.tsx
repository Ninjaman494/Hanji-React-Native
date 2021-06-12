import React, { ComponentProps, FC, forwardRef } from "react";
import {
  handleTextInput,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { TextInput } from "react-native-paper";
import { compose } from "recompose";

export type FormikTextFieldProps = ComponentProps<typeof TextInput> & {
  name: string;
};

const FormikTextField: FC<FormikTextFieldProps> = forwardRef((props, ref) => {
  return <TextInput mode="outlined" ref={ref} {...props} />;
});

export default compose<any, FormikTextFieldProps>(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormikTextField);
