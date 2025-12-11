export type Directory = DirentObject[];

export type DirentObject = File | Folder | DirentError;

export enum DirentType {
    File,
    Folder,
    Error,
}

export interface Dirent {
    fullpath: string;
    location: string;
    name: string;
    Type: DirentType;
}

export class File implements Dirent {
    public constructor(
        // Dirent definition
        public fullpath: string,
        public location: string,
        public name: string,
        public Type: DirentType,

        // File data
        public extension: string,
        public modified: string,
        public size: number,
    ) {}
}

export class Folder implements Dirent {
    public constructor(
        // Dirent definition
        public fullpath: string,
        public location: string,
        public name: string,
        public Type: DirentType,

        // Folder data
        public modified: string,
        public itemCount: number,
    ) {}
}

export class DirentError implements Dirent {
    public constructor(
        // Dirent definition
        public fullpath: string,
        public location: string,
        public name: string = "",
        public Type: DirentType = DirentType.Error,
    ) {}
}
