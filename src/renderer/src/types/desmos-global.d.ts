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
    };
}
