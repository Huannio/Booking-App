import { createContext, useState } from "react";
import PropTypes from "prop-types";
const LoadingContext = createContext();
function LoadingProvider({ children }) {
  const [globalLoading, setGlobalLoading] = useState(false);
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
