import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";

import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import ThemeProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate
          loading={<Loader />}
          persistor={persistor}
        >
          <ErrorBoundary>
            <Toaster position="top-right" />
            <App />
          </ErrorBoundary>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);