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
        console.error("Error reading directory");
        return undefined;
    }
}

function fsReaddirWithTypes(path: string): Promise<fsDirentT[]> {
    console.log("here1");
    return FsReadDir(path, {
        withFileTypes: true,
        recursive: false,
    });
}

function convertToDirectory(fsDirectory: fsDirentT[]): DirectoryT {
    const directory = <DirectoryT>[];
    var count = 0;
    for (const fsdirent of fsDirectory) {
        console.log("**************************** Count: ", ++count);
        const dirrent = convertToDirent(fsdirent);
        printDirent(dirrent);
        directory.push(dirrent);
    }
    return directory;
}

function convertToDirent(fsDirent: fsDirentT): DirentT {
    const pathUtil = require("path");
    // const pathUtil = require("path");
    const kind = getDirentKind(fsDirent);
    const fullpath = pathUtil.join(fsDirent.parentPath, fsDirent.name);

    // const fullpath: string = array.join(fsDirent.parentPath, '\\', fsDirent.name)
    switch (kind) {
        case DirentKind.File:
            console.log("File");
            return new File(fsDirent.name, fsDirent.parentPath, fullpath, kind);
        case DirentKind.Folder:
            console.log("Folder");
            return new Folder(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.BlockDevice:
            console.log("Block Device");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.CharacterDevice:
            console.log("Character Device");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.SymbolicLink:
            console.log("Symbolic Link");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.FIFO:
            console.log("FIFO");
            return new DirentOther(
                fsDirent.name,
                fsDirent.parentPath,
                fullpath,
                kind,
            );
        case DirentKind.Socket:
            console.log("Socket");
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

function printDirent(dirent: DirentT): void {
    // console.log("Name: ", dirent.name);
    // console.log("folder: ", dirent.parentPath);
    console.log("path: ", dirent.fullPath);
    // console.log("kind: ", dirent.kind);
}
