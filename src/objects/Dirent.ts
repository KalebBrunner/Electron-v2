export enum DirentType {
    File,
    Directory,
}

export class Dirent {
    public constructor(
        public name: string,
        public path?: string,
        public isDirectory?: boolean,
        public extension?: string,
        public size?: number,
        public modified?: string,
    ) {}
}
