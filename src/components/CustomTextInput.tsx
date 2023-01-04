import React, { FC } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

const CustomTextInput: FC<Omit<TextInputProps, "theme">> = ({ ...rest }) => {
  return (
    <TextInput
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
  );
};

export default CustomTextInput;
