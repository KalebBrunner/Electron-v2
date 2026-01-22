export {};

declare global {
    type GraphingCalc = ReturnType<typeof Desmos.GraphingCalculator>;

    interface Window {
        calculator: GraphingCalc;
        Desmos: typeof Desmos;
    }

    type GraphConfig = {
        settings?: Partial<Desmos.GraphSettings>;
        expressions?: Desmos.ExpressionState[];
        graphpaper?: boolean;
        expressions?: boolean;
        settingsMenu?: boolean;
        zoomButtons?: boolean;
        keypad?: boolean;
        keypadActivated?: boolean;
        allowKeypadToBeDismissedWhenNarrow?: boolean;
        showResetButtonOnGraphpaper?: boolean;
        expressionsTopbar?: boolean;
        pointsOfInterest?: boolean;
        trace?: boolean;
        border?: boolean;
        lockViewport?: boolean;
        expressionsCollapsed?: boolean;
        capExpressionSize?: boolean;
    };
}
