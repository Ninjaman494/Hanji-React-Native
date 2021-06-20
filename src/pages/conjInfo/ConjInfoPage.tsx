import React from "react";
import { AppLayout } from "components";
import { Conjugation } from "hooks/useConjugations";
import ConjInfoCard from "./ConjInfoCard";
//@ts-ignore
import { useLocation } from "routing";

const ConjInfoPage: React.FC = () => {
  const conjugation: Conjugation = useLocation().state.conjugation;

  return (
    <AppLayout error={conjugation ? undefined : "Something went wrong"}>
      <ConjInfoCard conjugation={conjugation} />
    </AppLayout>
  );
};

export default ConjInfoPage;
