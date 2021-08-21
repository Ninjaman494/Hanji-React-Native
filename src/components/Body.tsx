import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import { APP_BAR_HEIGHT } from "./AppBar";

const Body: FC<ViewProps> = ({ children, style, ...rest }) => {
  return (
    <View
      style={[
        {
          marginTop: APP_BAR_HEIGHT,
          flexGrow: 1,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Body;
