import { useEffect } from "react";
import NProgress from "nprogress";

type Props = {
  showMessage: boolean;
  message: string;
};

const Loader: React.FunctionComponent<Props> = ({ showMessage = false, message }) => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return message || showMessage ? <span>{message || "Loading..."}</span> : null;
};

export default Loader;
