// store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import drawerReducer from "./Drawer";
import filterReducer from "./filter/filter";
import modalReducer from "./Modal"
import authReducer from "./Auth"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    filter: filterReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks with correct types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
