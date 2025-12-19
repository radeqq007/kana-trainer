import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import Store from "electron-store";
import { join } from "path";
import icon from "../../resources/icon.png?asset";
import chars from "../renderer/src/data/characters.json";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// I know this sucks but otherwise it doesn't work
let store: any;
async function initStore(): Promise<any> {
  const { default: Store } = await import("electron-store");
  store = new Store();
}

function registerIpcHandlers(): void {
  ipcMain.handle("store:get", (_event, key) => {
    return store.get(key);
  });

  ipcMain.handle("store:set", (_event, key, value) => {
    store.set(key, value);
  });

  ipcMain.handle("store:delete", (_event, key) => {
    store.delete(key);
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  initStore();

  registerIpcHandlers();

  // default values
  try {
    if (!store.has("hiragana") && chars?.hiragana) {
      store.set("hiragana", Object.keys(chars.hiragana));
    }
    if (!store.has("katakana") && chars?.katakana) {
      store.set("katakana", Object.keys(chars.katakana));
    }
  } catch (err) {
    console.error("Failed to initialize store defaults:", err);
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
