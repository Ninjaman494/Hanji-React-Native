// @ts-ignore
import { useLocation } from "routing";

const useGetURLParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default useGetURLParams;
