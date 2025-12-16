export interface Dirent {
    name: string;
    parentPath: string;
    fullPath: string;
    kind: DirentKind;
}

export enum DirentKind {
    File,
    Folder,
    BlockDevice,
    CharacterDevice,
    SymbolicLink,
    FIFO,
    Socket,
    Undefined,
}

export type DirectoryT = DirentT[];

export type DirentT = File | Folder;

export class File implements Dirent {
    public constructor(
        // Dirent definition

        public name: string,
        public parentPath: string,
        public fullPath: string,
        public kind: DirentKind,

        // File data
        // public extension: string,
        // public modified: string,
        // public size: number,
    ) {}
}
/**
 * A Directory is a Folder when the contained dirents are not read.
 *
 * Class Folder implement Dirent
 */
export class Folder implements Dirent {
    public constructor(
        // Dirent definition
        public name: string,
        public parentPath: string,
        public fullPath: string,
        public kind: DirentKind,

        // Folder data
        // public modified: string,
        // public itemCount: number,
    ) {}
}
export class DirentOther implements Dirent {
    public constructor(
        public name: string,
        public parentPath: string,
        public fullPath: string,
        public kind: DirentKind,
    ) {}
}

export class DirentErr implements Dirent {
    public constructor(
        public name: string,
        public parentPath: string,
        public fullPath: string,
        public kind: DirentKind,
    ) {}
}
