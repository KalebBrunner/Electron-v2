import { getDefaultPath } from "./file-system";
import { Dirent } from "../objects/Dirent";

export async function runDevTests(): Promise<Dirent[]> {
    console.log("[dev-tests] platform:", process.platform);

    const myDirents: Dirent[] = (await getDefaultPath()) ?? [];

    for (const dirent of myDirents) {
        console.log("[dev-tests]", dirent.name);
    }

    return myDirents;
}
