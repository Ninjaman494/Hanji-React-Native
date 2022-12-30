import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Snackbar } from "react-native-paper";
import { Native } from "sentry-expo";

interface SnackbarProviderValue {
  showSnackbar: (text: string) => void;
  hideSnackbar: () => void;
  showError: (err: Error) => void;
}

const SnackbarContext = createContext<SnackbarProviderValue>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
  showError: () => {},
});

const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const showSnackbar = useCallback(
    (text: string) => {
      setSnackbarText(text);
    },
    [setSnackbarText]
  );

  const showError = useCallback(
    (error: Error) => {
      console.log(JSON.stringify(error, null, 2));
      Native.captureException(error, { extra: { error } });
      setSnackbarText(
        error.message ?? "An error occurred. Please try again later"
      );
    },
    [setSnackbarText]
  );

  const hideSnackbar = useCallback(
    () => setSnackbarText(null),
    [setSnackbarText]
  );

  const value = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
      showError,
    }),
    [showSnackbar, hideSnackbar, showError]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText(null)}
      >
        {snackbarText}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar: () => SnackbarProviderValue = () =>
  useContext(SnackbarContext);

export default SnackbarProvider;
