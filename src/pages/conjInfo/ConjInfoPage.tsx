import { AppLayout } from "components";
import { Conjugation } from "hooks/useConjugations";
import React from "react";
import { useLocation } from "react-router-native";
import ConjInfoCard from "./ConjInfoCard";

const ConjInfoPage: React.FC = () => {
  const conjugation =
    useLocation<{ conjugation: Conjugation }>().state.conjugation;

  return (
    <AppLayout error={conjugation ? undefined : "Something went wrong"}>
      <ConjInfoCard conjugation={conjugation} />
    </AppLayout>
  );
};

export default ConjInfoPage;
