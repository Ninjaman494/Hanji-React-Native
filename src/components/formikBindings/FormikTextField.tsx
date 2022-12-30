import { useFormikContext } from "formik";
import React, { ComponentProps, FC } from "react";
import { TextInput as NativeTextInput, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { FormikContext } from "typings/utils";

export type FormikTextFieldProps = ComponentProps<typeof TextInput> & {
  name: string;
  label: string;
  hint?: string;
  hideError?: boolean;
};

const FormikTextField: FC<FormikTextFieldProps> = ({
  style,
  hint,
  name,
  hideError,
  ...rest
}) => {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext<FormikContext>();
  const error = touched[name] ? errors[name] : undefined;

  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        accessibilityLabel={rest.label}
        value={values[name] as string}
        error={!!error && !hideError}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
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
        type={error ? "error" : "info"}
        visible={(!!error && !hideError) || !!hint}
      >
        {error ?? hint}
      </HelperText>
    </View>
  );
};

export default FormikTextField;
