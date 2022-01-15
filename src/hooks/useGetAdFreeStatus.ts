import { UserContext } from "providers/UserProvider";
import { useContext } from "react";

const useGetAdFreeStatus = () => useContext(UserContext);

export default useGetAdFreeStatus;
