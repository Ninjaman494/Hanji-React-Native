import { useLocation } from "react-router-native";

const useGetURLParams = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

export default useGetURLParams;
