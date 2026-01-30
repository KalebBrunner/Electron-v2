import { round as roundjs } from "mathjs";
import { PointStyling } from "./PointStyles";

export class DesPoint implements DesExpression {
    // public Expression: string;
    // public LatexEquation: string;
    // sensitivity: number = 5;
    id: string;
    dragMode: keyof typeof Desmos.DragModes = "AUTO";

    public constructor(
        public VariableName: string,
        public x: number,
        public y: number,
        public DisplayOpts?: PointStyling,
    ) {
        this.id = this.VariableName;
    }

    get Expression(): string {
        return `(${this.x},${this.y})`;
    }
    get LatexEquation(): string {
        return `${this.VariableName}=${this.Expression}`;
    }

    log() {
        console.log(this.LatexEquation);
    }

    get toDesNote(): DesExpression {
        return {
            id: this.id,
            type: "expression",
            latex: this.LatexEquation,
            dragMode: this.dragMode,

            color: this.DisplayOpts?.color,
            // pointStyle: this.DisplayOpts?.pointStyle,
            pointSize: this.DisplayOpts?.pointSize,
            pointOpacity: this.DisplayOpts?.pointOpacity,
            hidden: this.DisplayOpts?.hidden,
            secret: this.DisplayOpts?.secret,
        };
    }

    setFromArray(pair: number[]) {
        if (!pair || pair.length < 2) {
            return console.log("Point.setFromPair failed");
        }
        this.x = pair[0];
        this.y = pair[1];
    }

    get coordinateArray(): number[] {
        return [this.x, this.y] as number[];
    }

    get helperExpression() {
        return {
            latex: this.VariableName,
        };
    }
}
export { PointStyling };
