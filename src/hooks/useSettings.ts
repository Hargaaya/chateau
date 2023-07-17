"use client";

import defaultSettings from "@/constants/defaultSettings";
import debounce from "@/lib/debounce";
import { actions as settingActions, getLocalSettings } from "@/stores/slices/settingsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useSettings<T>(key: string): [T | undefined, (value: T) => void] {
  const dispatch = useDispatch();
  const localSettings = useSelector(getLocalSettings);
  const [setting, setSetting] = useState<T>(defaultSettings[key as keyof Settings] as T);

  useEffect(() => {
    setSetting(localSettings[key as keyof Settings] as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistSettings = async (value: T): Promise<void> => {
    const updatedSettings = {
      ...localSettings,
      [key]: value,
    };

    dispatch(settingActions.setLocalSettings(updatedSettings));
    debouncedPostSettings(updatedSettings);

    setSetting(value);
  };

  return [setting, persistSettings];
}

async function postSettings(settings: Settings): Promise<void> {
  await fetch("api/settings", {
    method: "POST",
    body: JSON.stringify({
      settings,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

const debouncedPostSettings = debounce<typeof postSettings>(postSettings);

export default useSettings;
