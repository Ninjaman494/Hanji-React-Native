import React, { ComponentProps, FC, forwardRef } from "react";
import { View } from "react-native";
import {
  handleTextInput,
  withFormikControlProps,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { HelperText, TextInput } from "react-native-paper";
import { compose } from "recompose";

export type FormikTextFieldProps = ComponentProps<typeof TextInput> & {
  name: string;
  hint?: string;
};

const FormikTextField: FC<FormikTextFieldProps & withFormikControlProps> =
  forwardRef(({ style, hint, ...rest }, ref) => {
    return (
      <View style={[style, { marginBottom: 8 }]}>
        <TextInput
          mode="outlined"
          ref={ref}
          accessibilityLabel={rest.label}
          {...rest}
        />
        <HelperText
          type={rest.error ? "error" : "info"}
          visible={!!rest.error || !!hint}
        >
          {rest.error ?? hint}
        </HelperText>
      </View>
    );
  });

export default compose<any, FormikTextFieldProps>(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormikTextField);
