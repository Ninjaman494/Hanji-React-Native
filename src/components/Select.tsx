import React, { ComponentProps, forwardRef, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  TextInput as ReactNativeTextInput,
  View,
  ViewStyle,
} from "react-native";
import {
  HelperText,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export type SelectProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  hint?: string;
  inputProps?: ComponentProps<typeof TextInput>;
  style?: StyleProp<ViewStyle>;
  list: Array<{
    label: string;
    value: string;
  }>;
  onChange: (value: string) => void;
};

// Based on react-native-paper-dropdown
const Select = forwardRef<ReactNativeTextInput, SelectProps>(
  (
    { inputProps, list, label, hint, value, error, style, onChange, ...rest },
    ref
  ) => {
    const { colors } = useTheme();

    const [showDropdown, setShowDropdown] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
      const itemLabel = list.find((item) => item.value === value)?.label;
      if (itemLabel) {
        setDisplayValue(itemLabel);
      }
    }, [list, value]);

    return (
      <Menu
        {...rest}
        visible={showDropdown}
        onDismiss={() => setShowDropdown(false)}
        anchor={
          <TouchableRipple
            style={[style, { marginBottom: 8 }]}
            onLayout={onLayout}
            onPress={() => setShowDropdown(true)}
          >
            <View pointerEvents={"none"}>
              <TextInput
                ref={ref} // Needed for nextInputAutoFocus
                value={displayValue}
                mode="outlined"
                label={label}
                accessibilityLabel={label}
                error={!!error}
                onFocus={() => setShowDropdown(true)}
                {...inputProps}
              />
              <HelperText
                type={error ? "error" : "info"}
                visible={!!error || !!hint}
              >
                {error ?? hint}
              </HelperText>
            </View>
          </TouchableRipple>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginBottom: 0,
          paddingBottom: 0,
        }}
      >
        <ScrollView style={{ maxHeight: 200 }}>
          {list.map((item, index) => (
            <Menu.Item
              key={index}
              titleStyle={{
                color: value === item.value ? colors.primary : colors.text,
              }}
              onPress={() => {
                onChange(item.value);
                setShowDropdown(false);
              }}
              title={item.label}
              style={{ maxWidth: inputLayout?.width }}
            />
          ))}
        </ScrollView>
      </Menu>
    );
  }
);

export default Select;
