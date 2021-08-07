import { AppLayout } from "components";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { useLocation } from "react-router-native";

const BugReportPage: FC = () => {
  const uri = useLocation<{ screenshot: string }>().state.screenshot;

  return (
    <AppLayout>
      <Text>{uri}</Text>
    </AppLayout>
  );
};

export default BugReportPage;
