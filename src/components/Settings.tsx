"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import SettingsIcon from "@/assets/SettingsIcon";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import useSettings from "@/hooks/useSettings";

const Settings = () => {
  const { setTheme } = useTheme();

  const [apiKey, setApiKey] = useSettings<string>("apiKey");
  const [model, setModel] = useSettings<string>("model");
  const [codeTheme, setCodeTheme] = useSettings<string>("codeTheme");
  const [pageTheme, setPageTheme] = useSettings<string>("theme");

  useEffect(() => {
    setTheme(pageTheme as string);
  }, [pageTheme, setTheme]);

  return (
    <Dialog>
      <DialogTrigger>
        <SettingsIcon size="28px" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h3 className="text-lg font-bold mt-8 mb-4">Model Settings</h3>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Model</Label>
            <Select onValueChange={(value) => setModel(value)} value={model}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Model" />
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">API Key</Label>
            <Input className="col-span-3" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">Theme Settings</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Code Theme</Label>
            <Select onValueChange={(value) => setCodeTheme(value)} value={codeTheme}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Code Theme" />
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
            <Select onValueChange={(value) => setPageTheme(value)} value={pageTheme}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Page Theme" />
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
