import { useEffect } from "react";

const useMount = (fn: () => void): void => {
  useEffect(() => {
    fn && fn();
  }, []);
};

export default useMount;
