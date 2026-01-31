export class GraphConfiguration {
    public keypad?: boolean;
    public graphpaper?: boolean;
    public expressions?: boolean;
    public settingsMenu?: boolean;
    public zoomButtons?: boolean;
    public showResetButtonOnGraphpaper?: boolean;
    public expressionsTopbar?: boolean;
    public pointsOfInterest?: boolean;
    public trace?: boolean;
    public border?: boolean;
    public lockViewport?: boolean;
    public expressionsCollapsed?: boolean;
    public capExpressionSize?: boolean;
    public administerSecretFolders?: boolean;
    public images?: boolean;
    public imageUploadCallback?: (
        file: File,
        cb: (err: Error, url: string) => void,
    ) => void;
    public folders?: boolean;
    public notes?: boolean;
    public sliders?: boolean;
    public links?: boolean;
    public qwertyKeyboard?: boolean;
    public distributions?: boolean;
    public restrictedFunctions?: boolean;
    public forceEnableGeometryFunctions?: boolean;
    public pasteGraphLink?: boolean;
    public pasteTableData?: boolean;
    public clearIntoDegreeMode?: boolean;
    public colors?: Record<string, string>;
    public autosize?: boolean;
    public plotInequalities?: boolean;
    public plotImplicits?: boolean;
    public plotSingleVariableImplicitEquations?: boolean;
    public projectorMode?: boolean;
    public decimalToFraction?: boolean;
    public fontSize?: number;
    public invertedColors?: boolean;
    public language?: string;
    public brailleMode?: "nemeth" | "ueb" | "none";
    public sixKeyInput?: boolean;
    public brailleControls?: boolean;
    public zoomFit?: boolean;
    public forceLogModeRegressions?: boolean;

    public constructor(init: Partial<GraphConfiguration> = {}) {
        Object.assign(this, init);

        // If you want to enforce defaults, do it here, e.g.:
        // this.keypad ??= true;
        // this.graphpaper ??= true;
    }

    private static stripUndefined<T extends Record<string, any>>(
        obj: T,
    ): Partial<T> {
        const out: Partial<T> = {};
        for (const [k, v] of Object.entries(obj)) {
            if (v !== undefined) (out as any)[k] = v;
        }
        return out;
    }

    toDesmos(): Desmos.GraphConfiguration {
        // Only include defined keys so you don’t accidentally override Desmos defaults with `undefined`.
        return GraphConfiguration.stripUndefined({
            keypad: this.keypad,
            graphpaper: this.graphpaper,
            expressions: this.expressions,
            settingsMenu: this.settingsMenu,
            zoomButtons: this.zoomButtons,
            showResetButtonOnGraphpaper: this.showResetButtonOnGraphpaper,
            expressionsTopbar: this.expressionsTopbar,
            pointsOfInterest: this.pointsOfInterest,
            trace: this.trace,
            border: this.border,
            lockViewport: this.lockViewport,
            expressionsCollapsed: this.expressionsCollapsed,
            capExpressionSize: this.capExpressionSize,
            administerSecretFolders: this.administerSecretFolders,
            images: this.images,
            imageUploadCallback: this.imageUploadCallback,
            folders: this.folders,
            notes: this.notes,
            sliders: this.sliders,
            links: this.links,
            qwertyKeyboard: this.qwertyKeyboard,
            distributions: this.distributions,
            restrictedFunctions: this.restrictedFunctions,
            forceEnableGeometryFunctions: this.forceEnableGeometryFunctions,
            pasteGraphLink: this.pasteGraphLink,
            pasteTableData: this.pasteTableData,
            clearIntoDegreeMode: this.clearIntoDegreeMode,
            colors: this.colors,
            autosize: this.autosize,
            plotInequalities: this.plotInequalities,
            plotImplicits: this.plotImplicits,
            plotSingleVariableImplicitEquations:
                this.plotSingleVariableImplicitEquations,
            projectorMode: this.projectorMode,
            decimalToFraction: this.decimalToFraction,
            fontSize: this.fontSize,
            invertedColors: this.invertedColors,
            language: this.language,
            brailleMode: this.brailleMode,
            sixKeyInput: this.sixKeyInput,
            brailleControls: this.brailleControls,
            zoomFit: this.zoomFit,
            forceLogModeRegressions: this.forceLogModeRegressions,
        }) as Desmos.GraphConfiguration;
    }

    static fromDesmos(cfg: Desmos.GraphConfiguration): GraphConfiguration {
        // Structural typing makes this easy since the shapes match.
        return new GraphConfiguration(cfg as Partial<GraphConfiguration>);
    }
}
