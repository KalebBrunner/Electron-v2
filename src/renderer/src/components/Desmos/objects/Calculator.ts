// import { ComputedRef, ref, Ref } from "vue";
// import { crossSync } from "./Tools/CrossSync";
// import { DesPoint } from "./graphables/Points";
// import { PointStyling } from "./graphables/PointStyles";

// export class Calculator {
//     public constructor(public calc: any) {}

//     destroy() {
//         this.calc.destroy();
//     }

//     setDesNote(note: DesNote) {
//         this.calc.setExpression(note as Desmos.ExpressionState);
//     }

//     getSensor(VariableName: string): Sensor {
//         return this.calc.HelperExpression({ latex: VariableName });
//     }

//     BindPoint(point: Ref<DesPoint>) {
//         // create DesNote entry
//         this.setDesNote(point.value.toDesNote);
//         // create sensor
//         const sensor = this.getSensor(point.value.VariableName);
//         // on observer call
//         sensor.observe("listValue", () => {
//             // update the DesPOint object with the new value
//             point.value.setFromArray(sensor.listValue);
//             // re-create the expression
//             this.setDesNote(point.value.toDesNote);
//         });
//     }

//     BindGridPoint(real: Ref<DesPoint> | ComputedRef<DesPoint>) {
//         real.value.dragMode = "NONE";
//         this.setDesNote(real.value.toDesNote);

//         const GhostHandle = new DesPoint(
//             `${real.value.VariableName}_{handle}`,
//             real.value.x,
//             real.value.y,
//             new PointStyling({
//                 color: "#474747ff",
//                 pointOpacity: 0.0,
//                 movablePointSize: 8,
//             }),
//         );

//         this.setDesNote(real.value.toDesNote);
//         this.setDesNote(GhostHandle.toDesNote);
//         const GhostSensor = this.getSensor(GhostHandle.VariableName);
//         GhostSensor.observe("listValue", () => {
//             GhostHandle.setFromArray(GhostSensor.listValue);
//             real.value.setFromArray(GhostSensor.listValue);
//             this.setDesNote(real.value.toDesNote);
//         });
//     }

//     BindConjugatePoints(A: Ref<DesPoint>, B: Ref<DesPoint>) {
//         this.setDesNote(A.value.toDesNote);
//         this.setDesNote(B.value.toDesNote);

//         console.log("activate syncing");
//         crossSync(this.calc, A, B);
//     }

//     CreateConjugatePoins(A: Ref<DesPoint>) {
//         const B = ref(
//             new DesPoint(`${A.value.VariableName}_{Conjugate}`, 4, -4, {
//                 color: "#474747ff",
//                 pointOpacity: 0.0,
//                 pointSize: 25,
//                 movablePointSize: 8,
//             } as PointStyling),
//         );
//         this.setDesNote(A.value.toDesNote);
//         this.setDesNote(B.value.toDesNote);

//         console.log("activate syncing");
//         crossSync(this.calc, A, B);
//     }
// }

// export function createCalc(
//     initialConfiguration: Desmos.GraphConfiguration,
//     settings: Desmos.GraphSettings,
// ): Calculator {
//     console.log("Getting basic graphing calculator from desmos");
//     const htmlElt = document.getElementById("calc");
//     if (!htmlElt) throw new Error("Missing #calc element");

//     const DesmosCalculator: Desmos.Calculator = Desmos.GraphingCalculator(
//         htmlElt,
//         {
//             ...initialConfiguration,
//             ...settings,
//         },
//     );

//     return new Calculator(DesmosCalculator);
// }

// // new Point("nameA", 1, 2);
// // new Point("nameA", 1, 2, { opacity: 3, dramode: "XY" });
// // new Point("nameA", 1, 2, { color: "RED", dramode: "XY", opacity: 3, size: 4 });
