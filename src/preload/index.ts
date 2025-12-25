import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

const api = {};
const storeApi = {
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: unknown) => ipcRenderer.invoke("store:set", key, value),
  delete: (key: string) => ipcRenderer.invoke("store:delete", key),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    contextBridge.exposeInMainWorld("store", storeApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (defined in dts)
  window.electron = electronAPI;
  // @ts-ignore (defined in dts)
  window.api = api;
  // @ts-ignore (defined in dts)
  window.store = storeApi;
}
