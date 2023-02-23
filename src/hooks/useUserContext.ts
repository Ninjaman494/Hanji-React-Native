import { UserContext } from "providers/UserProvider";
import { useContext } from "react";

const useUserContext = () => useContext(UserContext);

export default useUserContext;
