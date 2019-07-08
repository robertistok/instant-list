import { useEffect } from "react";
import NProgress from "nprogress";

const Loader = ({ showMessage = true, message = "Loading..." }) => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return message || showMessage ? <span>Loading...</span> : null;
};

export default Loader;
