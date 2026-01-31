export {};
declare global {
    declare namespace Desmos {
        function imageFileToDataURL(
            file: File,
            cb: (err: Error, url: string) => void,
        ): void;

        type GraphState = unknown;
    }
}
