import { app, BrowserWindow } from "electron";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { runDevTests } from "./dev-tests";
import { createWindow } from "./create-window";
import { includeHandles } from "./ipc-handles";

export function appSetup() {
    // Set app user model id for windows
    electronApp.setAppUserModelId("com.electron");

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    void includeHandles();
    if (is.dev) void runDevTests();
    void createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
}
