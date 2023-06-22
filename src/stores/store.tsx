import { configureStore } from "@reduxjs/toolkit";
import { reducer as settingsReducer } from "./slices/settingsSlice";

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = createStore({});
