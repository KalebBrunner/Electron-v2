function getGraphingCalc(
    initialConfiguration: Desmos.GraphConfiguration,
    settings: Desmos.GraphSettings,
): Desmos.Calculator {
    console.log("Getting basic graphing calculator from desmos");
    const htmlElt = document.getElementById("calc");
    if (!htmlElt) throw new Error("Missing #calc element");

    const calculator: Desmos.Calculator = Desmos.GraphingCalculator(htmlElt, {
        ...initialConfiguration,
        ...settings,
    });

    return calculator;
}

window.createCalc = getGraphingCalc;
parent.postMessage("ready", "*");
