import { AnimationContext } from "providers/AnimationProvider";
import { useContext } from "react";

const useGetAnimating = () => useContext(AnimationContext);

export default useGetAnimating;
