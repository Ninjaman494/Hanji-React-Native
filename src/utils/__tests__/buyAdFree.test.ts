jest.mock("react-native-purchases");

import Purchases, { PURCHASES_ERROR_CODE } from "react-native-purchases";
import buyAdFree from "utils/buyAdFree";

(Purchases.getOfferings as jest.Mock).mockResolvedValue({
  current: { lifetime: "lifetime" },
});

const onError = jest.fn();

const {
  NETWORK_ERROR,
  INELIGIBLE_ERROR,
  PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR,
  INSUFFICIENT_PERMISSIONS_ERROR,
  PURCHASE_NOT_ALLOWED_ERROR,
  PAYMENT_PENDING_ERROR,
  PRODUCT_ALREADY_PURCHASED_ERROR,
  PURCHASE_CANCELLED_ERROR,
} = PURCHASES_ERROR_CODE;

describe("buyAdFree function", () => {
  it("handles a successful purchase", async () => {
    (Purchases.purchasePackage as jest.Mock).mockResolvedValue({
      purchaserInfo: {
        entitlements: { active: { ad_free_entitlement: true } },
      },
    });

    await buyAdFree(onError);

    expect(Purchases.purchasePackage).toHaveBeenCalledWith("lifetime");
    expect(onError).toHaveBeenCalledWith(
      "Ad-free upgrade activated, thank you for supporting Hanji!"
    );
  });

  describe("errors", () => {
    it.each`
      name                                    | error                                       | message
      ${"Network"}                            | ${NETWORK_ERROR}                            | ${"Couldn't connect to the internet. Check your connection and try again"}
      ${"Ineligible"}                         | ${INELIGIBLE_ERROR}                         | ${"You're device or account doesn't support this purchase"}
      ${"Product not Avaliable For Purchase"} | ${PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR} | ${"You're device or account doesn't support this purchase"}
      ${"Insufficient Permissions"}           | ${INSUFFICIENT_PERMISSIONS_ERROR}           | ${"You're device or account doesn't support this purchase"}
      ${"Purchase not Allowed"}               | ${PURCHASE_NOT_ALLOWED_ERROR}               | ${"You're device or account doesn't support this purchase"}
      ${"Payment Pending"}                    | ${PAYMENT_PENDING_ERROR}                    | ${"Payment is pending. Check your ad-free status once it's complete"}
      ${"Already Purchased"}                  | ${PRODUCT_ALREADY_PURCHASED_ERROR}          | ${"You've already purchased an ad-free upgrade"}
    `("handles $name error", async ({ error, message }) => {
      (Purchases.purchasePackage as jest.Mock).mockRejectedValue({
        code: error,
      });

      await buyAdFree(onError);

      expect(Purchases.purchasePackage).toHaveBeenCalledWith("lifetime");
      expect(onError).toHaveBeenCalledWith(message);
    });
  });

  it("handles purchase cancellations", async () => {
    (Purchases.purchasePackage as jest.Mock).mockRejectedValue({
      code: PURCHASE_CANCELLED_ERROR,
    });

    await buyAdFree(onError);

    expect(Purchases.purchasePackage).toHaveBeenCalledWith("lifetime");
    expect(onError).not.toHaveBeenCalled();
  });
});
