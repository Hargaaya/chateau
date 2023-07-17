import defaultSettings from "@/constants/defaultSettings";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: defaultSettings,
};

export const { actions, reducer } = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocalSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

type SettingsState = {
  settings: {
    settings: Settings;
  };
};

export const getLocalSettings = (state: SettingsState) => state.settings.settings;
