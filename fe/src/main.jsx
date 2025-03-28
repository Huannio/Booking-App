// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./components/GlobalStyles";
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// inject store
import { injectStore } from "~/utils/axios.config";
injectStore(store);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </PersistGate>
    </Provider>
  // </StrictMode>
);
