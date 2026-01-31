import { DesNote } from "./DesNote";

export class DesExpression implements DesNote {
    constructor(
        public type: "expression",
        public id: string,

        public latex?: string,
        public color?: string,
        public lineStyle?: keyof typeof Desmos.Styles,
        public lineWidth?: number | string,
        public lineOpacity?: number | string,
        public pointStyle?: keyof typeof Desmos.Styles,
        public pointSize?: number | string,
        public pointOpacity?: number | string,
        public fillOpacity?: number | string,
        public points?: boolean,
        public lines?: boolean,
        public fill?: boolean,
        public hidden?: boolean,
        public secret?: boolean,
        public sliderBounds?: {
            min: number | string;
            max: number | string;
            step: number | string;
        },
        public parametricDomain?: {
            min: number | string;
            max: number | string;
        },
        public polarDomain?: {
            min: number | string;
            max: number | string;
        },
        public dragMode?: keyof typeof Desmos.DragModes,
        public label?: string,
        public showLabel?: boolean,
        public labelSize?: keyof typeof Desmos.LabelSizes,
        public labelOrientation?: keyof typeof Desmos.LabelOrientations,
    ) {}

    toDesNote() {
        return {
            type: this.type,
            latex: this.latex,
            color: this.color,
            lineStyle: this.lineStyle,
            lineWidth: this.lineWidth,
            lineOpacity: this.lineOpacity,
            pointStyle: this.pointStyle,
            pointSize: this.pointSize,
            pointOpacity: this.pointOpacity,
            fillOpacity: this.fillOpacity,
            points: this.points,
            lines: this.lines,
            fill: this.fill,
            hidden: this.hidden,
            secret: this.secret,
            sliderBounds: this.sliderBounds,
            parametricDomain: this.parametricDomain,
            polarDomain: this.polarDomain,
            id: this.id,
            dragMode: this.dragMode,
            label: this.label,
            showLabel: this.showLabel,
            labelSize: this.labelSize,
            labelOrientation: this.labelOrientation,
        } as Desmos.ExpressionState;
    }
}
