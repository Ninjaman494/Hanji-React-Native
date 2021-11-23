import { useFormikContext } from "formik";
import { get } from "lodash";
import React, { ComponentProps, FC } from "react";
import { TextInput as NativeTextInput, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export type FormikTextFieldProps = ComponentProps<typeof TextInput> & {
  name: string;
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
  const { handleChange, handleBlur, values, errors } = useFormikContext();
  const error = get(errors, name);

  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        accessibilityLabel={rest.label}
        value={get(values, name)}
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
        visible={(!!error || !!hint) && !hideError}
      >
        {error ?? hint}
      </HelperText>
    </View>
  );
};

export default FormikTextField;
