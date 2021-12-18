import Purchases, {
  PurchasesError,
  PURCHASES_ERROR_CODE,
} from "react-native-purchases";
import { Native } from "sentry-expo";
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
    const code = (e as PurchasesError).code;
    switch (code) {
      case PURCHASES_ERROR_CODE.NETWORK_ERROR:
        onError(
          "Couldn't connect to the internet. Check your connection and try again"
        );
        break;
      case PURCHASES_ERROR_CODE.OPERATION_ALREADY_IN_PROGRESS_ERROR:
        onError("Purchase already in progress. Please wait for it to complete");
        break;
      case PURCHASES_ERROR_CODE.RECEIPT_ALREADY_IN_USE_ERROR:
        break;
      case PURCHASES_ERROR_CODE.INELIGIBLE_ERROR:
      case PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR:
      case PURCHASES_ERROR_CODE.INSUFFICIENT_PERMISSIONS_ERROR:
      case PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR:
        onError("You're device or account doesn't support this purchase");
        break;
      case PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR:
        onError(
          "Payment is pending. Check your ad-free status once it's complete"
        );
        break;
      case PURCHASES_ERROR_CODE.PRODUCT_ALREADY_PURCHASED_ERROR:
        onError("You've already purchased an ad-free upgrade");
        break;
      case PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR:
        // Do nothing
        break;
      default:
        Native.captureException(e);
        onError(
          "Failed to make purchase. Please try again later or contact support"
        );
    }
  }
};

export default buyAdFree;
