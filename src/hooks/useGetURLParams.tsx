import { useLocation } from "react-router";

const useGetURLParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default useGetURLParams;
