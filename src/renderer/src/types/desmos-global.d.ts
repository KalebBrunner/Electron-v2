interface Window {
    Calculator: Calculator;
    Desmos: typeof Desmos;
    getDesCalculator: (
        initialConfiguration: GraphConfiguration,
        Settings: GraphSettings,
    ) => Calculator;
}

// const win = iframe.value!.contentWindow as DesmosFrameWindow;
// const calc = win.createCalc(props.config, props.settings);
