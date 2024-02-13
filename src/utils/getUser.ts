import { User, withScope } from "@sentry/react-native";

const getUser = (): User | undefined => {
  let user: User | undefined;
  withScope((scope) => (user = scope.getUser()));
  return user;
};

export default getUser;
