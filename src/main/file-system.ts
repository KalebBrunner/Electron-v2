import { homedir } from "node:os";
import { readdir as FsReadDir } from "node:fs/promises";
import { type Dirent as FsDirent } from "node:fs";
import {
    DirectoryT,
    DirentErr,
    DirentKind,
    DirentOther,
    DirentT,
    File,
    Folder,
} from "../objects/Dirent";

type fsDirentT = FsDirent<string>;

export async function readdir(path?: string): Promise<DirectoryT | undefined> {
    // set default
    if (path === undefined) {
        path = homedir();
    }

    // attempt to read and convert directory
    try {
        const fsDirectory = await fsReaddirWithTypes(path);
        return convertToDirectory(fsDirectory);
    } catch {
        void console.error("Error reading directory");
        return undefined;
    }
}

function fsReaddirWithTypes(path: string): Promise<fsDirentT[]> {
    return FsReadDir(path, {
        withFileTypes: true,
        recursive: false,
    });
}

function convertToDirectory(fsDirectory: fsDirentT[]): DirectoryT {
    const directory = <DirectoryT>[];
    count = 0;
    for (const fsdirent of fsDirectory) {
        const dirrent = convertToDirent(fsdirent);
        // void logDirent(dirrent);
        void directory.push(dirrent);
    }
    return directory;
}

function convertToDirent(fsDirent: fsDirentT): DirentT {
    const pathUtil = require("path");
    const fullpath: string = pathUtil.join(fsDirent.parentPath, fsDirent.name);
    const kind: DirentKind = getDirentKind(fsDirent);

    switch (kind) {
        case DirentKind.File:
            return new File(fsDirent.name, fsDirent.parentPath, fullpath, kind);
        case DirentKind.Folder:
            // console.log("Folder");
            return new Folder(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.BlockDevice:
            // console.log("Block Device");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.CharacterDevice:
            // console.log("Character Device");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.SymbolicLink:
            // console.log("Symbolic Link");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.FIFO:
            // console.log("FIFO");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.Socket:
            // console.log("Socket");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        default:
            console.log("Error converting dirent");
            return new DirentErr(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
    }
}

function getDirentKind(dirent: fsDirentT): DirentKind {
    //check others
    if (dirent.isFile()) return DirentKind.File;
    if (dirent.isDirectory()) return DirentKind.Folder;
    if (dirent.isBlockDevice()) return DirentKind.BlockDevice;
    if (dirent.isCharacterDevice()) return DirentKind.CharacterDevice;
    if (dirent.isSymbolicLink()) return DirentKind.SymbolicLink;
    if (dirent.isFIFO()) return DirentKind.FIFO;
    if (dirent.isSocket()) return DirentKind.Socket;
    return DirentKind.Undefined;
}

var count = 0;

function logDirent(dirent: DirentT): void {
    // console.log("Name: ", dirent.name);
    // console.log("parent: ", dirent.parentPath);
    void console.log("**************************** Count: ", ++count);
    void console.log("fullPath: ", dirent.fullPath);
    void console.log("kind: ", DirentKind[dirent.kind]);
}
