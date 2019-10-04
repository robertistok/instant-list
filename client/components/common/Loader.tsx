import NProgress from "nprogress";
import { useEffect } from "react";

export interface LoaderProps {
  showMessage?: boolean;
  message?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({
  showMessage = false,
  message
}): React.ReactElement => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return message || showMessage ? <span>{message || "Loading..."}</span> : null;
};

export default Loader;
