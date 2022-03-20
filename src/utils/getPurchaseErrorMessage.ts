import { PurchasesError, PURCHASES_ERROR_CODE } from "react-native-purchases";
import { Native } from "sentry-expo";

const getPurchaseErrorMessage = (
  error: PurchasesError,
  defaultMsg?: string
): string | undefined => {
  switch (error.code) {
    case PURCHASES_ERROR_CODE.NETWORK_ERROR:
      return "Couldn't connect to the internet. Check your connection and try again";
    case PURCHASES_ERROR_CODE.STORE_PROBLEM_ERROR:
      return "Couldn't connect to the app store. Please try again later";
    case PURCHASES_ERROR_CODE.OPERATION_ALREADY_IN_PROGRESS_ERROR:
      return "Purchase already in progress. Please wait for it to complete";
    case PURCHASES_ERROR_CODE.INELIGIBLE_ERROR:
    case PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR:
    case PURCHASES_ERROR_CODE.INSUFFICIENT_PERMISSIONS_ERROR:
    case PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR:
      return "You're device or account doesn't support this purchase";
    case PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR:
      return "Payment is pending. Check your ad-free status once it's complete";
    case PURCHASES_ERROR_CODE.PRODUCT_ALREADY_PURCHASED_ERROR:
      return "You've already purchased an ad-free upgrade";
    case PURCHASES_ERROR_CODE.RECEIPT_ALREADY_IN_USE_ERROR:
    case PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR:
      return;
    default:
      Native.captureException(error, { extra: { error } });
      return (
        defaultMsg ??
        "An error occurred. Please try again later or contact support"
      );
  }
};

export default getPurchaseErrorMessage;
