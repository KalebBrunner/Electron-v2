// type DesNote = Desmos.ExpressionState;

type DesNote = DesText | DesExpression | DesTable;

interface DesText {
    type?: string;
    text?: string;
    id?: string;
}

interface DesExpression {
    type?: "expression";
    latex?: string;
    color?: string;
    lineStyle?: keyof typeof Desmos.Styles;
    lineWidth?: number | string;
    lineOpacity?: number | string;
    pointStyle?: keyof typeof Desmos.Styles;
    pointSize?: number | string;
    movablePointSize?: number | string;
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

interface DesTable {
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
        // pointOpacity?: number | string;
        dragMode?: keyof typeof Desmos.DragModes;
    }>;
    id?: string;
}
