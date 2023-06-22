"use client";

import { Provider } from "react-redux";
import { createStore } from "@/stores/store";

type Props = {
  children: React.ReactNode;
  preloadedState: any;
};

export function ReduxProvider({ children, preloadedState }: Props) {
  const store = createStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
}
