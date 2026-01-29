interface Window {
    Calculator: Calculator;
    Desmos: typeof Desmos;
    createCalc: (
        initialConfiguration: Desmos.GraphConfiguration,
        Settings: Desmos.Desmos.GraphSettings,
    ) => Calculator;
}

// const win = iframe.value!.contentWindow as DesmosFrameWindow;
// const calc = win.createCalc(props.config, props.settings);
