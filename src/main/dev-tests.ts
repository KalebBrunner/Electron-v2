import { Dirent } from "../objects/Dirent";
import { getDefaultPath } from "./file-system";

export function runDevTests(): Dirent {
    // put any functions you want to manually sanity check here
    console.log("[dev-tests] platform:", process.platform);

    let myDirent: Dirent = new Dirent("file1");

    console.log("[dev-tests] filetest:", myDirent);

    getDefaultPath();

    return myDirent;
}
