import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {
    engine: "gpt-3.5-turbo",
    codeTheme: "dracula",
  },
};

export const { actions, reducer } = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setEngine(state, action) {
      state.settings.engine = action.payload;
    },
    setCodeTheme(state, action) {
      state.settings.codeTheme = action.payload;
    },
  },
});

export const getSettings = (state: any) => state.settings.settings;