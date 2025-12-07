import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            getDirents: () => Promise<Dirent[]>;
            platform?: NodeJS.Platform;
        };
    }
}
