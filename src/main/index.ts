import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import Store from "electron-store";
import { join } from "path";
import icon from "../../resources/icon.png?asset";

function createWindow(): void {
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
let store: Store;
async function initStore(): Promise<void> {
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

app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  await initStore();

  registerIpcHandlers();

  // default values
  try {
    if (!store.get("hiragana")) {
      store.set("hiragana",
        [
          "a", "i", "u", "e", "o",
          "ka", "ki", "ku", "ke", "ko",
          "sa", "shi", "su", "se", "so",
          "ta", "chi", "tsu", "te", "to",
          "na", "ni", "nu", "ne", "no",
          "ha", "hi", "fu", "he", "ho",
          "ma", "mi", "mu", "me", "mo",
          "ya", "yu", "yo",
          "ra", "ri", "ru", "re", "ro",
          "wa", "wo", "n"
        ]);
      }
    if (!store.get("katakana")) {
      store.set("katakana",
      [
        "a", "i", "u", "e", "o",
        "ka", "ki", "ku", "ke", "ko",
        "sa", "shi", "su", "se", "so",
        "ta", "chi", "tsu", "te", "to",
        "na", "ni", "nu", "ne", "no",
        "ha", "hi", "fu", "he", "ho",
        "ma", "mi", "mu", "me", "mo",
        "ya", "yu", "yo",
        "ra", "ri", "ru", "re", "ro",
        "wa", "wo", "n"
      ]);
    }
  } catch (err) {
    console.error("Failed to initialize store defaults:", err);
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
