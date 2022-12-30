import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

interface AnimationProviderValue {
  isAnimating: boolean;
  startingAnimation: () => void;
  finishedAnimation: () => void;
}

export const AnimationContext = createContext<AnimationProviderValue>({
  isAnimating: false,
  startingAnimation: () => {},
  finishedAnimation: () => {},
});

const AnimationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAnimating, setAnimating] = useState(false);

  const value = useMemo(
    () => ({
      isAnimating,
      startingAnimation: () => setAnimating(true),
      finishedAnimation: () => setAnimating(false),
    }),
    [isAnimating, setAnimating]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;
