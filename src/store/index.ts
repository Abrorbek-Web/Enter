// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// reducerlar import qilinadi
import authSlice from "../slice/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  // boshqa reducerlar
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  // middleware va boshqa konfiguratsiyalar
});
