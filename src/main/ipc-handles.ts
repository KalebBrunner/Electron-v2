import { ipcMain } from "electron/main";
import { readdir } from "./file-system";

export function includeHandles() {
    ipcMain.on("ping", () => console.log("pong"));
    ipcMain.handle("readdir", (_e, path?: string) => readdir(path));
}
