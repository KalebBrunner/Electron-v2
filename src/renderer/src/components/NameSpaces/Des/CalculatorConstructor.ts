import { Calculator } from "./Calculator";
import { GraphConfiguration } from "./GraphConfiguration";
import { GraphSettings } from "./GraphSettings";

export function getDesCalculator(
    initialConfiguration: GraphConfiguration,
    settings: GraphSettings,
): Calculator {
    console.log("Getting basic graphing calculator from desmos");

    const htmlElt = document.getElementById("calc");
    if (!htmlElt) throw new Error("Missing #calc element");

    const DesmosCalculator: Desmos.Calculator = Desmos.GraphingCalculator(
        htmlElt,
        {
            ...initialConfiguration,
            ...settings,
        },
    );

    return new Calculator(DesmosCalculator, initialConfiguration, settings);
}
