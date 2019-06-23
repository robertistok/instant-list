import { useEffect } from "react";
import NProgress from "nprogress";

const Loader = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return null;
};

module.exports = Loader;
