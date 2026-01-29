import { Ref } from "vue";
import { crossSync3 } from "./Tools/CrossSync3";
import { DesPoint } from "./graphables/Points";

export class Calculator {
    public constructor(public calc: Desmos.Calculator) {}

    destroy() {
        this.calc.destroy();
    }

    setDesNote(note: DesNote) {
        this.calc.setExpression(note as Desmos.ExpressionState);
    }

    getSensor(VariableName: string): Sensor {
        return this.calc.HelperExpression({ latex: VariableName });
    }

    BindPoint(point: Ref<DesPoint>) {
        this.setDesNote(point.value.toDesNote);

        const sensor = this.getSensor(point.value.VariableName);

        sensor.observe("listValue", () => {
            console.log("Update");
            point.value.setFromArray(sensor.listValue);
        });
    }

    BindConjugatePoints(A: Ref<DesPoint>, B: Ref<DesPoint>) {
        this.setDesNote(A.value.toDesNote);
        this.setDesNote(B.value.toDesNote);

        console.log("activate syncing");
        crossSync3(this.calc, A, B);
    }
}

export function createCalc(
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

    return new Calculator(DesmosCalculator);
}
