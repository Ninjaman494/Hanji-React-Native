import { APPODEAL_KEY } from "@env";
import {
  Appodeal,
  AppodealAdType,
  AppodealLogLevel,
} from "react-native-appodeal";

const setupAds = () => {
  Appodeal.setTesting(true);
  Appodeal.setLogLevel(AppodealLogLevel.VERBOSE);
  Appodeal.initialize(APPODEAL_KEY, AppodealAdType.MREC, true);
};

export default setupAds;
