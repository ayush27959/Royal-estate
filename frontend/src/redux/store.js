import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

import {
  persistReducer,
  persistStore
} from "redux-persist";

// ❌ old wala hata diya
// import storage from "redux-persist/lib/storage";

// ✅ new FIX (Vite compatible)
import createWebStorage from "redux-persist/es/storage/createWebStorage";

// safe storage (SSR + Vite fix)
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// persistor
export const persistor = persistStore(store);