import { useEffect } from "react";
import NProgress from "nprogress";

const useLoader = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      NProgress.start();
    }
    return () => {
      NProgress.done();
    };
  }, [loading]);
};

export default useLoader;
