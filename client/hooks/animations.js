/* eslint-disable import/prefer-default-export */
import { useTrail } from "react-spring";

export const useListAnimation = number => {
  const config = { mass: 5, tension: 2000, friction: 200 };

  const trail = useTrail(number || 0, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, y: 20, height: "auto" }
  });

  return trail;
};
