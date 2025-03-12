import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";

// Redux Persist
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"], // Các slice được phép lưu khi reload/f5
  // blacklist: ['user'], // Các slice không được phép lưu khi reload/f5
};

// Combine Reducer
const reducers = combineReducers({
  user: userReducer,
});

// Persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // fix warning error serializable
});

export const persistor = persistStore(store);
