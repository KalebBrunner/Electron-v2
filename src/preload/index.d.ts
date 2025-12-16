import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            readdir: () => Promise<Dirent[]>;
            platform?: NodeJS.Platform;
        };
    }
}
