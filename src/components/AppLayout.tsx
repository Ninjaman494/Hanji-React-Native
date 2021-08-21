import { AppBarProps } from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Body from "./Body";

export interface AppLayoutProps extends AppBarProps {
  loading?: boolean;
  error?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ loading, error, children }) => {
  return (
    <View style={{ flex: 1, height: 500 }}>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Body>{children}</Body>
      )}
    </View>
  );
};

export default AppLayout;
