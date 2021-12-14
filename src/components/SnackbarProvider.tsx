import React, {
  createContext,
  FC,
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
  handleError: (err: Error) => void;
}

const SnackbarContext = createContext<SnackbarProviderValue>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
  handleError: () => {},
});

const SnackbarProvider: FC = ({ children }) => {
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const showSnackbar = useCallback(
    (text: string) => {
      setSnackbarText(text);
    },
    [setSnackbarText]
  );

  const handleError = useCallback(
    (err: Error) => {
      Native.captureException(err);
      setSnackbarText("An error occurred. Please try again later");
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
      handleError,
    }),
    [showSnackbar, hideSnackbar, handleError]
  );

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText(null)}
      >
        {snackbarText}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar: () => SnackbarProviderValue = () =>
  useContext(SnackbarContext);

export default SnackbarProvider;
