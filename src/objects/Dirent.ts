export enum DirentType {
    File,
    Directory,
}

export class Dirent {
    public constructor(
        public fullpath: string,
        public name: string,
        public location: string,
        public modified?: string,
    ) {}
}

export class File extends Dirent{


    public constuctor(
                public extension: string,
        public size: number,
    ) {}
}

export class Folder {
    public constructor(
        public itemCount: number,
    ) {}
}
