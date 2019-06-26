import { useEffect } from "react";
import NProgress from "nprogress";

const Loader = ({ showMessage = true }) => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return showMessage ? <span>Loading...</span> : null;
};

export default Loader;
