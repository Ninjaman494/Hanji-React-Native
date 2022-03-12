import { Native } from "sentry-expo";

const handleAdError = (error: string) => {
  switch (error) {
    case "ERROR_CODE_MEDIATION_NO_FILL":
    case "ERROR_CODE_NETWORK_ERROR":
    case "ERROR_CODE_NO_FILL":
      break;
    default:
      Native.captureException(error, { extra: { error } });
      break;
  }
};

export default handleAdError;
