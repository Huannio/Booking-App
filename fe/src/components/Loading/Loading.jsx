import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const LoadingContext = createContext();
import { injectLoading } from "../../utils/axios.config";

function LoadingProvider({ children }) {
  const [globalLoading, setGlobalLoading] = useState(false);
  // Inject setGlobalLoading ONCE when the component mounts
  useEffect(() => {
    injectLoading(setGlobalLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: PropTypes.node,
};

export { LoadingProvider, LoadingContext };
