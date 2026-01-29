interface DesNote {
    type?: string;
    id?: string;
}

interface DesText extends DesNote {
    type?: string;
    text?: string;
    id?: string;
}

interface DesExpression extends DesNote {
    type?: "expression";
    latex?: string;
    color?: string;
    lineStyle?: keyof typeof Desmos.Styles;
    lineWidth?: number | string;
    lineOpacity?: number | string;
    pointStyle?: keyof typeof Desmos.Styles;
    pointSize?: number | string;
    pointOpacity?: number | string;
    fillOpacity?: number | string;
    points?: boolean;
    lines?: boolean;
    fill?: boolean;
    hidden?: boolean;
    secret?: boolean;
    sliderBounds?: {
        min: number | string;
        max: number | string;
        step: number | string;
    };
    parametricDomain?: {
        min: number | string;
        max: number | string;
    };
    polarDomain?: {
        min: number | string;
        max: number | string;
    };
    id?: string;
    dragMode?: keyof typeof Desmos.DragModes;
    label?: string;
    showLabel?: boolean;
    labelSize?: keyof typeof Desmos.LabelSizes;
    labelOrientation?: keyof typeof Desmos.LabelOrientations;
}

interface DesTable extends DesNote {
    type: "table";
    columns: ReadonlyArray<{
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
    }>;
    id?: string;
}
