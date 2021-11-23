import React, { ComponentProps, FC, forwardRef } from "react";
import { TextInput as NativeTextInput, View } from "react-native";
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
      <View style={style}>
        <TextInput
          mode="outlined"
          ref={ref}
          accessibilityLabel={rest.label}
          {...rest}
          render={(innerProps) => (
            <NativeTextInput
              {...innerProps}
              style={[
                innerProps.style,
                rest.multiline
                  ? {
                      paddingTop: 8,
                      paddingBottom: 8,
                      height: 100,
                    }
                  : null,
              ]}
            />
          )}
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

export default compose<
  FormikTextFieldProps & withFormikControlProps,
  FormikTextFieldProps
>(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormikTextField);
