import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            readdir: (path?: string) => Promise<Dirent[]>;
            platform?: NodeJS.Platform;
        };
    }
}
