import { readdir } from "node:fs/promises";
import {
    Directory,
    DirentObject,
    DirentType,
    File,
    Folder,
    DirentError,
} from "../objects/Dirent";
import type { Dirent as FsDirent } from "node:fs";
import { homedir } from "node:os";

export async function getDefaultPath(): Promise<Directory | void> {
    const defaultPath = homedir();

    var directory: Directory = [];
    try {
        const dirents: FsDirent[] = await readdir(defaultPath, {
            withFileTypes: true,
        });
        for (const dirent of dirents) {
            directory.push(convertToDirent(dirent, defaultPath));
        }
        return directory;
    } catch {
        console.error("Error reading directory");
    }
}

function convertToDirent(dirent: FsDirent, location: string): DirentObject {
    const pathUtil = require("path");
    const fs = require("fs");

    try {
        const fullpath = pathUtil.join(location, dirent.name);
        const direntType: DirentType = dirent.isDirectory()
            ? DirentType.Folder
            : DirentType.File;
        const stats = fs.statSync(fullpath);

        switch (direntType) {
            case DirentType.File:
                return new File(
                    fullpath,
                    location,
                    dirent.name,
                    direntType,
                    pathUtil.extname(dirent.name),
                    stats.mtime.toISOString(),
                    stats.size,
                );
            case DirentType.Folder:
                return new Folder(
                    fullpath,
                    location,
                    dirent.name,
                    direntType,
                    stats.mtime.toISOString(),
                    0,
                );
        }
    } catch {
        console.log("Error converting dirent object");
        return new DirentError(
            pathUtil.join(location, "FileReadingError"),
            location,
        );
    }
}
