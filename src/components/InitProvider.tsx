"use client";

import { actions as localSettingsActions } from "@/stores/slices/settingsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  children?: React.ReactNode;
};

const InitProvider = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function syncSettings() {
      const res = await fetch("/api/settings");
      const { data: settings } = await res.json();

      return settings;
    }

    syncSettings().then((set) => {
      dispatch(localSettingsActions.setLocalSettings(set));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default InitProvider;
