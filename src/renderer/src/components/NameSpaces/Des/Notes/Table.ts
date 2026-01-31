import { DesNote } from "./DesNote";

export class DesTable implements DesNote {
    constructor(
        public id: string,
        public type: "table",
        public columns: ReadonlyArray<{
            latex: string;
            values?: string[];
            color?: string;
            hidden?: boolean;
            points?: boolean;
            lines?: boolean;
            lineStyle?: keyof typeof Desmos.Styles;
            lineWidth?: number | string;
            lineOpacity?: number | string;
            pointStyle?: keyof typeof Desmos.Styles;
            pointSize?: number | string;
            pointOpacity?: number | string;
            dragMode?: keyof typeof Desmos.DragModes;
        }>,
    ) {}

    toDesNote() {
        return {
            type: this.type,
            columns: this.columns,
            id: this.id,
        } as Desmos.ExpressionState;
    }
}
