"use client";

import { Provider } from "react-redux";
import { createStore } from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

type Props = {
  children: React.ReactNode;
  preloadedState: any;
};

export function ReduxProvider({ children, preloadedState }: Props) {
  const store = createStore(preloadedState);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
