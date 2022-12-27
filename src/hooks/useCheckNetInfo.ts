import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useCheckNetInfo = () => {
  const [netInfo, setNetInfo] = useState<NetInfoState>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isInternetReachable);
      setNetInfo(state);
    });
    return unsubscribe;
  });

  return netInfo;
};

export default useCheckNetInfo;
