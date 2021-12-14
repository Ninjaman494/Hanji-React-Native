import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { Native } from "sentry-expo";

const useGetAdFreeStatus = (): boolean => {
  const [isAdFree, setAdFree] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { entitlements } = await Purchases.getPurchaserInfo();
        setAdFree(!!entitlements.active.ad_free_entitlement);
      } catch (e) {
        Native.captureException(e);
      }
    })();
  }, [setAdFree]);

  return isAdFree;
};

export default useGetAdFreeStatus;
