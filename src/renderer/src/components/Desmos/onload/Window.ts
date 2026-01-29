import { Calculator, getDesGraphingCalc } from "./Calculator";

function getCalc(
    initialConfiguration: Desmos.GraphConfiguration,
    settings: Desmos.GraphSettings,
): Calculator {
    return new Calculator(getDesGraphingCalc(initialConfiguration, settings));
}

window.createCalc = getCalc;
parent.postMessage("ready", "*");
