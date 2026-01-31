import { DesNote } from "@renderer/components/NameSpaces/Des/Notes/DesNote";
import { DesPointStyleObj, PointStyling } from "./PointStyles";

export class DesPoint implements DesNote {
    type: "expression" = "expression";
    id: string;
    dragMode: keyof typeof Desmos.DragModes = "AUTO";
    style: PointStyling;
    public constructor(
        public VariableName: string,
        public x: number,
        public y: number,
        DisplayOpts?: DesPointStyleObj | PointStyling,
    ) {
        this.id = this.VariableName;

        if (!DisplayOpts) {
            this.style = new PointStyling();
        } else if (DisplayOpts instanceof PointStyling) {
            this.style = DisplayOpts;
        } else {
            this.style = new PointStyling(DisplayOpts);
        }
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

    toDesNote(): Desmos.ExpressionState {
        return {
            id: this.id,
            type: "expression",
            latex: this.LatexEquation,
            dragMode: this.dragMode,

            pointOpacity: this.style.pointOpacity,
            pointStyle: this.style.pointStyle,
            pointSize: this.style.pointSize,
            movablePointSize: this.style.movablePointSize,
            color: this.style.color,
            hidden: this.style.hidden,
            secret: this.style.secret,
        } as Desmos.ExpressionState;
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
