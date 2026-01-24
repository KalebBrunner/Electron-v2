import { myGraphCongif, myGraphSettings } from "./graphSettings";
// import { setListeners } from "./listeners";

const htmlElt = document.getElementById("calc");
if (!htmlElt) throw new Error("Missing #calc element");

const calculator: Desmos.Calculator = Desmos.GraphingCalculator(htmlElt, {
    ...myGraphCongif,
    ...myGraphSettings,
});

window.calculator = calculator;

void calculator.setExpression({ id: "fx", latex: "f(x)=x" });
