// @ts-ignore
import { useLocation } from "routing";

const useGetURLParams = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

export default useGetURLParams;
