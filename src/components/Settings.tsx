"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import SettingsIcon from "@/assets/SettingsIcon";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, actions as settingsActions } from "@/stores/slices/settingsSlice";
import { useTheme } from "next-themes";

const Settings = () => {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();
  const codeTheme = useSelector(getSettings).codeTheme;
  const engine = useSelector(getSettings).engine;

  const [currTheme, setCurrTheme] = useState("system");
  const handleThemeChange = (value: string) => {
    setCurrTheme(value);
    setTheme(value);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <SettingsIcon size="28px" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h3 className="text-lg font-bold mt-8 mb-4">Engine Settings</h3>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Engine</Label>
            <Select onValueChange={(value) => dispatch(settingsActions.setEngine(value))} value={engine}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</SelectItem>
                  <SelectItem disabled value="gpt-4">
                    gpt-4 (Limited beta)
                  </SelectItem>
                  <SelectItem disabled value="gpt-4-32k">
                    gpt-4-32k (Limited beta)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">Theme Settings</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Code Theme</Label>
            <Select onValueChange={(value) => dispatch(settingsActions.setCodeTheme(value))} value={codeTheme}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dracula">Dracula</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                  <SelectItem value="github">Github</SelectItem>
                  <SelectItem value="vs2015">Visual Studio 2015</SelectItem>
                  <SelectItem value="gruvbox-dark">Gruvbox Dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Page Theme</Label>
            <Select onValueChange={handleThemeChange} value={currTheme}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="system">Auto Detect</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
