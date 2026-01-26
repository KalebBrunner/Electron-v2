interface Window {
    Calculator: Desmos.Calculator;
    Desmos: typeof Desmos;
    createCalc: (
        initialConfiguration: Desmos.GraphConfiguration,
        Settings: Desmos.Desmos.GraphSettings,
    ) => Desmos.Calculator;
}
