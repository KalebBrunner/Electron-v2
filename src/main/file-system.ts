import { readdir } from "node:fs/promises";
import { Dirent } from "../objects/Dirent";
import type { Dirent as FsDirent } from "node:fs";
import { homedir } from "node:os";

// app.getPath("home");
// app.getPath("documents");
// app.getPath("desktop");
// app.getPath("downloads");

export async function getDefaultPath(): Promise<Dirent[] | void> {
    const defaultPath = homedir();

    var DirentList: Dirent[] = [];
    try {
        const dirents = await readdir(defaultPath, { withFileTypes: true });
        for (const dirent of dirents) {
            // void console.log(dirent.name);
            DirentList.push(convertToDirent(dirent, defaultPath));
        }
        return DirentList;
    } catch (err) {
        void console.error(err);
    }
}

function convertToDirent(dirent: FsDirent, parentPathname: string): Dirent {
    const pathUtil = require("path");
    const fs = require("fs");

    // const ext = path.extname(filePath);      // ".txt"
    // const base = path.basename(filePath);    // "file.txt"
    // const dir  = path.dirname(filePath);     // "/home/user/project/data" (for example)

    try {
        const path = pathUtil.join(parentPathname, dirent.name);
        const stats = fs.statSync(path);
        const extension = dirent.isDirectory()
            ? undefined
            : pathUtil.extname(dirent.name);

        return new Dirent(
            dirent.name,
            path,
            dirent.isDirectory(),
            extension,
            stats.size,
            stats.mtime.toISOString(),
        );
    } catch (error) {
        const extension = dirent.isDirectory()
            ? undefined
            : pathUtil.extname(dirent.name);
        return new Dirent(
            dirent.name,
            pathUtil.join(parentPathname, dirent.name),
            dirent.isDirectory(),
            extension,
        );
    }
}
