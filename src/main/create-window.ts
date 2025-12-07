import { shell, BrowserWindow } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

const windows = new Set<BrowserWindow>();
const OFFSET_X = 24;
const OFFSET_Y = 24;
let lastBounds: Electron.Rectangle | null = null;

export function createWindow(): void {
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
        },
    });

    if (lastBounds) {
        mainWindow.setBounds({
            x: lastBounds.x + OFFSET_X,
            y: lastBounds.y + OFFSET_Y,
            width: lastBounds.width,
            height: lastBounds.height,
        });
    }

    windows.add(mainWindow);

    const updateLast = () => {
        try {
            lastBounds = mainWindow.getBounds();
        } catch {}
    };

    mainWindow.on("move", updateLast);
    mainWindow.on("resize", updateLast);

    mainWindow.on("closed", () => {
        windows.delete(mainWindow);
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
}
