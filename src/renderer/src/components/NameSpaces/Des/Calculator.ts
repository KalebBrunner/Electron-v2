import { DesPoint } from "@renderer/components/Desmos/objects/graphables/Points";
import { GraphConfiguration } from "./GraphConfiguration";
import { GraphSettings } from "./GraphSettings";
import { ComputedRef, Ref } from "vue";
import { PointStyling } from "@renderer/components/Desmos/objects/graphables/PointStyles";
import { round } from "mathjs";

export {};

export class Calculator {
    constructor(
        private Desmos: Desmos.Calculator,
        private GraphConfiguration?: GraphConfiguration,
        public GraphSettings?: GraphSettings,
    ) {}

    destroy() {
        this.Desmos.destroy();
    }

    setNote(Note: Desmos.ExpressionState) {
        this.Desmos.setExpression(Note);
    }

    setExpression(a: any) {
        this.Desmos.setExpression(a);
    }

    getSensor(VariableName: string): Sensor {
        return this.Desmos.HelperExpression({ latex: VariableName });
    }

    BindPoint(point: Ref<DesPoint>) {
        // create DesNote entry
        this.setNote(point.value.toDesNote());
        // create sensor
        const sensor = this.getSensor(point.value.VariableName);
        // on observer call
        sensor.observe("listValue", () => {
            // update the DesPOint object with the new value
            point.value.setFromArray(sensor.listValue);
            // re-create the expression
            this.setNote(point.value.toDesNote());
        });
    }

    BindGridPoint(real: Ref<DesPoint> | ComputedRef<DesPoint>) {
        const roundToGrid = (x: number) => {
            const gridSize = 5;
            return round(x / gridSize) * gridSize;
        };
        real.value.dragMode = "NONE";
        this.setNote(real.value.toDesNote());

        const GhostHandle = new DesPoint(
            `${real.value.VariableName}_{handle}`,
            real.value.x,
            real.value.y,
            new PointStyling({
                color: "#474747ff",
                pointOpacity: 0.4,
                movablePointSize: 8,
            }),
        );

        this.setNote(real.value.toDesNote());
        this.setNote(GhostHandle.toDesNote());
        const GhostSensor = this.getSensor(GhostHandle.VariableName);
        GhostSensor.observe("listValue", () => {
            GhostHandle.setFromArray(GhostSensor.listValue);
            real.value.setFromArray(GhostSensor.listValue.map(roundToGrid));
            this.setNote(real.value.toDesNote());
        });
    }
}
