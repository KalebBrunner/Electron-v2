interface Window {
    Calculator: Desmos.Calculator;
    Desmos: typeof Desmos;
    createCalc: (
        initialConfiguration: Desmos.GraphConfiguration,
        Settings: Desmos.Desmos.GraphSettings,
    ) => Desmos.Calculator;
}

// const win = iframe.value!.contentWindow as DesmosFrameWindow;
// const calc = win.createCalc(props.config, props.settings);
