import Purchases, { PurchasesError } from "react-native-purchases";
import getPurchaseErrorMessage from "./getPurchaseErrorMessage";
import logEvent, { LOG_EVENT } from "./logEvent";

const buyAdFree = async (onError: (e: string) => void): Promise<void> => {
  try {
    const { current } = await Purchases.getOfferings();
    if (current && current?.lifetime !== null) {
      const { product } = current.lifetime;
      const logItem = {
        item_id: product.identifier,
        item_name: product.title,
        price: product.price,
        quantity: 1,
      };

      await logEvent({
        type: LOG_EVENT.SELECT_ITEM,
        params: {
          item_list_id: "overflow_menu",
          item_list_name: "Overflow Menu",
          content_type: "non-subscription purchase",
          items: [logItem],
        },
      });

      const { purchaserInfo } = await Purchases.purchasePackage(
        current.lifetime
      );

      if (purchaserInfo.entitlements.active.ad_free_entitlement) {
        await logEvent({
          type: LOG_EVENT.PURCHASE,
          params: {
            currency: product.currency_code,
            value: logItem.price,
            items: [logItem],
          },
        });

        onError("Ad-free upgrade activated, thank you for supporting Hanji!");
      }
    }
  } catch (e) {
    const errorMsg = getPurchaseErrorMessage(e as PurchasesError);
    errorMsg && onError(errorMsg);
  }
};

export default buyAdFree;
