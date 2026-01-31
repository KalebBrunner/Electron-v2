export {};
declare global {
    export namespace Desmos {
        interface GraphConfiguration {
            keypad?: boolean;
            graphpaper?: boolean;
            expressions?: boolean;
            settingsMenu?: boolean;
            zoomButtons?: boolean;
            showResetButtonOnGraphpaper?: boolean;
            expressionsTopbar?: boolean;
            pointsOfInterest?: boolean;
            trace?: boolean;
            border?: boolean;
            lockViewport?: boolean;
            expressionsCollapsed?: boolean;
            capExpressionSize?: boolean;
            administerSecretFolders?: boolean;
            images?: boolean;
            imageUploadCallback?(
                file: File,
                cb: (err: Error, url: string) => void,
            ): void;
            folders?: boolean;
            notes?: boolean;
            sliders?: boolean;
            links?: boolean;
            qwertyKeyboard?: boolean;
            distributions?: boolean;
            restrictedFunctions?: boolean;
            forceEnableGeometryFunctions?: boolean;
            pasteGraphLink?: boolean;
            pasteTableData?: boolean;
            clearIntoDegreeMode?: boolean;
            colors?: {
                [key: string]: string;
            };
            autosize?: boolean;
            plotInequalities?: boolean;
            plotImplicits?: boolean;
            plotSingleVariableImplicitEquations?: boolean;
            projectorMode?: boolean;
            decimalToFraction?: boolean;
            fontSize?: number;
            invertedColors?: boolean;
            language?: string;
            brailleMode?: "nemeth" | "ueb" | "none";
            sixKeyInput?: boolean;
            brailleControls?: boolean;
            zoomFit?: boolean;
            forceLogModeRegressions?: boolean;
        }
    }
}
