export class GraphingCalculator {
    createCalc(
        initialConfiguration: Desmos.GraphConfiguration,
        settings: Desmos.GraphSettings,
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
    }
}
