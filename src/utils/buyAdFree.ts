import Purchases from "react-native-purchases";

const buyAdFree = async (): Promise<void> => {
  try {
    const { current } = await Purchases.getOfferings();
    if (current && current?.lifetime !== null) {
      const { purchaserInfo } = await Purchases.purchasePackage(
        current?.lifetime
      );

      console.log(JSON.stringify(purchaserInfo, null, 2));
      if (purchaserInfo.entitlements.active.ad_free_entitlement) {
        console.log("PURCHASED");
      }
    }
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
};

export default buyAdFree;
