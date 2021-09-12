import { AppBarProps, APP_BAR_HEIGHT } from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

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
        <View
          style={{
            marginTop: APP_BAR_HEIGHT,
            flexGrow: 1,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default AppLayout;
