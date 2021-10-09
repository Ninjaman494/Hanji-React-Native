import { ApolloError } from "@apollo/client";
import { AppBarProps, APP_BAR_HEIGHT } from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import React from "react";
import { View } from "react-native";
import { useHistory } from "react-router";
import ErrorDialog from "./ErrorDialog";

export interface AppLayoutProps extends AppBarProps {
  loading?: boolean;
  error?: ApolloError;
}

const AppLayout: React.FC<AppLayoutProps> = ({ loading, error, children }) => {
  const history = useHistory();

  return (
    <View style={{ flex: 1, height: 500 }}>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorDialog error={error} onDismiss={history.goBack} visible />
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
