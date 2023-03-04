import { createContext, useContext } from "react";

interface UserProviderValue {
  isAdFree: boolean;
  sessionCount: number;
  setAdFree: (status: boolean) => void;
}

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
  sessionCount: -1,
  setAdFree: () => {},
});

const useUserContext = () => useContext(UserContext);

export default useUserContext;
