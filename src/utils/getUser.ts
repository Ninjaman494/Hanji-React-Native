import { Native } from "sentry-expo";

const getUser = (): Native.User | undefined => {
  let user: Native.User | undefined;
  Native.withScope((scope) => (user = scope.getUser()));
  return user;
};

export default getUser;
