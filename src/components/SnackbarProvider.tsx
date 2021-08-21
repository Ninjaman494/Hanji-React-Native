import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Snackbar } from "react-native-paper";

interface SnackbarProviderValue {
  showSnackbar: (text: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarProviderValue>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

const SnackbarProvider: FC = ({ children }) => {
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const showSnackbar = useCallback(
    (text: string) => {
      setSnackbarText(text);
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
    }),
    [showSnackbar, hideSnackbar]
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
