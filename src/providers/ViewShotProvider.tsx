import React, {
  createContext,
  FC,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import ViewShot from "react-native-view-shot";

const ViewShotContext = createContext<MutableRefObject<
  ViewShot | undefined
> | null>(null);

const ViewShotProvider: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<ViewShot>();

  return (
    // @ts-expect-error ViewShot type incorrectly doesn't have a children prop
    <ViewShot ref={ref as MutableRefObject<ViewShot>} style={{ flex: 1 }}>
      <ViewShotContext.Provider value={ref}>
        {children}
      </ViewShotContext.Provider>
    </ViewShot>
  );
};

export const useViewShot = (): (() => Promise<string>) | undefined =>
  useContext(ViewShotContext)?.current?.capture;

export default ViewShotProvider;
