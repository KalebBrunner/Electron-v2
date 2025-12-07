
export enum DirentType {File, Directory}

export class Dirent {

    public constructor(
        public filename: string, 
        public path?: string,
        public size?: number,
        public type?: DirentType,
        public extension?: string
    ){}





}