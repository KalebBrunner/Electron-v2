import {
    ComputedRef,
    isRef,
    MaybeRef,
    reactive,
    readonly,
    ref,
    Ref,
} from "vue";
import { crossSync3 } from "./Tools/CrossSync3";
import { crossSync } from "./Tools/CrossSync";

import { DesPoint, PointStyling } from "./graphables/Points";
import { round } from "mathjs";

// function delay(ms: number, fn: () => void) {
//     let t: ReturnType<typeof setTimeout> | null = null;
//     return () => {
//         if (t) clearTimeout(t);
//         t = setTimeout(() => {
//             t = null;
//             fn();
//         }, ms);
//     };
// }

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
            this.calc.setExpression(point.value.toDesNote);
        });
    }

    BindGridPoint(ReactiveP: Ref<DesPoint> | ComputedRef<DesPoint>) {
        ReactiveP.value.dragMode = "NONE";

        const GhostHandle = new DesPoint(
            `${ReactiveP.value.VariableName}_{handle}`,
            ReactiveP.value.x,
            ReactiveP.value.y,
            PointStyling.new({
                color: "#474747ff",
                pointOpacity: 0.3,
                pointSize: 25,
            }),
        );

        this.setDesNote(ReactiveP.value.toDesNote);
        this.setDesNote(GhostHandle.toDesNote);
        const GhostSensor = this.getSensor(GhostHandle.VariableName);

        GhostSensor.observe("listValue", () => {
            GhostHandle.setFromArray(GhostSensor.listValue);
            ReactiveP.value.setFromArray(round(GhostSensor.listValue, 0));
            this.calc.setExpression(ReactiveP.value.toDesNote);
        });
        return ReactiveP;
    }

    BindConjugatePoints(A: Ref<DesPoint>, B: Ref<DesPoint>) {
        this.setDesNote(A.value.toDesNote);
        this.setDesNote(B.value.toDesNote);

        console.log("activate syncing");
        crossSync(this.calc, A, B);
    }

    CreateConjugatePoins(A: Ref<DesPoint>) {
        const B = ref(
            new DesPoint(`${A.value.VariableName}_{Conjugate}`, 4, -4),
        );
        this.setDesNote(A.value.toDesNote);
        this.setDesNote(B.value.toDesNote);

        console.log("activate syncing");
        crossSync(this.calc, A, B);
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
