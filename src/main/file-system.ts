import { app } from "electron";
import { readdir } from "node:fs/promises";

export async function getDefaultPath() {
    const defaultPath = app.getPath("home");

    try {
        const files = await readdir(defaultPath);
        for (const file of files) console.log(file);
    } catch (err) {
        console.error(err);
    }
}
